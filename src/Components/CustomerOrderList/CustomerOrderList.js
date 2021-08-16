import React, {useEffect} from 'react';

import './css/CustomerOrderList.css'
const CustomerOrderList = () => {

    let [customerOrderList,setCOL] = React.useState([])
    let getCustomerOrders = ()=>{

    }
    useEffect(()=>{
    getCustomerOrders()
    },[])
    return (
        <div className={'w-100 mt-2 flex-column px-2 recent-orders-main'}>
            <span className={'w-100 text-center mt-2 mb-3 IranSans'}>خرید های اخیر </span>
            <div className={'each-customer-order shadow-sm border'}>


            </div>
        </div>
    );
};

export default CustomerOrderList;
