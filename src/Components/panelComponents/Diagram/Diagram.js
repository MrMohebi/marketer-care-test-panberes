import React, {useEffect, useRef} from 'react';
import './css/Diagram.css'
import * as d3 from 'd3/dist/d3'
import {ButtonBase} from "@material-ui/core";

const Diagram = () => {
    let networkData = useRef(null)
    let networkDataLinks = useRef(null)
    let rectanglesWidth = 70;
    let rectanglesHeight = 30;
    let namesSize = 20;
    let zoomMultiplier = 0.2;
    let expendedSubnets = [''];
    let mouseOverThese = [];
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
        let treeStructure = d3.tree().size([dataToShow.length * rectanglesWidth, dataToShow.length * rectanglesHeight / 2]);
        let information = treeStructure(dataStructure);
        networkData.current = information.descendants();
        networkDataLinks.current = information.links();
        drawInformation(1, transPose)
    }

    function doItHaveSubsets(item) {
        let subset = false;
        mainData.forEach(eachItem => {
            if (item.data.child === eachItem.parent) {
                subset = true;
            }
        })
        return subset;
    }

    let mainData = [
        {child: 'mokafelam ke', parent: ''},
        {child: 'ali', parent: 'mokafelam ke'},
        {child: 'ag', parent: 'mokafelam ke'},
        {child: 'qq', parent: 'mokafelam ke'},
        {child: 'ww', parent: 'mokafelam ke'},
        {child: 'ee', parent: 'mokafelam ke'},
        {child: 'rr', parent: 'mokafelam ke'},
        {child: 'tt', parent: 'mokafelam ke'},
        {child: 'yy', parent: 'mokafelam ke'},
        {child: 'uu', parent: 'mokafelam ke'},
        {child: 'ii', parent: 'mokafelam ke'},
        {child: 'oo', parent: 'mokafelam ke'},
        {child: 'pp', parent: 'mokafelam ke'},
        {child: 'aaa', parent: 'ag'},
        {child: 'sss', parent: 'ag'},
        {child: 'ddd', parent: 'ag'},
        {child: 'fff', parent: 'ag'},
        {child: 'ggg', parent: 'ag'},
        {child: 'hhh', parent: 'ag'},
        {child: 'jjj', parent: 'ag'},
        {child: 'kkk', parent: 'ag'},
        {child: 'lll', parent: 'ag'},
        {child: 'zzz', parent: 'ag'},
        {child: 'xxx', parent: 'ag'},
        {child: 'ccc', parent: 'ag'},
        {child: 'vvv', parent: 'ag'},
        {child: 'bbb', parent: 'ag'},
        {child: 'nnn', parent: 'ag'},
        {child: 'mmm', parent: 'ag'},
        {child: 'asd', parent: 'ag'},
        {child: 'zxc', parent: 'ag'},
        {child: 'xcv', parent: 'ag'},
        {child: 'cvb', parent: 'ag'},
        {child: 'tyu', parent: 'ali'},
        {child: 'dfs', parent: 'ali'},
        {child: 'rth', parent: 'ali'},
        {child: 'wyn', parent: 'ali'},
        {child: 'moi', parent: 'ali'},
        {child: 'asdf', parent: 'sss'},
        {child: 'wert', parent: 'sss'},
        {child: 'rtui', parent: 'sss'},
    ]
    useEffect(() => {
        let canvasContainer = document.querySelector('#container')
        let canvas = document.querySelector('.canv')
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        window.addEventListener('resize', () => {
            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;
        })
        updateTree(mainData)
    }, [])

    //-----------------------------high weight moving CPU------------------

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
                c.roundRect(item.x + transPose.x, item.y + transPose.y, rectanglesWidth, rectanglesHeight, rectanglesWidth / 15).stroke();
                if (doItHaveSubsets(item)) {
                    c.beginPath()
                    c.arc(item.x + transPose.x + rectanglesWidth / 2, item.y + transPose.y + rectanglesHeight, rectanglesWidth / 10, 0, 2 * Math.PI)
                    c.fillStyle = '#fff'
                    c.fill();
                    c.stroke()
                    c.beginPath()
                    c.moveTo(item.x + transPose.x + rectanglesWidth / 2, item.y + transPose.y + rectanglesHeight)
                    c.lineTo(item.x + transPose.x + rectanglesWidth / 2 - rectanglesHeight / 6, item.y + transPose.y + rectanglesHeight - rectanglesWidth / 13)
                    c.moveTo(item.x + transPose.x + rectanglesWidth / 2, item.y + transPose.y + rectanglesHeight)
                    c.lineTo(item.x + transPose.x + rectanglesWidth / 2 - rectanglesHeight / 6 + (rectanglesWidth / 7), item.y + transPose.y + rectanglesHeight - rectanglesWidth / 13)

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
                    let p = new Path2D(`M ${link.source.x + transPose.x + rectanglesWidth / 2},${link.source.y + transPose.y + rectanglesHeight} C ${link.source.x + transPose.x + rectanglesWidth / 2},${(link.source.y + transPose.y + link.target.y + transPose.y) / 2} ${link.target.x + transPose.x + rectanglesWidth / 2},${(link.source.y + transPose.y + link.target.y + transPose.y) / 2} ${link.target.x + transPose.x + rectanglesWidth / 2},${link.target.y + transPose.y}`);
                    c.strokeStyle = '#b7b7b7'
                    c.stroke(p);
                })
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
        <div className={'w-100 position-relative'} id={'container'}>
            <canvas onClick={(e) => {
                e.preventDefault()
                let data = networkData.current
                data.forEach(item => {
                    if (isMouseOverMe(e, item)) {
                        if (!expendedSubnets.includes(item.data.child)) {
                            expendedSubnets.push(item.data.child)
                            updateTree(mainData)
                        } else {
                            expendedSubnets = expendedSubnets.filter(eachItem => {
                                return eachItem !== item.data.child
                            })
                            updateTree(mainData)
                        }
                    }
                })

            }} onMouseMove={(e) => {
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
                    onMouseDown={(e) => {
                        let data = networkData.current
                        data.forEach(item => {
                            isMouseOverMe(e, item)
                        })
                        mouseDown = true;
                        dragStart.x = e.clientX;
                        dragStart.y = e.clientY;
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
            <button onClick={() => {
                drawInformation(scale, dragStart)
            }}>Draw Something...
            </button>
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
                updateTree(mainData)
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
                updateTree(mainData)
                // drawInformation(1, transPose)
            }}
            >
                <i className={'fa fa-minus'}/>
            </ButtonBase>
        </div>

    );
};

export default Diagram;
