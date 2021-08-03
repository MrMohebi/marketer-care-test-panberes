import React, {useEffect} from 'react';
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import {Redirect, useLocation} from "react-router-dom";
import './css/main.css'

import MainPanel from "../panelComponents/MainPanel/MainPanel";
import UserInfoPanel from "../panelComponents/UserInfoPanel/UserInfoPanel";

let queries = require('../../assets/queries/queries')


const MainPage = () => {


    let [sideBarOpen, setSideBarOpen] = React.useState(true)
    const location = useLocation();
    const token = location.state.token;
    let [userData, setUserData] = React.useState({})
    let components =[
        <MainPanel/>,
        <UserInfoPanel userData={userData} token={token}/>
    ]
    let [currentComponent, setCurrentComponent] = React.useState(0)


    let checkUserDataCallback = (e) => {
        if (e['errors']) {
            return <Redirect to={'/'}/>
        } else {
            setUserData(e['data']['user'])
        }
    }
    useEffect(() => {
        queries.getUserData(token, checkUserDataCallback)

    }, [])

    return (
        <div className={'w-100 h-100'}>
            <Header sideBarOpen={sideBarOpen} setSidebarOpen={setSideBarOpen} name={userData['name']}/>
            <div className="side-bar-and-main-container d-flex flex-row">
                <div style={{overflowY:"scroll"}} className={'w-100 '}>
                    {
                        components[currentComponent]
                    }
                </div>

                <SideBar open={sideBarOpen} setCurrentComponent={setCurrentComponent} components={components}/>
            </div>

        </div>
    );
};

export default MainPage;
