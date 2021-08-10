import React from 'react';


import './css/NewCustomerDialog.css';


import $ from 'jquery';
import {ButtonBase} from "@material-ui/core";
import swal from 'sweetalert2';
import {useHistory} from "react-router-dom";

let queries = require('../../assets/queries/queries')
const NewCustomerDialog = (props) => {
    let history = useHistory()
    let toggleGender = (e) => {
        let genderSection = e.currentTarget

        if (genderSection.classList.contains('marital-status')) {
            genderSection.classList.toggle('marital-married')
        } else {
            genderSection.classList.toggle('male-select')
        }
    }
    let submitNewCustomer = () => {
        let token = props.token;
        let name = $('#customerName').val();
        let age = parseInt($('#customerAge').val());
        let textAddress = $('#customerAddressText').val();
        let phone = $('#customerPhone').val();
        let gender = $('.gender')[0].classList.contains('male-select') ? 'male' : 'female';
        let maritalStatus = $('.marital-status')[0].classList.contains('marital-married') ? 'married' : 'single';
        let coordinates = '0';   // forNow

        if (token) {
            if (name) {
                queries.NewCustomer(token, name, age, textAddress, phone, gender, maritalStatus, newCustomerCallback)
            }
        } else {
            swal.fire({
                icon:'error',
                title: 'توکن منقضی شده است',
                text: 'جددا وارد شوید',
                confirmButtonText: 'تایید'
            })
            history.push('/')
        }
    }
    let newCustomerCallback = (res) => {
        if (res['errors']) {
            swal.fire({
                icon:'error',
                title: 'عملیات نا موفق',
                text: 'لطفا ورودی ها را مجددا بررسی کنید',
                confirmButtonText: 'تایید'
            })
        }else{
            swal.fire({
                icon:'success',
                title: 'عملیات  موفق',
                text: 'مشتری جدید با موفقیت ثبت شد',
                confirmButtonText: 'تایید'
            })
            props.updateTable(Math.random()*100)
          document.querySelectorAll('.newCustomerPopUp input').forEach(input=>{
              input.value = ''
          })
            document.querySelector('.newCustomerPopUp textarea').value = ''
            props.setNewCustomerVisible(false)
        }
    }
    return (
        <div
            onClick={(e)=>{
                if (e.target['classList'].contains('newCustomerOverlay')){
                    props.setNewCustomerVisible(false)
                }
            }}
            className={'vh-100 vw-100 newCustomerOverlay  flex-column align-items-center justify-content-center ' + (props.visible? 'd-flex animated__fadeIn':'d-none')}>
            <div className={'newCustomerPopUp d-flex flex-column align-items-center position-relative '+ (props.visible? 'd-flex animate__animated animate__fadeIn':'d-none')}>
                <div onClick={()=>{
                props.setNewCustomerVisible(false)
                }} style={{
                    position:'absolute',
                    top:10,
                    left:0,
                    height:30,
                    width:30
                }} className={' IranSans d-flex justify-content-center align-items-center'}>x</div>
                <h4 className={'text-center IranSans text-black-50 mb-3'}>
                    ثبت مشتری جدید
                </h4>
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
                }} className={'customerGenderSelection gender IranSans  w-100 d-flex justify-content-center'}>
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
                }} className={'customerGenderSelection marital-status IranSans  w-100 d-flex justify-content-center'}>
                    <div className={'gender-toggle position-absolute'}/>
                    <div className={'eachCustomerGender married w-50 text-center pt-1'}>
                        متاهل
                    </div>
                    <div className={'eachCustomerGender single w-50  text-center pt-1'}>
                        مجرد
                    </div>
                </div>

                <ButtonBase onClick={() => {
                    submitNewCustomer()
                }} className={'IranSans submitNewCustomer'} style={{
                    width: '90%',
                    // border:'2px solid blue',
                    borderRadius: '5px',
                    marginTop: '30px',
                    paddingTop: '5px',
                    outline: 'none',
                    height: '40px',
                    color: 'white',
                    backgroundColor: '#0c0cb2'
                }}>
                    ثبت مشتری جدید
                </ButtonBase>
            </div>
        </div>
    );
};

export default NewCustomerDialog;
