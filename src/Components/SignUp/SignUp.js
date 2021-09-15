import * as React from "react"
import {useEffect} from "react"
//css
import '../../assets/resetCss/reset.css'
import './css/signUp.css'
import '../../assets/bootstrap/css/bootstrap.min.css'
import '../../assets/fonts/fonts.css'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/scale-subtle.css';
// import '../assets/FA/css/all.css'
import '@fortawesome/fontawesome-free/css/all.css';
//js
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import {CircularProgress} from "@material-ui/core";
import swal from 'sweetalert2'
import {useHistory} from "react-router-dom";
import $ from 'jquery'

let queries = require('../../assets/queries/queries')
let externalFunctions = require('../../assets/externalFunctions')
// markup

const IndexPage = () => {
    let [day, sday] = React.useState(null)
    let [signUp, setSignUp] = React.useState(true)
    let [loginLoading, setLoginLoading] = React.useState(false)
    let [loginButtonDisabled, setLoginButtonDisabled] = React.useState(false)
    let history = useHistory();

    let loginUserData = {
        username: '',
        password: ''
    }
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

        if (externalFunctions.getToken()){
            history.push("/panel");
        }

    }, [])

    let loginClickHandler = (e, username, password) => {
        if (username && password) {
            if (username.length > 2 && password.length > 1) {
                setLoginLoading(true)
                setLoginButtonDisabled(true)
                queries.loginQuery(username, password, checkLogin)
            }
        } else {
            let username = document.getElementById('username').value
            let password = document.getElementById('password').value
            if (username.length > 2 && password.length > 1) {
                setLoginLoading(true)
                setLoginButtonDisabled(true)
                queries.loginQuery(username, password, checkLogin)
            }
        }
    }
    let checkLogin = (res) => {
        setLoginLoading(false)
        setLoginButtonDisabled(false)
        if (res['errors']) {
            swal.fire({
                title: 'ورودی اشتباه',
                text: 'لطفا ورودی ها را مجددا بررسی کنید',
                confirmButtonText: 'تایید'
            })
        } else {
            history.push("/panel", {token: res['data']['login']['token']});
            externalFunctions.setToken(res['data']['login']['token'])
            swal.fire({
                title: 'با موفقیت وارد شدید',
                text: 'تبریک میگیم',
                confirmButtonText: 'تایید'
            })
        }
    }
    let handleSignInInputsChange = () => {
    }
    let handleLogInInputsChange = (e) => {
        loginUserData[e.currentTarget.getAttribute('id')] = e.currentTarget.value
    }


    let signUpClickHandler = () => {
        setLoginLoading(true)
        let password = $('.password').val()
        let passwordsAreMatch = $('.password-repeat').val() === password
        let introducerId = $('.introducerId').val()
        let uid = $('.uid').val()
        let name = $('.name').val()
        let lastName = $('.last-name').val()
        let fullName = name + " " + lastName
        let phone = $('.phone').val()
        let email = " "

        if (passwordsAreMatch) {
            if (phone.length === 11) {
                if (password.length > 7) {
                    queries.signUp(introducerId, uid, fullName, phone, email, phone, password, signUpCallback)
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'لطفا مجددا تلاش کنید',
                        text: 'حد اقل کارکتر مجاز برای پسورد 8 کارکتر میباشد',
                        confirmButtonText: 'تایید'
                    })
                }
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'لطفا مجددا تلاش کنید',
                    text: 'شماره تلفن را به صورت 11 رقمی وارد کنید',
                    confirmButtonText: 'تایید'
                })
            }
        } else {
            swal.fire({
                icon: 'error',
                title: 'لطفا مجددا تلاش کنید',
                text: 'کلمه عبور متفاوت است',
                confirmButtonText: 'تایید'
            })
        }
    }

    let signUpCallback = (res) => {
        if (res['errors']) {
            swal.fire({
                icon: 'error',
                title: 'لطفا مجددا تلاش کنید',
                text: 'لطفا مجددا صحت اطلاعات را بررسی نمایید',
                confirmButtonText: 'تایید'
            })
        } else {
            swal.fire({
                icon: 'success',
                title: 'عملیات موفق',
                text: 'وارد شوید',
                confirmButtonText: 'ورود'
            }).then(() => {
                loginClickHandler("", $('.phone').val(), $('.password').val())
            })
        }
    }
    return (
        <div className={'w-100'}>
            <div className={'header d-flex align-items-center'}>
                <div className={'container IranSans'}>
                    <ul className={'float-left'}>
                        <li style={{cursor: 'pointer'}} onClick={() => {
                            setSignUp(false)
                        }} className={'ml-3'}>
                            <span>ورود</span>
                            <i className="fas fa-user ml-2"/>
                        </li>
                        <li style={{cursor: 'pointer'}} onClick={() => {
                            setSignUp(true)
                        }} className={'ml-3'}>
                            <span>ثبت نام</span>
                            <i className="fas fa-user-plus ml-2"/>
                        </li>
                    </ul>
                    <ul className={'float-right '}>
                        <li><a href="">سوالات متداول</a></li>
                    </ul>
                </div>
            </div>

            <div className={'main-container d-flex justify-content-center '}>
                <div className={'container'}>
                    <div className={'container-inner w-100 d-flex justify-content-center align-items-center'}>
                        <div className={' left-side  d-flex justify-content-center align-items-center'}>
                            <div className={'LS-form mt-3 d-flex flex-column'}>
                                <div className={' LS-form-header'}>
                                    <img className={'form-img'} src={`/img/logo.png`} alt=""/>
                                </div>
                                <form action="POST" onSubmit={(e)=>{
                                e.preventDefault()
                                }}>

                                {
                                    signUp ?
                                        <div className={'LS-form-body mt-4 '}>


                                            <div className={'row mb-4'}>
                                                <div className={'col-md-6'}>

                                                    <label>
                                                        <i className={'ico-append fa fa-user'}/>
                                                        <input className={'name'}
                                                               onChange={handleSignInInputsChange}
                                                               data-tippy-content={'نام شما'} id={'name'}
                                                               type={'text'}
                                                               placeholder={"نام *"}/>
                                                    </label>
                                                </div>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-user'}/>
                                                        <input className={'last-name'}
                                                               onChange={handleSignInInputsChange} type={'text'}
                                                               data-tippy-content={'نام خانوادگی شما'}
                                                               id={'lastName'}
                                                               placeholder={"نام خانوادگی *"}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className={'row mb-4'}>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-mail-bulk'}/>
                                                        <input className={'uid'} onChange={handleSignInInputsChange}
                                                               type={'text'}
                                                               data-tippy-content={'کد ملی شما'} id={'NC'}
                                                               placeholder={"کد ملی *"}/>
                                                    </label>
                                                </div>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-phone'}/>
                                                        <input className={'phone'}
                                                               onChange={handleSignInInputsChange}
                                                               type={'text'}
                                                               data-tippy-content={'شماره موبایل شما'}
                                                               id={'phoneNumber'}
                                                               placeholder={"شماره موبایل *"}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className={'row mb-4'}>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'z-9999 ico-append fa fa-calendar'}/>
                                                        <DatePicker
                                                            value={day}
                                                            calendarClassName={'responsive-calendar'}
                                                            calendarPopperPosition={'top'}
                                                            onChange={(e) => {
                                                                sday(e)
                                                            }}
                                                            inputPlaceholder=" تاریخ تولد *"
                                                            locale={'fa'}
                                                            shouldHighlightWeekends
                                                        />

                                                    </label>
                                                </div>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-mail-bulk'}/>
                                                        <input className={'introducerId'}
                                                               onChange={handleSignInInputsChange} type={'text'}
                                                               data-tippy-content={'کد ملی معرف'}
                                                               id={'introducerNC'}
                                                               placeholder={"کد ملی معرف *"}/>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className={'row mb-4'}>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-lock'}/>
                                                        <input className={'password'}
                                                               onChange={handleSignInInputsChange} type={'text'}
                                                               id={'password'}
                                                               data-tippy-content={'حد اقل 9 حرف (اینگلیسی و اعداد)'}
                                                               placeholder={"کلمه عبور *"}/>
                                                    </label>
                                                </div>
                                                <div className={'col-md-6'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-lock'}/>
                                                        <input className={'password-repeat'}
                                                               onChange={handleSignInInputsChange} type={'text'}
                                                               data-tippy-content={'تکرار کلمه عبور'}
                                                               placeholder={"تکرار کلمه عبور *"}/>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <div className={'LS-form-body mt-4 '}>
                                            <div className={'row mb-4'}>
                                                <div className={'col-12'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-user'}/>
                                                        <input onChange={handleLogInInputsChange}
                                                               data-tippy-content={'نام کاربری'} type={'text'}
                                                               id={'username'}
                                                               placeholder={"نام کاربری (شماره موبایل) *"}/>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className={'col-12'}>
                                                    <label>
                                                        <i className={'ico-append fa fa-user'}/>
                                                        <input onChange={handleLogInInputsChange} type={'text'}
                                                                id={'password'}
                                                               placeholder={"کلمه عبور *"}/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                }
                                {
                                    signUp ?
                                        <div
                                            className={'manual-submit d-flex flex-row-reverse mb-4 justify-content-between align-items-center mt-4'}>
                                            <button type={'submit'} onClick={signUpClickHandler} disabled={loginButtonDisabled}
                                                    className={'btn btn-primary submit d-flex'}>
                                                {
                                                    loginLoading ?
                                                        <div className={'ml-3'}
                                                             style={{
                                                                 color: 'white',
                                                                 width: '20px',
                                                                 height: '20px'
                                                             }}>
                                                            <CircularProgress size={'inherit'} color={'inherit'}/>
                                                        </div>
                                                        :
                                                        <i className={'fa fa-check ml-2'}/>
                                                }

                                                ثبت نام
                                            </button>

                                            <div className={'d-flex IranSans  align-items-center '}>
                                                <input id={'conditions'} className={'ml-2'} type="checkbox"
                                                       name={'condition'}/>
                                                <label style={{paddingTop: '0.4rem'}} className={'m-0'}
                                                       htmlFor={'conditions'}>
                                            <span>
                                                با
                                                <a href=""> شرایط و قوانین </a>
                                            موافقم
                                            </span>
                                                </label>
                                            </div>
                                        </div>
                                        :
                                        <div
                                            className={'manual-submit d-flex flex-row-reverse mb-4 justify-content-center align-items-center mt-4'}>
                                            <button type={'submit'} disabled={loginButtonDisabled} onClick={loginClickHandler}
                                                    className={'btn btn-primary submit d-flex'}>
                                                {
                                                    loginLoading ?
                                                        <div className={'ml-3'}
                                                             style={{
                                                                 color: 'white',
                                                                 width: '20px',
                                                                 height: '20px'
                                                             }}>
                                                            <CircularProgress size={'inherit'} color={'inherit'}/>
                                                        </div>
                                                        :
                                                        <i className={'fa fa-user ml-2'}/>
                                                }
                                                ورود
                                            </button>
                                        </div>
                                }
                                </form>
                            </div>
                        </div>
                        <div className={' right-side pt-4 '}>
                            {
                                infoBoxes.map(eachOption => {
                                    return (
                                        <div style={{direction: 'rtl'}}
                                             className={'info-block d-flex align-items-center '}>
                                            <i style={{fontSize: '1.8rem'}}
                                               className={eachOption['FAClass'] + ' ml-3 mb-2'}/>
                                            <div className={'text-right d-flex flex-column '}>
                                                <h4 className={'info-block-title IranSans pt-1'}>
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
export default IndexPage;
