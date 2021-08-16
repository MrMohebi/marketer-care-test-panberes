import React from 'react';

import $ from 'jquery'
import './css/NewOrder.css'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {ButtonBase, Chip} from "@material-ui/core";
import {CircleSpinner} from "react-spinners-kit";

let queries = require('../../assets/queries/queries')
let moment = require('moment-jalaali')
let externalFunctions = require('../../assets/externalFunctions')
const NewOrder = (props) => {

    let [reminderDay, setReminderDate] = React.useState(null)
    let [customerOrderList, setCustomerOrderList] = React.useState([])
    let [orderSubmitting, setOrderSubmitting] = React.useState(false)

    let deleteChip = (item) => () => {
        let filteredOrderList = customerOrderList.filter(orderItem => {
            return orderItem.name !== item.name;
        })
        setCustomerOrderList(filteredOrderList)
    }

    let handleOrderSubmitClick = () => {
        let token = externalFunctions.getToken();
        let customerId = props.currentCustomerInfo['id'];

        console.log(JSON.stringify(customerOrderList))
        queries.createCustomerOrder(token, customerId, JSON.stringify(customerOrderList), createOrderCallback)
        setOrderSubmitting(true)
    }
    let createOrderCallback = (res) => {
        console.log(res)
        setCustomerOrderList([])
        setOrderSubmitting(false)


    }
    let addItemClickHandler = () => {
        let remindAt;
        if (reminderDay !== null) {
            remindAt = reminderDay['year'] + '/' + reminderDay['month'] + '/' + reminderDay['day'];
            remindAt = moment(remindAt, 'jYYYY/jMM/jDD').unix()
        }

        let itemName = $('#item-name')
        let itemPrice = $('#item-price')
        let itemDetails = $('#item-details')
        let itemNote = $('#item-note')
        let itemKey = itemName.val();
        if (itemName.val().length > 2) {
            if (itemPrice.val().length > 3) {
                setCustomerOrderList([...customerOrderList, {
                    name: itemName.val(),
                    price: itemPrice.val(),
                    remindAt: remindAt,
                    itemKey: itemKey
                }])
                itemName.val('')
                itemPrice.val('')
                itemDetails.val('')
                itemNote.val('')
                $('.priceHolder').css({
                    maxHeight: 0,
                })
                $('#price-holder').text('')
            } else {
                itemPrice[0].classList.add('red-border')
                setTimeout(() => {
                    itemPrice[0].classList.remove('red-border')
                }, 300)
            }

        } else {
            itemName[0].classList.add('red-border')
            setTimeout(() => {
                itemName[0].classList.remove('red-border')
            }, 300)
        }

    }
    return (
        <div className={'w-100 h-100 main-n-o-container d-flex flex-column align-items-center'}>
            <input type="text" className={'user-info-edit-input  IranSansLight pt-2 '} placeholder={'نام محصول'}
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

            }} className={'user-info-edit-input mt-2 IranSansLight pt-2'} placeholder={'قیمت '} id={'item-price'}/>

            <div className={'d-flex flex-row IranSans text-black-50 mt-1 priceHolder'} style={{
                overflow: "hidden"
            }}>
                <span className={'mr-2'}> تومان</span>

                <span id={'price-holder'} dir={"ltr"}/>
            </div>
            <input type="text" className={'user-info-edit-input mt-2 IranSansLight pt-2'} placeholder={'توضیحات'}
                   id={'item-details'}/>
            <input type="text" className={'user-info-edit-input mt-2 IranSansLight pt-2'} placeholder={'یادداشت'}
                   id={'item-note'}/>

            <DatePicker
                value={reminderDay}
                calendarClassName={'responsive-calendar'}
                calendarPopperPosition={'top'}
                onChange={(e) => {
                    setReminderDate(e)
                }}

                inputPlaceholder="تاریخ یاد آوری"
                locale={'fa'}
                shouldHighlightWeekends
            />

            <ButtonBase onClick={() => {
                addItemClickHandler()
            }} style={{
                outline: 'none',
                height: 50,
                // width: '23%',
                border: '1px solid #28a745',
                borderRadius: '5px',
                background: 'white',
                marginTop: '20px'
            }}>
                <i className={'fa fa-plus ml-2'} style={{
                    fontSize: 30,
                    color: '#28a745'
                }}/>
                <span className={'IranSans mx-2'} style={{
                    color: '#28a745'
                }}>افزودن محصول به لیست خرید</span>
            </ButtonBase>

            <div className={'w-100'}>


            </div>

            <div className={'px-2 d-flex  w-100 ' + (customerOrderList.length?'flex-wrap':'align-items-center mt-2 justify-content-center')} style={{
                pointerEvents: orderSubmitting ? 'none' : 'all'
            }}>
                {
                    customerOrderList.length?
                    customerOrderList.map((item) => {
                        return (
                            <div key={Math.random() * 100}>
                                <Chip className={'IranSans'}
                                      style={{
                                          marginLeft: 10,
                                          marginTop: 10
                                      }}
                                      label={item['name']}
                                      onDelete={deleteChip(item)}
                                />
                            </div>
                        );
                    }):
                        <span style={{
                            fontSize:'0.8rem'
                        }} className={'text-black-50 IranSans'}>محصولی در لیست خرید نیست</span>
                }
            </div>
            <ButtonBase disabled={!customerOrderList.length} onClick={() => {
                handleOrderSubmitClick()
            }} style={{
                outline: 'none',
                height: 50,
                border: '1px solid #286ea7',
                borderRadius: '5px',
                background: 'white',
                marginTop: '20px',
                transition: '.2s ease',
                opacity: customerOrderList.length ? 1 : 0.4
            }}>
                {
                    orderSubmitting ?
                        <div className={'mx-2'}>
                            <CircleSpinner size={'20'} color={'#286ea7'}/>

                        </div>
                        :
                        <i className={'fa fa-check ml-2'} style={{
                            fontSize: 30,
                            color: '#286ea7'
                        }}/>
                }

                <span className={'IranSans mx-2'} style={{
                    color: '#286ea7'
                }}>ثبت خرید</span>
            </ButtonBase>

        </div>
    );
};

export default NewOrder;
