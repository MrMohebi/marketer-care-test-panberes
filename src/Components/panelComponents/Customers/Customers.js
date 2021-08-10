import React, {useEffect} from 'react';
import './css/Customers.css'
import NewCustomerDialog from "../../NewCustomerDialog/NewCustomerDialog";
import CustomersTable from "../../CustomersTable/CustomersTable";
import 'animate.css/animate.css'
import {getToken} from "../../../assets/externalFunctions";

const Customers = (props) => {
    let [newCustomerVisible, setNewCustomerVisible] = React.useState(false)
    let [updateTable, setUpdateTable] = React.useState(0)
    return (
        <div className={'main-component-container px-2 py-3'}>

            {
                <NewCustomerDialog updateTable={setUpdateTable} visible={newCustomerVisible} token={props.token}
                                   setNewCustomerVisible={setNewCustomerVisible}/>
            }

            <div className={'urls-container w-100 pt-4 px-3 pb-4'}>
                <div className={'link-label IranSans w-100 '}>
                    مشتریان
                </div>
                <div className={'w-100 text-right'}>
                    <button onClick={() => {
                        setNewCustomerVisible(true)
                    }} className={'btn IranSans pt-2 btn-success my-3'}>
                        ایجاد مشتری جدید
                    </button>
                </div>

            </div>
            <div className={'urls-container w-100 pt-4 px-3 mt-3 pb-4'}>
                <div className={'link-label IranSans w-100 '}>
                    مشتریان
                </div>
                <CustomersTable update={updateTable} token={getToken()}/>

            </div>

        </div>
    );
};

export default Customers;
