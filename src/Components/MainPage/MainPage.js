import React, {useEffect} from 'react';
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import {Redirect, useHistory} from "react-router-dom";
import './css/main.css'

import MainPanel from "../panelComponents/MainPanel/MainPanel";
import UserInfoPanel from "../panelComponents/UserInfoPanel/UserInfoPanel";
import Customers from "../panelComponents/Customers/Customers";
import Diagram from "../panelComponents/Diagram/Diagram";
import Tutorials from "../panelComponents/Tutorials/Tutorials";
import ConsultationForms from "../panelComponents/ConsultationForms/ConsultationForms";

let queries = require('../../assets/queries/queries')

let externalFunctions = require('../../assets/externalFunctions')
const MainPage = () => {


    let [sideBarOpen, setSideBarOpen] = React.useState(true)
    const token  = externalFunctions.getToken()
    let [userData, setUserData] = React.useState({})
    let components =[
        <MainPanel setUserData={setUserData}/>,
        <UserInfoPanel userData={userData} token={token}/>,
        <Customers token={token}/>,
        <Diagram userData={userData} />,
        <Tutorials/>,
        <ConsultationForms/>
    ]
    let history = useHistory()
    let [currentComponent, setCurrentComponent] = React.useState(0)


    let checkUserDataCallback = (e) => {
        if (e['errors']) {
            return <Redirect to={'/'}/>
        } else {
            setUserData(e['data']['user'])
            window.sessionStorage.setItem('watchedTutorialsId',JSON.stringify(e['data']['user']['watchedTutorialsId']))
        }
    }
    useEffect(() => {
        if (token){
            queries.getUserData(token, checkUserDataCallback)
        }
        else {
            history.push('/')
        }
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


                <SideBar open={sideBarOpen} setSidebarOpen={setSideBarOpen} setCurrentComponent={setCurrentComponent} components={components}/>
            </div>

        </div>
    );
};

export default MainPage;
