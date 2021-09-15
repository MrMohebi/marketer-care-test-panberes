import React, {useEffect, useRef, useState} from 'react';
import './css/Diagram.css'
import * as d3 from 'd3/dist/d3'
import {ButtonBase} from "@material-ui/core";
import {getToken} from "../../../assets/externalFunctions";
import {resetApolloContext} from "@apollo/client";
import {CircleSpinner, GridSpinner} from "react-spinners-kit";

let queries = require('../../../assets/queries/queries')

const Diagram = (props) => {
    let networkData = useRef(null)
    let networkDataLinks = useRef(null)
    let rectanglesWidth = 120;
    let rectanglesHeight = 40;
    let namesSize = 20;
    let zoomMultiplier = 0.2;
    let expendedSubnets = [''];
    let mouseOverThese = [];
    let [diagramLoading, setDLoading] = useState(true)
    let treeSize = useRef({
        w: 0,
        h: 0
    })
    let updateTree = (data) => {
        let dataToShow = data.filter(eachItem => {
            return expendedSubnets.includes(eachItem.parent)
        })
        let allChilds = dataToShow.map(eachItem => {
            return eachItem.child
        })
        dataToShow = dataToShow.filter(eachItem => {
            return allChilds.includes(eachItem.parent) || eachItem.parent === ''
        })
        let dataStructure = d3.stratify().id(function (d) {
            return d.child
        }).parentId(function (d) {
            return d.parent
        })(dataToShow)
        treeSize.current.w = dataToShow.length * rectanglesWidth
        treeSize.current.h = dataToShow.length * rectanglesHeight / 2
        let treeStructure = d3.tree().size([treeSize.current.w, treeSize.current.h]);
        let information = treeStructure(dataStructure);
        networkData.current = information.descendants();
        networkDataLinks.current = information.links();

        drawInformation(1, transPose)
    }

    function doItHaveSubsets(item) {
        let subset = false;
        mainData.current.forEach(eachItem => {
            if (item.data.child === eachItem.parent) {
                subset = true;
            }
        })
        return subset;
    }

    let mainData = useRef()

    let initQuery = () => {
        queries.firstTimeSubset(getToken(), (res) => {
            if (res.data.user) {
                res.data.user['subsets'].forEach(item => {
                    if (item['subset']) {

                    }
                    mainData.current.push({parent: props.userData.name, child: item.name})
                })
                setDLoading(false)
            }
            updateTree(mainData.current)

        })
    }
    useEffect(() => {

        mainData.current = [
            {child: props.userData.name, parent: ''},
        ]
        let canvasContainer = document.querySelector('#container')
        let canvas = document.querySelector('.canv')
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        window.addEventListener('resize', () => {
            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;
        })
        initQuery()
        updateTree(mainData.current)
    }, [])

    //-----------------------------high weight moving CPU------------------

    let image = document.getElementById('noAv')
    let drawInformation = (scale, transPose) => {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
            if (width < 2 * radius) radius = width / 2;
            if (height < 2 * radius) radius = height / 2;
            this.beginPath();
            this.moveTo(x + radius, y);
            this.arcTo(x + width, y, x + width, y + height, radius);
            this.arcTo(x + width, y + height, x, y + height, radius);
            this.arcTo(x, y + height, x, y, radius);
            this.arcTo(x, y, x + width, y, radius);
            this.closePath();
            this.stroke()
            this.fillStyle = '#fff'
            this.fill()
            return this;
        }

        let canvas = document.querySelector('.canv')
        let c = canvas.getContext('2d')
        c.clearRect(0, 0, canvas.width * 20, canvas.height * 20)
        c.save();
        c.setTransform()
        let data = networkData.current
        data.forEach((item) => {
            if (expendedSubnets.includes(item.data.parent)) {
                //rect
                if (mouseOverThese.includes(item.data.child)) {
                    c.strokeStyle = '#006fff'
                    changeMouseCursor('pointer')
                } else {
                    c.strokeStyle = '#707070'
                    changeMouseCursor('grab')
                }


                c.roundRect(item.x + transPose.x, item.y + transPose.y, rectanglesWidth, rectanglesHeight, rectanglesWidth / 40).stroke();

                if (doItHaveSubsets(item)) {
                    c.beginPath()
                    c.arc(item.x + transPose.x + rectanglesWidth / 2, item.y + transPose.y + rectanglesHeight, rectanglesWidth / 30, 0, 2 * Math.PI)
                    c.fillStyle = '#b9b9b9'
                    c.fill();
                    c.stroke()
                    c.stroke()
                }

                c.font = `${item.data.child.length <= 5 ? namesSize : namesSize / (item.data.child.length / 6)}px Arial`;
                c.fillStyle = 'black'
                c.textAlign = 'center'
                c.fillText(item.data.child, item.x + rectanglesWidth / 2 + transPose.x, item.y + (rectanglesHeight / 1.5) + transPose.y);
                //link Line

                let link = networkDataLinks.current
                link.forEach(link => {
                    c.beginPath()
                    c.moveTo(link.source.x + 35, link.source.y + 30)
                    c.stroke();
                    let p = new Path2D(`M ${link.source.x + transPose.x + rectanglesWidth / 2} ${link.source.y + transPose.y + rectanglesHeight} C ${link.source.x + transPose.x + rectanglesWidth / 2},${(link.source.y + transPose.y + link.target.y + transPose.y) / 2} ${link.target.x + transPose.x + rectanglesWidth / 2},${(link.source.y + transPose.y + link.target.y + transPose.y) / 2} ${link.target.x + transPose.x + rectanglesWidth / 2},${link.target.y + transPose.y - rectanglesWidth / 9}`);
                    c.strokeStyle = '#b7b7b7'
                    c.stroke(p);
                })
                c.drawImage(document.getElementById('noAv'), item.x + transPose.x + rectanglesWidth / 2.5, item.y + transPose.y - rectanglesHeight / 3, rectanglesWidth / 5, rectanglesWidth / 5)


            }

        })
    }
    let mouseDown = false;
    let dragStart = {
        x: 0,
        y: 0
    }
    let offset = {
        x: 0,
        y: 0
    }
    let drag = {
        x: 0,
        y: 0,
    }
    let scale = 1;

    let transPose = {
        x: null,
        y: null
    }

    function changeMouseCursor(to) {
        if (to === 'pointer') {
            document.querySelector('.canv').style.cursor = 'pointer'
        } else {
            document.querySelector('.canv').style.cursor = 'grab'
        }
    }

    function isMouseOverMe(e, item) {
        if (e.clientX > item.x + transPose.x && e.clientX < item.x + transPose.x + rectanglesWidth
            && e.clientY - 50 > item.y + transPose.y && e.clientY - 50 < item.y + transPose.y + rectanglesHeight
        ) {
            if (!mouseOverThese.includes(item.data.child)) {
                mouseOverThese.push(item.data.child)
            }
            drawInformation(1, transPose)
            return true;
        } else {
            mouseOverThese = mouseOverThese.filter(eachItem => {
                return eachItem !== item.data.child
            });
            drawInformation(1, transPose)
            return false;
        }
    }

    return (
        <div style={{
            overflow: 'hidden'
        }} className={'w-100 h-100 position-relative'} id={'container'}>
            <div style={{
                zIndex: 9,
                transition: '.3s ease',
                background: diagramLoading ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
                display: diagramLoading ? 'flex' : 'none'
            }}
                 className={'diagram-loading-container vh-100 vw-100 position-absolute flex-column justify-content-center align-items-center '}>
                <GridSpinner size={50} color={'white'}/>
                <span className={'IranSans text-white mt-5'}>در حال دریافت اظلاعات</span>
            </div>

            <img id={'noAv'} style={{
                width: 0,
                height: 0
            }} src="/svg/noAvatar.svg" alt="noAvatar"/>

            <canvas onClick={(e) => {
                e.preventDefault()
                let data = networkData.current
                data.forEach(item => {
                    if (isMouseOverMe(e, item)) {
                        if (!expendedSubnets.includes(item.data.child)) {
                            expendedSubnets.push(item.data.child)
                            updateTree(mainData.current)
                        } else {
                            expendedSubnets = expendedSubnets.filter(eachItem => {
                                return eachItem !== item.data.child
                            })
                            updateTree(mainData.current)
                        }
                    }
                })
            }}
                    onTouchMove={(e) => {
                        if (mouseDown) {
                            drag.x = e.targetTouches[0].clientX - dragStart.x + offset.x;
                            drag.y = e.targetTouches[0].clientY - dragStart.y + offset.y;
                            transPose = {
                                x: e.targetTouches[0].clientX - dragStart.x + offset.x,
                                y: e.targetTouches[0].clientY - dragStart.y + offset.y,
                            }
                            drawInformation(1, transPose)
                        }
                    }}
                    onMouseMove={(e) => {
                        if (mouseDown) {
                            drag.x = e.clientX - dragStart.x + offset.x;
                            drag.y = e.clientY - dragStart.y + offset.y;
                            transPose = {
                                x: e.clientX - dragStart.x + offset.x,
                                y: e.clientY - dragStart.y + offset.y,
                            }
                            drawInformation(1, transPose)
                        }
                    }}

                    onTouchStart={(e) => {
                        let data = networkData.current
                        data.forEach(item => {
                            isMouseOverMe(e, item)
                        })
                        mouseDown = true;
                        dragStart.x = e.targetTouches[0].clientX;
                        dragStart.y = e.targetTouches[0].clientY;
                    }}
                    onMouseDown={(e) => {
                        let data = networkData.current
                        data.forEach(item => {
                            isMouseOverMe(e, item)
                        })
                        mouseDown = true;
                        dragStart.x = e.clientX;
                        dragStart.y = e.clientY;
                    }}
                    onTouchEnd={(e) => {
                        mouseDown = false;
                        offset.x += e.changedTouches[0].clientX - dragStart.x
                        offset.y += e.changedTouches[0].clientY - dragStart.y
                    }}

                    onMouseUp={(e) => {
                        mouseDown = false;
                        offset.x += e.clientX - dragStart.x
                        offset.y += e.clientY - dragStart.y
                    }}
                    style={{
                        cursor: 'grab'
                    }}
                    className={'canv'} width={1500} height={700}>
            </canvas>
            <ButtonBase className={'shadow-sm'} style={{
                outline: 'none',
                background: 'white',
                borderRadius: '10px',
                color: '#2c2c2c',
                width: 40,
                height: 40,
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '1rem',
                textAlign: 'center',
                lineHeight: '10px'
            }} onClick={() => {
                rectanglesHeight /= 1 - zoomMultiplier;
                rectanglesWidth /= 1 - zoomMultiplier;
                namesSize /= 1 - zoomMultiplier;
                updateTree(mainData.current)
            }}
            >
                <i className={'fa fa-plus'}/>
            </ButtonBase>
            <ButtonBase className={'shadow-sm'} style={{
                outline: 'none',
                background: 'white',
                borderRadius: '10px',
                color: '#2c2c2c',
                width: 40,
                height: 40,
                position: 'absolute',
                top: '55px',
                right: '10px',
                fontSize: '1rem',
                textAlign: 'center',
                lineHeight: '10px'
            }} onClick={() => {
                rectanglesHeight /= zoomMultiplier + 1;
                rectanglesWidth /= zoomMultiplier + 1;
                namesSize /= zoomMultiplier + 1;
                updateTree(mainData.current)
                // drawInformation(1, transPose)
            }}
            >
                <i className={'fa fa-minus'}/>
            </ButtonBase>
        </div>

    );
};

export default Diagram;
