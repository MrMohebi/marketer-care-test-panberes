import React, {useState} from 'react';
import {ButtonBase} from "@material-ui/core";
import Switch from "react-switch";
import $ from 'jquery'
import {getToken} from "../../../../assets/externalFunctions";

let queries = require('../../../../assets/queries/queries')

const NewConsultationFormDialog = (props) => {
    let [editableForm, sef] = useState(false)
    let toggleGender = (e) => {
        let genderSection = e.currentTarget
        if (genderSection.classList.contains('marital-status')) {
            genderSection.classList.toggle('marital-married')
        } else {
            genderSection.classList.toggle('male-select')
        }
    }

    let formSubmit = () => {
        let name = $('#customerName').val()
        let age = parseInt($('#customerAge').val())
        let textAddress = $('#customerAddressText').val()
        let phone = $('#customerPhone').val()
        let gender = $('#gender')[0].classList.contains('male-selected') ? 'male' : 'female'
        let maritalStatus = $('#maritalStatus')[0].classList.contains('marital-married') ? 'married' : 'single'
        queries.createLink(getToken(), name, age, textAddress, phone, gender, maritalStatus, editableForm)
    }
    return (
        <div
            className={'vh-100 vw-100 newCustomerOverlay  flex-column align-items-center justify-content-center ' + (props.visible ? 'd-flex animated__fadeIn' : 'd-none')}>
            <div
                className={'newCustomerPopUp d-flex flex-column align-items-center position-relative ' + (props.visible ? 'd-flex animate__animated animate__fadeIn' : 'd-none')}>
                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    height: 30,
                    width: 30
                }} onClick={() => {
                    props.setVisible(false)
                }} className={' IranSans d-flex justify-content-center align-items-center'}>x
                </div>
                <h4 className={'text-center IranSans text-black-50 mb-3'}>فرم مشاوره جدید</h4>
                <input type="text" id={'customerName'} className={'newCustomerInput'} dir={'rtl'}
                       placeholder={'نام و نام خانوادگی'}/>
                <input type="number" min={0} step={1} id={'customerAge'} className={'newCustomerInput'} dir={'rtl'}
                       placeholder={'سن'}/>
                <textarea style={{
                    fontSize: '0.8rem'
                }} id={'customerAddressText'} className={'newCustomerInput'} dir={'rtl'} placeholder={'آدرس متنی'}/>
                <input type="number" min={0} step={1} id={'customerPhone'} className={'newCustomerInput'} dir={'rtl'}
                       placeholder={'شماره تلفن'}/>
                <div onClick={(e) => {
                    toggleGender(e)
                }} className={'customerGenderSelection gender IranSans  w-100 d-flex justify-content-center'}
                     id={'gender'}>
                    <div className={'gender-toggle position-absolute'}/>
                    <div className={'eachCustomerGender male w-50 text-center pt-1'}>
                        مرد
                    </div>
                    <div className={'eachCustomerGender female w-50  text-center pt-1'}>
                        زن
                    </div>
                </div>
                <div onClick={(e) => {
                    toggleGender(e)
                }} id={'maritalStatus'} className={'customerGenderSelection marital-status IranSans  w-100 d-flex justify-content-center'}>
                    <div className={'gender-toggle position-absolute'}/>
                    <div className={'eachCustomerGender married w-50 text-center pt-1'}>
                        متاهل
                    </div>
                    <div className={'eachCustomerGender single w-50  text-center pt-1'}>
                        مجرد
                    </div>
                </div>
                <span className={'IranSans mt-3'}>قابلیت ویرایش</span>
                <Switch onColor={'#0c0cb2'} onChange={() => {
                    sef(!editableForm)
                }} checked={editableForm}/>

                <ButtonBase className={'IranSans submitNewCustomer'} style={{
                    width: '90%',
                    // border:'2px solid blue',
                    borderRadius: '5px',
                    marginTop: '30px',
                    paddingTop: '5px',
                    outline: 'none',
                    height: '40px',
                    color: 'white',
                    marginBottom: '20',
                    minHeight: 40,
                    backgroundColor: '#0c0cb2'
                }}
                            onClick={()=>{
                            formSubmit()
                            }}
                >ایجاد فرم مشاوره</ButtonBase>
            </div>
        </div>
    );
};

export default NewConsultationFormDialog;