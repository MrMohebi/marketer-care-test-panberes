import React from 'react';

import './css/Header.css'
import '../../assets/fonts/fonts.css'
import gsap from "gsap";

const Header = (props) => {

    let closeAllSubnets = ()=> {
        try {
            let subnetContainers = document.querySelectorAll('div.side-bar-item')
            subnetContainers.forEach(item => {

                    if (item.firstChild.firstChild['classList'].contains('fa-minus-square')) {
                        item.firstChild.firstChild['classList'].remove('fa-minus-square')
                        item.firstChild.firstChild['classList'].add('fa-plus-square')
                    }
                    if (item['classList'].contains('nav-active')) {
                        item['classList'].remove('nav-active')
                    }
                    let subnet = document.querySelector('#subnet-nav' + item.getAttribute('id'))
                subnet.classList.remove('subnet-active')
                    gsap.to(subnet, {
                        height: 0,
                    })
                }
            )
        } catch (e) {
        }
    }
    return (
        <div className={'main-header d-flex flex-row justify-content-center'}>
            <div className={'user-options'}/>
            <div className={'left-side-header header-sides w-50 justify-content-end'}>
                <div onClick={()=>{
                }} className={'IranSansLight user-name-panel d-flex flex-row align-items-center'}>
                    <i className={'fas fa-angle-down mr-2 ml-2'}/>
                    <span className={'mr-3 pt-1 header-name'}>{props.name}</span>
                </div>
            </div>
            <div className={'right-side-header header-sides align-items-center d-flex justify-content-end w-50'}>
                <div className={'logo-panel mr-4'}>
                    <img height={"45px"} src="/img/logo-white.png" alt=""/>
                </div>
                <div style={{cursor:'pointer'}} onClick={()=>{
                    if (props.sideBarOpen){
                        closeAllSubnets()
                    }
                    props.setSidebarOpen(!props.sideBarOpen)
                }} className={'mobile-menu-button  d-flex justify-content-center align-items-center'}>
                    <i style={{color: 'white', fontSize: '1.7rem'}} className="fas fa-bars"/>
                </div>
            </div>
        </div>
    );
};

export default Header;
