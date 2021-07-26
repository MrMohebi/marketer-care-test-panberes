import React from 'react';
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const MainPage = () => {
    return (
        <div className={'w-100 h-100'}>
            <Header/>
            <SideBar/>
        </div>
    );
};

export default MainPage;
