import * as React from "react"
//css
import '../css/reset.css'
import '../css/login.css'
import '../bootstrap/css/bootstrap.min.css'
import '../css/fonts.css'
// import '../assets/FA/css/all.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import 'tippy.js/animations/scale-subtle.css';
//js
import tippy from 'tippy.js';
import {useEffect} from "react";

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import {utils} from '@hassanmojab/react-modern-calendar-datepicker';

// markup
const IndexPage = () => {
    let [day, sday] = React.useState(null)

    const infoBoxes = [
        {
            FAClass: 'fa fa-key',
            title: 'به دستیار هوشمند بازاریابی شبکه ای خوش آمدید',
            detail: 'در این بستر شما میتوانید با ابزارهایی قدرتمند اقدام به مدیریت مشتریان و شبکه فروش خود نمایید'
        },
        {
            FAClass: 'fa fa-user-plus',
            title: 'دسترسی آسان به حساب کاربری',
            detail: 'مشتریان و فعالیت های بازاریابی خود و شبکه فروش خود را مدیریت کرده و لذت ببرید'
        },
        {
            FAClass: 'far fa-chart-bar',
            title: 'گزارشات و آمارهای هفتگی و ماهانه',
            detail: 'با بهره گیری از گزارشات هوشمند فعالیت شبکه فروشتان را با جزئیات رصد کنید'
        },
        {
            FAClass: 'far fa-envelope',
            title: 'پیگیری و درخواست نیاز سریع',
            detail: 'سوالات، درخواستها و نیازهای خود را با ما در میان گذاشته و در سریعترین زمان پیگیری نمایید'
        },
        {
            FAClass: 'fas fa-chart-line',
            title: 'اهداف خود را توسعه دهید و حرفه ای باشید',
            detail: 'دسترسی به ریز عملکرد شبکه فروش، تولید منابع و آموزش های اختصاصی برای تیم فروشتان'
        },

    ]
    useEffect(() => {
        tippy('[data-tippy-content]', {
            animation: 'scale-subtle',
            arrow: true,
            trigger: 'focus',
            placement: 'bottom',
        })
    }, [])
    return (
        <div className={'h-100 w-100'}>

            <div className={'header d-flex align-items-center'}>
                <div className={'container IranSans'}>
                    <ul className={'float-left'}>
                        <li className={'ml-3'}>
                            <a href="/login">ورود</a>
                            <i className="fas fa-user ml-2"/>
                        </li>
                        <li className={'ml-3'}>
                            <a href="">ثبت نام</a>
                            <i className="fas fa-user-plus ml-2"/>
                        </li>
                    </ul>
                    <ul className={'float-right '}>
                        <li><a href="">سوالات متداول</a></li>
                    </ul>
                </div>
            </div>

            <div className={' main-container d-flex justify-content-center '}>
                <div className={'container'}>
                    <div className={'container-inner w-100 d-flex justify-content-center align-items-center'}>
                        <div className={' left-side  d-flex justify-content-center align-items-center'}>
                            <div className={'LS-form d-flex flex-column'}>
                                <div className={' LS-form-header'}>
                                    <img src={`/img/logo.png`} alt=""/>
                                </div>
                                <div className={'LS-form-body mt-4 '}>

                                    <div className={'row mb-4'}>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input data-tippy-content={'نام شما'} type={'text'}
                                                       placeholder={"نام *"}/>
                                            </label>
                                        </div>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input type={'text'} data-tippy-content={'نام خانوادگی شما'}
                                                       placeholder={"نام خانوادگی *"}/>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={'row mb-4'}>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input type={'text'} data-tippy-content={'کد ملی شما'}
                                                       placeholder={"کد ملی *"}/>
                                            </label>
                                        </div>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input type={'text'} data-tippy-content={'شماره موبایل شما'}
                                                       placeholder={"شماره موبایل *"}/>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={'row mb-4'}>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'z-9999 ico-append fa fa-user'}/>
                                                <DatePicker
                                                    value={day}
                                                    calendarPopperPosition={'bottom'}
                                                    onChange={(e) => {
                                                        sday(e)
                                                        console.log(e)
                                                        console.log(utils('fa').getMonthName(e['month']))
                                                    }}
                                                    inputPlaceholder=" تاریخ تولد *"
                                                    locale={'fa'}
                                                    shouldHighlightWeekends
                                                />

                                            </label>
                                        </div>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input type={'text'} data-tippy-content={'کد ملی معرف'}
                                                       placeholder={"کد ملی معرف *"}/>
                                            </label>
                                        </div>
                                    </div>

                                    <div className={'row mb-4'}>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input type={'text'}
                                                       data-tippy-content={'حد اقل 9 حرف (اینگلیسی و اعداد)'}
                                                       placeholder={"کلمه عبور *"}/>
                                            </label>
                                        </div>
                                        <div className={'col-md-6'}>
                                            <label>
                                                <i className={'ico-append fa fa-user'}/>
                                                <input type={'text'} data-tippy-content={'شماره موبایل شما'}
                                                       placeholder={"شماره موبایل *"}/>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div
                                    className={'manual-submit d-flex flex-row-reverse mb-4 justify-content-between align-items-center mt-4'}>
                                    <button className={'btn btn-primary submit'}>
                                        <i className={'fa fa-check ml-2'}/>
                                        ثبت نام
                                    </button>

                                    <div className={'d-flex IranSans  align-items-center '}>
                                        <input id={'conditions'} className={'ml-2'} type="checkbox" name={'condition'}/>
                                        <label style={{paddingTop: '0.4rem'}} className={'m-0'} htmlFor={'conditions'}>
                                            <span>
                                                با
                                                <a href=""> شرایط و قوانین </a>
                                            موافقم
                                            </span>
                                        </label>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={' right-side'}>
                            {
                                infoBoxes.map(eachOption => {
                                    return (
                                        <div style={{direction: 'rtl'}}
                                             className={'info-block d-flex align-items-center '}>
                                            <i className={eachOption['FAClass'] + ' ml-3'}/>
                                            <div className={'text-right d-flex flex-column '}>
                                                <h4 className={'info-block-title IranSans pt-4'}>
                                                    {eachOption['title']}
                                                </h4>
                                                <p className={'info-block-details IranSansLight'}>
                                                    {eachOption['detail']}
                                                </p>

                                            </div>
                                        </div>
                                    )

                                })
                            }


                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default IndexPage
