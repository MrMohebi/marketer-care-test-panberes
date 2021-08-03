import React from 'react';
import './css/mainPanel.css'
const MainPanel = () => {
    return (
        <div className={'main-component-container px-2 py-3'}>
            <div className={'urls-container w-100 pt-4 px-3 pb-4'}>
                <div className={'link-label IranSans w-100 '}>
                    لینک یکتای شما جهت معرفی
                </div>
                <div className={'url-box mx-2 '}>
                    <input className={'url-link'} type="text" readOnly={true} value={'http://mokafela.ir23824234'}/>
                    <button className={'btn btn-success IranSans ml-auto mr-auto my-3'}> کپی</button>
                </div>
            </div>
            <div className={'urls-container w-100 mt-3 pt-4 pb-4 px-3'}>
                <div className={'link-label IranSans w-100 '}>
                    لیست مشتریان
                </div>
                <table dir={'rtl'} className={'w-100 costumers-table mt-3 '}>
                    <tr>
                        <td>ردیف</td>
                        <td>نام</td>
                        <td>نام خانوادگی</td>
                        <td>موبایل</td>
                        <td>کد ملی</td>
                        <td>تاریخ تولد</td>
                        <td>معرف</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default MainPanel;
