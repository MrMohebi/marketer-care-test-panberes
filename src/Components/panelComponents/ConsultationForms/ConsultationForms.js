import React, {useEffect, useState} from 'react';
import NewConsultationFormDialog from "./NewConsulationFormDialog/NewConsultationFormDialog";
import {getUserLinks} from "../../../assets/queries/queries";
import {getToken} from "../../../assets/externalFunctions";
import './css/CF.css'
import {BarsSpinner} from "react-spinners-kit";
const ConsultationForms = () => {
    let [dialogVisible, sdv] = useState(false)
    let [links, sl] = useState([])
    useEffect(() => {
        getUserLinks(getToken(), (data) => {
            sl(data.data.links)
        })
    }, [])
    return (
        <div className={'main-component-container px-2 py-3'}>

            <div className={'urls-container w-100 pt-4 px-3 d-flex flex-column align-items-end pb-4 r'}>
                <div className={'link-label IranSans w-100 w-50 '}>
                    فرم های مشاوره
                </div>
                <button onClick={() => {
                    sdv(true)
                }} style={{
                    whiteSpace: 'nowrap',
                }} className={'btn btn-success IranSans pt-2 mt-3  '}>ساخت فرم جدید
                </button>
            </div>
            <NewConsultationFormDialog visible={dialogVisible} setVisible={sdv}/>
            <div className={'main-component-container px-2 py-3'}>

                <div className={'urls-container w-100 pt-4 px-3 d-flex flex-column align-items-end pb-4 r'}>



                    <table dir={'rtl'} className={'w-100 costumers-table mt-3 '}>
                        <thead>
                        <tr className={'customers-table-head'}>
                            <td>ردیف</td>
                            <td>نام</td>
                            <td>کد</td>
                            <td>نتایج</td>
                        </tr>
                        </thead>
                        <tbody className={'costumer-table-body'}>

                        {
                           links.map((eachLink,index)=>{
                               return (
                                   <tr  style={{
                                       animationDelay: (index * 50) + 'ms'
                                   }} className={'table-ds'}>
                                       <td className={'text-center'}>{index}</td>
                                       <td className={'text-center'}>{eachLink.name}</td>

                                       <td className={'text-center'}>{eachLink.code}</td>
                                       <td className={'text-center'}><button style={{
                                           height:30,
                                           width:60
                                       }} className={'btn btn-info IranSans'}>نتایج</button> </td>
                                   </tr>
                               )
                           })

                        }
                        </tbody>
                    </table>

                    {/*<table style={{*/}
                    {/*    borderCollapse:'separate',*/}
                    {/*    borderSpacing:'0 20px'*/}
                    {/*}} className={'w-100 IranSans'}>*/}
                    {/*    <tr>*/}
                    {/*        <td className={'text-center'}>نتایج</td>*/}

                    {/*        <td className={'text-center'}>کد</td>*/}
                    {/*        <td className={'text-center'}>نام</td>*/}

                    {/*        <td className={'text-center'}>ردیف</td>*/}
                    {/*    </tr>*/}

                    {/*    {*/}
                    {/*        links.map((eachLink,index)=>{*/}
                    {/*            return(*/}
                    {/*                <tr className={'each-link-row shadow mt-3'}>*/}
                    {/*                    <td className={'text-center'}><button style={{*/}
                    {/*                        height:30,*/}
                    {/*                        width:60*/}
                    {/*                    }} className={'btn btn-info IranSans'}>نتایج</button> </td>*/}
                    {/*                    <td className={'text-center'}>{eachLink.code}</td>*/}
                    {/*                    <td className={'text-center'}>{eachLink.name}</td>*/}
                    {/*                    <td className={'text-center'}>{index}</td>*/}

                    {/*                </tr>*/}
                    {/*                )*/}

                    {/*        })*/}
                    {/*    }*/}


                    {/*</table>*/}
                </div>
            </div>
        </div>
    );
};

export default ConsultationForms;