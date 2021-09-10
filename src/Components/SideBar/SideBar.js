import React from 'react';

import './css/Sidebar.css'
import gsap from "gsap";

const SideBar = (props) => {

        let sideBarItems = [
            {
                title: 'میز کار شما',
                iconClass: 'fas fa-home',
                component: 0
            },
            {
                title: 'مشخصات فردی',
                iconClass: 'fa fa-edit',
                component: 1
            },
            {
                title: 'ژنولوژی',
                iconClass: 'fa fa-tree',
                component: 3
            },
            {
                title: 'فرم های مشاوره',
                iconClass: 'fa fa-users',
                component: 5
            },
            {
                title: 'مشتریان',
                iconClass: 'fas fa-user',
                subnets: [
                    [
                        "لیست مشتریان ",
                        2
                    ],
                ]
            },
            {
                title: 'آموزش ها',
                iconClass: 'fas fa-download',
                component: 4
            },
            {
                title: 'خروج',
                iconClass: 'fas fa-power-off',
                component: '/local'
            },

        ]


        let changeComponentTransition = (newComponent) => {
            gsap.to(document.querySelector('.side-bar-and-main-container').firstChild, {
                opacity: 0,
                duration: 0.3,
                ease: 'power3.out',
                onComplete: () => {
                    props.setCurrentComponent(newComponent)
                    gsap.to(document.querySelector('.side-bar-and-main-container').firstChild, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power3.out',
                    })
                }
            })
        }

        let handleItemWithSubnetClick = (subnet) => {
            props.setSidebarOpen(true)
            let a = document.getElementById('subnet-nav' + subnet.currentTarget.getAttribute('id'))
            if (subnet.currentTarget.classList.contains('side-bar-item')) {
                if (!a.classList.contains('subnet-active')) {
                    gsap.to(a, {
                        duration: 0.2,
                        height: 'auto'
                    })
                    a.classList.add('subnet-active')
                    subnet.currentTarget.classList.add('nav-active')
                    subnet.currentTarget.firstChild.firstChild.classList.replace('fa-plus-square', 'fa-minus-square')

                } else {
                    a.classList.remove('subnet-active')
                    subnet.currentTarget.classList.remove('nav-active')
                    gsap.to(a, {
                        duration: 0.2,
                        height: '0'
                    })
                    subnet.currentTarget.firstChild.firstChild.classList.replace('fa-minus-square', 'fa-plus-square')
                }
            }

        }

        return (
            <div
                className={'IranSansLight side-bar-main-container d-flex flex-column ' + (props.open ? ' ' : ' side-bar-close')}>
                {
                    sideBarItems.map((eachSideBarItem, index) => {
                        if (eachSideBarItem.subnets) {
                            return (
                                <div key={index}>
                                    <div onClick={handleItemWithSubnetClick} id={index}
                                         style={{cursor: 'pointer'}}
                                         className={'w-100 d-flex nav-items-container justify-content-end side-bar-item '}>
                                        <div className={'d-flex justify-content-center align-items-center ml-3 expandIcon'}>
                                            <i style={{color: '#acadad', position: 'absolute', left: 15}}
                                               className="far fa-plus-square "/>
                                        </div>
                                        <div className={'d-flex flex-row'}>
                                            <span className={'nav-items mr-2'}>{eachSideBarItem.title}</span>
                                            <div className={'nav-icons d-flex justify-content-center align-items-center'}>
                                                <i role={'button'} className={eachSideBarItem.iconClass}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div id={'subnet-nav' + index} className={'subnet-nav '}>
                                        <ul className={'nav-items-subnet-item'} dir={'rtl'}>
                                            {
                                                eachSideBarItem.subnets.map(eachSubnet => {
                                                    return (
                                                        <li className={'text-right d-flex align-items-center nav-items-subnet-item-inner '}
                                                            style={{paddingRight: 40, height: 30, color: '#c2c9c9'}}>
                                                            <button onClick={() => {
                                                                changeComponentTransition([eachSubnet[1]])
                                                            }} style={{
                                                                textDecoration: 'none',
                                                                color: '#c2c9c9',
                                                                background: 'transparent',
                                                                outline: 'none',
                                                                border: 'none'
                                                            }}
                                                            >
                                                                <span style={{fontSize: '0.8rem'}}>{eachSubnet[0]}</span>
                                                            </button>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <button style={{display: 'contents'}} onClick={() => {
                                    changeComponentTransition(eachSideBarItem['component'])
                                }}>
                                    <div className={'d-flex nav-items-container justify-content-end'}
                                         style={{cursor: 'pointer'}}>
                                        <button style={{display: 'contents', textDecoration: 'none'}}>
                                            <span className={'nav-items mr-2'}>{eachSideBarItem.title}</span>
                                        </button>
                                        <div className={'nav-icons d-flex justify-content-center align-items-center'}>
                                            <i className={eachSideBarItem.iconClass}/>
                                        </div>
                                    </div>
                                </button>
                            )
                        }

                    })
                }

            </div>
        );
    }
;

export default SideBar;
