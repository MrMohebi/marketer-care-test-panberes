import React from 'react';

import $ from 'jquery'
import './css/NewOrder.css'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {ButtonBase, Chip} from "@material-ui/core";
let queries = require('../../assets/queries/queries')

const NewOrder = (props) => {

    let [reminderDay, setReminderDat] = React.useState(null)
    let [customerOrderList, setCustomerOrderList] = React.useState([])
    let [customerOrders, setCustomerOrders] = React.useState([])
    let [orderSubmitting, setOrderSubmitting] = React.useState(false)
    let [currentCustomerInfo, setCurrentCustomerInfo] = React.useState({
        name: '',
        age: 0,
        phone: '',
        id: ''
    })
    let deleteChip = (item) => () => {
        let filteredOrders = customerOrders.filter(eachitem => {
            return eachitem.key !== item.key;
        })
        setCustomerOrders(filteredOrders)
    }

    let handleOrderSubmitClick = () => {
        let token = props.token;
        let customerId = currentCustomerInfo['id'];
        let items = JSON.stringify(
            customerOrders.map(eachOrder => {
                return eachOrder['label']
            })
        )
        console.log(items)
        queries.createCustomerOrder(token,customerId,items,createOrderCallback)
    }
    let createOrderCallback = (res)=>{
        console.log(res)
    }
    return (
        <div className={'w-100 h-100 main-n-o-container d-flex flex-column align-items-center'}>
            <input type="text" className={'user-info-edit-input mt-3 IranSansLight pt-2 '} placeholder={'نام محصول'}
                   id={'item-name'}/>
            <input type="text" onChange={(e) => {
                if (isNaN(e.target.value[e.target.value.length - 1])) {
                    e.target.value = e.target.value.slice(0, e.target.value.length - 1)
                }
                if (e.target.value.length > 0) {
                    $('.priceHolder').css({
                        maxHeight: 50,
                    })
                    $('#price-holder').text(parseInt(e.target.value.replace(',', '')).toLocaleString('en-US'))
                } else {
                    $('.priceHolder').css({
                        maxHeight: 0,
                    })
                }

            }} className={'user-info-edit-input mt-2 IranSansLight pt-2'} placeholder={'قیمت '} id={'item-name'}/>

            <div className={'d-flex flex-row IranSans text-black-50 mt-1 priceHolder'} style={{
                overflow: "hidden"
            }}>
                <span className={'mr-2'}> تومان</span>

                <span id={'price-holder'} dir={"ltr"}></span>
            </div>
            <input type="text" className={'user-info-edit-input mt-2 IranSansLight pt-2'} placeholder={'توضیحات'}
                   id={'item-name'}/>
            <input type="text" className={'user-info-edit-input mt-2 IranSansLight pt-2'} placeholder={'یادداشت'}
                   id={'item-name'}/>

            <DatePicker
                value={reminderDay}
                calendarClassName={'responsive-calendar'}
                calendarPopperPosition={'top'}
                onChange={(e) => {
                    setReminderDat(e)
                }}

                inputPlaceholder="تاریخ یاد آوری"
                locale={'fa'}
                shouldHighlightWeekends
            />

            <ButtonBase onClick={() => {

            }} style={{
                outline: 'none',
                height: 50,
                // width: '23%',
                border: '1px solid #28a745',
                borderRadius: '5px',
                background: 'white',
                marginTop:'20px'
            }}>
                <i className={'fa fa-plus ml-2'} style={{
                    fontSize: 30,
                    color: '#28a745'
                }}/>
                <span className={'IranSans mx-2'} style={{
                    color:'#28a745'
                }}>افزودن محصول به لیست خرید</span>
            </ButtonBase>
            <div className={'w-100'}>
                <h2>this is liste kharid</h2>

            </div>

            <div className={'px-2 '} style={{
                pointerEvents: orderSubmitting ? 'none' : 'all'
            }}>
                {
                    customerOrders.map((order) => {
                        return (
                            <div key={Math.random() * 100}>
                                <Chip className={'IranSans'}

                                      style={{
                                          marginLeft: 10,
                                          marginTop: 10
                                      }}
                                      label={order.label}
                                      onDelete={deleteChip(order)}
                                />
                            </div>
                        );
                    })
                }
            </div>


            <ButtonBase onClick={() => {

            }} style={{
                outline: 'none',
                height: 50,
                // width: '23%',
                border: '1px solid #286ea7',
                borderRadius: '5px',
                background: 'white',
                marginTop:'20px',
                transition:'.2s ease',
                opacity:0.5
            }}>
                <i className={'fa fa-check ml-2'} style={{
                    fontSize: 30,
                    color: '#286ea7'
                }}/>
                <span className={'IranSans mx-2'} style={{
                    color:'#286ea7'
                }}>ثبت خرید</span>
            </ButtonBase>

        </div>
    );
};

export default NewOrder;
