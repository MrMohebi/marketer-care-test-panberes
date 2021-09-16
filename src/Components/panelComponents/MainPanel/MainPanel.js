import React, {useEffect, useRef, useState} from 'react';
import CustomersTable from "../../CustomersTable/CustomersTable";
import {getToken} from "../../../assets/externalFunctions";
import {ToastContainer, toast, Zoom} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/mainPanel.css'

let queries = require('../../../assets/queries/queries')
const MainPanel = (props) => {
    let [userLink] = useState()
    let linkRef = useRef(null)

    useEffect(() => {
        queries.getUserData(getToken(), (data) => {
            linkRef.current.value = data;
            linkRef.current.value = "https://schcare.ir/" + (data.data.user.uid)
            props.setUserData(data.data.user)
        })
    }, [])

    return (
        <div className={'main-component-container px-2 py-3'}>
            <div className={'urls-container w-100 pt-4 px-3 pb-4'}>
                <div className={'link-label IranSans w-100 '}>
                    لینک یکتای شما جهت معرفی
                </div>
                <div className={'url-box mx-2 '}>
                    <input ref={linkRef} className={'url-link'} type="text" readOnly={true} value={userLink}/>
                    <button onClick={() => {
                        linkRef.current.select()
                        document.execCommand('copy')
                        toast.info("کپی شد", {
                            position: "top-center",
                            autoClose: 3000,
                            rtl: true,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            transition: Zoom
                        })
                    }} className={'btn btn-success IranSans ml-auto mr-auto my-3'}> کپی
                    </button>
                    <ToastContainer
                        rtl={true}
                    />
                </div>
            </div>
            <div className={'urls-container w-100 mt-3 pt-4 pb-4 px-3'}>
                <div className={'link-label IranSans w-100 '}>
                    لیست مشتریان
                </div>
                <CustomersTable token={getToken()}/>
            </div>
        </div>
    );
};

export default MainPanel;
