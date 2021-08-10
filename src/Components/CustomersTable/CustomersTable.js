import React, {useEffect} from 'react';
import './css/CustomersTable.css'
import {BallSpinner, BarsSpinner, CircleSpinner, PongSpinner, SphereSpinner, SwapSpinner} from "react-spinners-kit";
import {ButtonBase, Chip, CircularProgress, Paper} from "@material-ui/core";
import $ from 'jquery'
import NewOrder from "../NewOrder/NewOrder";

let queries = require('../../assets/queries/queries')
const CustomersTable = (props) => {

    useEffect(() => {
        getCustomers()
    }, [props.update])

    let [customers, setCustomers] = React.useState([])
    let [customerDialogVisible, setCustomerDialogVisible] = React.useState(false)

    let getCustomers = () => {
        if (props.token) {
            queries.getCustomers(props.token, getCustomersCallback)
        } else {

        }
    }
    let getCustomersCallback = (res) => {
        if (res['errors']) {
            setTimeout(() => {
                getCustomers()
            }, 500)
        } else {
            let customers = res['data']['customers'].map((eachCustomer, index) => {
                return (
                    <tr onClick={() => {
                        setCurrentCustomerInfo({
                            name: eachCustomer['name'],
                            age: eachCustomer['age'],
                            phone: eachCustomer['phone'],
                            id: eachCustomer['id'],
                        })
                        setCustomerDialogVisible(true)
                    }} style={{
                        animationDelay: (index * 50) + 'ms'
                    }} className={'table-ds'}>
                        <td>{index}</td>
                        <td>{eachCustomer['name']}</td>
                        <td>{eachCustomer['phone']}</td>
                        <td>{eachCustomer['age']}</td>
                        <td>{eachCustomer['marketerName']}</td>
                    </tr>
                )
            })
            setCustomers(customers)
        }
    }



    return (
        <div>
            <div
                className={'newCustomerOverlay vh-100 vw-100 justify-content-center align-items-center ' + (customerDialogVisible ? "d-flex" : "d-none")}>
                <div style={{
                    overflowY: 'scroll'
                }}
                     className={'eachCustomerPopUp position-relative  flex-column align-items-center pl-1 ' + (customerDialogVisible ? "d-flex animate__animated animate__fadeIn" : "d-none")}>
                    <div onClick={() => {
                        setCustomerDialogVisible(false)
                    }} style={{
                        position: 'absolute',
                        top: 10,
                        left: 0,
                        height: 30,
                        width: 30,
                        fontSize: 20,
                        cursor: 'pointer'
                    }} className={' IranSans d-flex justify-content-center align-items-center'}>x
                    </div>
                    <i className="far fa-user mt-3" style={{
                        fontSize: 50,
                        color: '#808080'
                    }}/>
                    <span className={'each-customer-name mt-3 IranSans'}
                          id={'each-customer-name'}>{currentCustomerInfo['name']}</span>
                    <span className={'each-customer-name mt-2 IranSans'}
                          id={'each-customer-age'}>{currentCustomerInfo['age']} :سن </span>
                    <span className={'each-customer-name mt-2 IranSans'}
                          id={'each-customer-phone'}>{currentCustomerInfo['phone']} :شماره تلفن </span>

                    <div className={'w-100 d-flex flex-column align-items-center'}>
                        <span className={'IranSansBold mt-4'}>افزودن خرید جدید</span>
                        <div className={'d-flex customer-order-list w-100'}>
                            <div
                                className={'new-item-input-holder d-flex  flex-column align-items-center justify-content-center w-100 mt-3 py-2 px-2 '}>
                                <NewOrder />


                                {/*<input disabled={orderSubmitting} id={'new-item-input'} type="text"*/}
                                {/*       placeholder={'نام کالا'}*/}
                                {/*       className={'user-info-edit-input w-75 IranSans'}/>*/}
                            </div>
                        </div>


                    </div>


                </div>
            </div>
            <table dir={'rtl'} className={'w-100 costumers-table mt-3 '}>
                <thead>
                <tr className={'customers-table-head'}>
                    <td>ردیف</td>
                    <td>نام</td>
                    <td>موبایل</td>
                    <td>سن</td>
                    <td>معرف</td>
                </tr>
                </thead>
                <tbody className={'costumer-table-body'}>

                {
                    customers.length > 0 ?
                        customers
                        :
                        <tr>
                            <td colSpan={'6'}>
                                <div className={'w-100 mt-3 d-flex justify-content-center align-items-center'}>
                                    <BarsSpinner size={'50'} color={'#d3d3d3'}/>
                                </div>
                            </td>
                        </tr>


                }

                </tbody>


            </table>
        </div>
    );
};

export default CustomersTable;
