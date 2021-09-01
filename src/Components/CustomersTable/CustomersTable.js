import React, {useEffect} from 'react';
import './css/CustomersTable.css';
import {BarsSpinner} from "react-spinners-kit";
import NewOrder from "../NewOrder/NewOrder";
import CustomerOrderList from "../CustomerOrderList/CustomerOrderList";
import $ from 'jquery';
import gsap from 'gsap';
import {ButtonBase} from "@material-ui/core";
let queries = require('../../assets/queries/queries')


const CustomersTable = (props) => {
    useEffect(() => {
        getCustomers()
    }, [props.update])

    let [customers, setCustomers] = React.useState([])
    let [customerDialogVisible, setCustomerDialogVisible] = React.useState(false)
    let [currentCustomerInfo, setCurrentCustomerInfo] = React.useState({
        name: '',
        age: 0,
        phone: '',
        id: ''
    })
    let getCustomers = () => {
        if (props.token) {
            queries.getCustomers(props.token, getCustomersCallback)
        } else {

        }
    }
    let handleNewOrderSectionClick = () => {
        let section = $('#customer-new-order-section');
        let arrow = $('.new-order-angle')
        let userDetails = $('.user-details')
        let recentOrders = $('.recent-orders-main')

        if (section[0].classList.contains('new-order-open')){
            arrow.css({
                transform:'rotateZ(0deg)'
            })
            section.css({
                maxHeight:'0%'
            })
            userDetails.css({
                maxHeight:'30%'
            })

            setTimeout(()=>{
                recentOrders.css({
                    display:'flex'
                })
            },400)

        }else {
            section.css({
                maxHeight:'100%'
            })
            userDetails.css({
                maxHeight:'0%',
                overflow:'hidden',
                paddingBottom:'0'
            })
            recentOrders.css({
                display:'none'
            })
            arrow.css({
                transform:'rotateZ(180deg)'
            })
        }
        section[0].classList.toggle('new-order-open')
    }
    let getCustomersCallback = (res) => {
        if (res['errors']) {
            setTimeout(() => {
                getCustomers()
            }, 500)
        } else {
            let customers = res['data']['customers'].map((eachCustomer, index) => {
                return (
                    <tr key={eachCustomer['id']} onClick={() => {
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
                     className={'eachCustomerPopUp position-relative flex-column align-items-center ' + (customerDialogVisible ? "d-flex animate__animated animate__fadeIn" : "d-none")}>
                    <div onClick={() => {
                        setCustomerDialogVisible(false)
                    }} style={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        height: 30,
                        width: 30,
                        fontSize: 20,
                        cursor: 'pointer'
                    }} className={' IranSans d-flex justify-content-center align-items-center'}>x
                    </div>
                    <div className={'d-flex flex-column align-items-center w-100 user-details'}>
                        <span className={'each-customer-name mt-5 IranSansBold'}
                              id={'each-customer-name'}>{currentCustomerInfo['name']}</span>
                        <span className={'each-customer-name mt-2 IranSans'}
                              id={'each-customer-age'}>{currentCustomerInfo['age']} :سن </span>
                        <span style={{
                            height:35
                        }} className={'each-customer-name mt-2 IranSans'}
                              id={'each-customer-phone'}>{currentCustomerInfo['phone']} :شماره تلفن </span>
                    </div>

                    <ButtonBase style={{
                        outline:'none'
                    }} className={'w-100 d-flex flex-column align-items-center '}>
                        <div className={' d-flex flex-row justify-content-between align-items-center w-100 new-order-click-section border-bottom border-top'} onClick={handleNewOrderSectionClick}>
                            <i className={'fa fa-angle-down ml-3 new-order-angle'} style={{}}/>
                            <span className={'IranSans '}>افزودن خرید جدید</span>
                            <i className={'fa fa-angle-down'} style={{opacity:'0'}}/>

                        </div>
                    </ButtonBase>
                    <div id={'customer-new-order-section'} className={'d-flex customer-order-list w-100 '}>
                        <div
                            className={'new-item-input-holder d-flex  flex-column align-items-center justify-content-center w-100 mt-3 py-2 px-2 '}>
                            <NewOrder currentCustomerInfo={currentCustomerInfo}/>
                        </div>
                    </div>
                    <CustomerOrderList/>

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
