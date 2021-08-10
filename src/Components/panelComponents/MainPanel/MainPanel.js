import React from 'react';
import './css/mainPanel.css'
import CustomersTable from "../../CustomersTable/CustomersTable";
import {getToken} from "../../../assets/externalFunctions";
const MainPanel = () => {
    return (
        <div className={'main-component-container px-2 py-3'}>
            <div className={'urls-container w-100 pt-4 px-3 pb-4'}>
                <div className={'link-label IranSans w-100 '}>
                    لینک یکتای شما جهت معرفی
                </div>
                <div className={'url-box mx-2 '}>
                    <input className={'url-link'} type="text" readOnly={true} value={'http://mokafela.ir23824234'}/>
                    <button className={'btn btn-success IranSans ml-auto mr-auto my-3'}> کپی</button>
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
