import React from 'react';

import './css/Header.css'
import '../../assets/fonts/fonts.css'

const Header = (props) => {
    return (
        <div className={'main-header d-flex flex-row justify-content-center'}>
            <div className={'left-side-header header-sides w-50 justify-content-end'}>
                <div className={'IranSansLight user-name-panel d-flex flex-row align-items-center'}>
                    <i className={'fas fa-angle-down mr-2 ml-2'}/>
                    <span className={'mr-3 pt-1 header-name'}>{props.name}</span>
                </div>
            </div>
            <div className={'right-side-header header-sides align-items-center d-flex justify-content-end w-50'}>
                <div className={'logo-panel mr-4'}>
                    <img height={"45px"} src="/img/logo-white.png" alt=""/>
                </div>
                <div style={{cursor:'pointer'}} onClick={()=>{
                    props.setSidebarOpen(!props.sideBarOpen)
                }} className={'mobile-menu-button  d-flex justify-content-center align-items-center'}>
                    <i style={{color: 'white', fontSize: '1.7rem'}} className="fas fa-bars"/>
                </div>
            </div>
        </div>
    );
};

export default Header;
