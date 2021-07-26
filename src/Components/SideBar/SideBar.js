import React from 'react';

import './css/Sidebar.css'

const SideBar = () => {
    return (
        <div className={'IranSansLight side-bar-main-container d-flex flex-column'}>
            <div className={'d-flex nav-items-container justify-content-end'}>
                <span className={'nav-items mr-2'}>میز کار شما</span>
                <div className={'nav-icons d-flex justify-content-center align-items-center'}>
                    <i className={'fas fa-home'}/>
                </div>
            </div>
            <div className={'d-flex nav-items-container justify-content-end'}>
                <span className={'nav-items mr-2'}>مشخصات فردی</span>
                <div className={'nav-icons d-flex justify-content-center align-items-center'}>
                    <i className={'fa fa-edit'}/>
                </div>
            </div>
            <div className={'d-flex nav-items-container justify-content-end'}>
                <span className={'nav-items mr-2'}>ژنولوژی</span>
                <div className={'nav-icons d-flex justify-content-center align-items-center'}>
                    <i className={'fa fa-tree '}/>
                </div>
            </div>

        </div>
    );
};

export default SideBar;
