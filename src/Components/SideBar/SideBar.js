import React from 'react';

import './css/Sidebar.css'
import gsap from "gsap";

const SideBar = () => {

        let sideBarItems = [
            {
                title: 'میز کار شما',
                iconClass: 'fas fa-home',
                link: '/local'
            },
            {
                title: 'مشخصات قردی',
                iconClass: 'fa fa-edit',
                link: '/local'
            },
            {
                title: 'ژنولوژی',
                iconClass: 'fa fa-tree',
                link: '/local'
            },
            {

                title: 'مشتریان',
                iconClass: 'fas fa-user',
                subnets: [
                    [
                        "لیست مشتریان ",
                        '/login'
                    ],
                    [
                        "فرم های مشاوره",
                        '/login'
                    ],


                ]
            },
            {

                title: 'ابزار های مدیریتی',
                iconClass: 'fas fa-cogs',
                subnets: [
                    [
                        "لیست مشتریان ",
                        '/login'
                    ],
                    [
                        "فرم های مشاوره",
                        '/login'
                    ],


                ]
            },
            {
                title: 'فعالسازی فرم مشاوره',
                iconClass: 'far fa-file-alt',
                link: '/local'
            },
            {
                title: 'ثبت نام در سمینار',
                iconClass: 'far fa-gem',
                link: '/local'
            },
            {
                title: 'دانلود ها',
                iconClass: 'fas fa-download',
                link: '/local'
            },
 {
                title: 'خروج',
                iconClass: 'fas fa-power-off',
                link: '/local'
            },

        ]


        let handleItemWithSubnetClick = (subnet) => {
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
            <div className={'IranSansLight side-bar-main-container d-flex flex-column'}>
                {
                    sideBarItems.map((eachSideBarItem, index) => {
                        if (eachSideBarItem.subnets) {
                            return (
                                <div>
                                    <div onClick={handleItemWithSubnetClick} id={index}
                                         style={{cursor: 'pointer'}}
                                         className={'w-100 d-flex nav-items-container justify-content-between side-bar-item '}>
                                        <div className={'d-flex justify-content-center align-items-center ml-3'}>
                                            <i style={{color: '#acadad'}} className="far fa-plus-square "/>
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
                                                            <a style={{textDecoration: 'none', color: '#c2c9c9'}}
                                                               href={eachSubnet[1]}>
                                                                <span style={{fontSize: '0.8rem'}}>{eachSubnet[0]}</span>
                                                            </a>
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
                                <div className={'d-flex nav-items-container justify-content-end'}>
                                    <a href={eachSideBarItem.link} style={{display: 'contents', textDecoration: 'none'}}>
                                        <span className={'nav-items mr-2'}>{eachSideBarItem.title}</span>
                                    </a>
                                    <div className={'nav-icons d-flex justify-content-center align-items-center'}>
                                        <i className={eachSideBarItem.iconClass}/>
                                    </div>
                                </div>
                            )
                        }

                    })
                }

            </div>
        );
    }
;

export default SideBar;
