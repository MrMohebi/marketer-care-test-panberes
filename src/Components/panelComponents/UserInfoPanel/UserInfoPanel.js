import React, {useEffect} from 'react';
import './css/userInfoPanel.css'
import $ from 'jquery'
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import swal from "sweetalert2";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";

let queries = require('../../../assets/queries/queries')

const UserInfoPanel = (props) => {
    let [day, sday] = React.useState()
    let [loading, setLoading] = React.useState(false)


    let changeUserInfo = () => {
        setLoading(true)
        let name = $('#name').val()
        let phone = $('#phone').val()
        let email = $('#email').val()
        queries.changeUserInfo(props.token,'',name,phone,email,changeUserCallback)
    }
    let changeUserCallback = (res) => {
        setLoading(false)
        if (res['errors']) {
            swal.fire({
                icon: 'error',
                title: 'توکن منقضی شده است',
                text: 'لطفا دوباره وارد شوید و تلاش کنید',
                confirmButtonText: 'خروج'
            })
        } else {
            swal.fire({
                icon: 'success',
                title: 'با موفقیت تغیر کرد',
                text: 'اطلاعات جدید شما در سامانه ثبت شد',
                confirmButtonText: 'تایید'
            })
        }
    }

    useEffect(() => {
    }, [])
    return (
        <div className={'main-component-container px-2 py-3'}>
            <LoadingOverlay loading={loading}/>
            <div
                className={'inner-container d-flex flex-column align-content-center w-100  pt-4 pb-4 px-3 position-relative'}>
                <div className={'w-100 d-flex flex justify-content-end'}>
                    <h5 className={'user-info-label-holder'}>اطلاعات شخصی</h5>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container mt-5 justify-content-center'}>
                    <input readOnly={true} className={"user-info-edit-input IranSansLight w-50"} type="text" id={'userName'}
                           defaultValue={props.userData['username']}/>
                    <label htmlFor={'userName'} className={'user-info-edit-label IranSansLight'}> نام کاربری</label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input className={"user-info-edit-input IranSansLight w-50"} type="text" id={'name'}
                           defaultValue={props.userData.name}/>
                    <label htmlFor={'name'} className={'user-info-edit-label IranSansLight'}>نام
                        خانوادگی</label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input readOnly={true} className={"user-info-edit-input IranSansLight w-50"} type="text"
                           defaultValue={props.userData['uId']}
                           id={'NC'}/>
                    <label htmlFor={'NC'} className={'user-info-edit-label IranSansLight'}>کد ملی</label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input className={"user-info-edit-input IranSansLight w-50"} type="text"
                           defaultValue={props.userData['phone']}
                           id={'phone'}/>
                    <label htmlFor={'phone'} className={'user-info-edit-label IranSansLight'}>شماره
                        تلفن</label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <DatePicker
                        value={day}
                        calendarClassName={'responsive-calendar'}
                        calendarPopperPosition={'top'}
                        onChange={(e) => {
                            sday(e)
                        }}
                        inputPlaceholder=" "
                        locale={'fa'}
                        shouldHighlightWeekends
                    />
                    <label htmlFor={'phoneNumber'} className={'user-info-edit-label IranSansLight'}>
                        تاریخ تولد</label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input className={"user-info-edit-input IranSansLight w-50"} type="text"
                           defaultValue={props.userData['address']}
                           id={'address'}/>
                    <label htmlFor={'address'} className={'user-info-edit-label IranSansLight'}>آدرس
                    </label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input className={"user-info-edit-input IranSansLight w-50"} type="text"
                           defaultValue={props.userData['email']}
                           id={'email'}/>
                    <label htmlFor={'email'} className={'user-info-edit-label IranSansLight'}>
                        ایمیل</label>
                </div>
                <div
                    className={'d-flex flex-row user-info-edit-input-container border-bottom pb-3 justify-content-center'}>
                    <form className={'d-flex w-50 justify-content-end align-content-center'}>
                        <div className={'d-flex w-100 justify-content-end align-content-center gender-holder'}>
                            <input type="radio" id="contactChoice1"
                                   name="contact" value="email"/>
                            <label htmlFor="contactChoice1">زن</label>
                            <input type="radio" id="contactChoice2"
                                   name="contact" value="phone"/>
                            <label htmlFor="contactChoice2">مرد</label>
                        </div>
                    </form>
                    <label className={'user-info-edit-label IranSansLight'}>
                        جنسیت</label>
                </div>
                <div className={'w-100 d-flex flex mt-3 justify-content-end'}>
                    <h5 className={'user-info-label-holder'}>
                        تغییر گذرواژه
                    </h5>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input className={"user-info-edit-input IranSansLight w-50"} type="text"
                           id={'newPass'}/>
                    <label htmlFor={'newPass'} className={'user-info-edit-label IranSansLight'}>گذرواژه جدید
                    </label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <input className={"user-info-edit-input IranSansLight w-50"} type="text"
                           id={'newPassRepeat'}/>
                    <label htmlFor={'newPassRepeat'} className={'user-info-edit-label IranSansLight'}>تکرار گذرواژه جدید
                    </label>
                </div>
                <div className={'d-flex flex-row user-info-edit-input-container justify-content-center'}>
                    <button onClick={changeUserInfo} className={'btn btn-outline-success mx-2'}>ثبت اطلاعات جدید
                    </button>
                </div>

            </div>

        </div>
    );
};

export default UserInfoPanel;
