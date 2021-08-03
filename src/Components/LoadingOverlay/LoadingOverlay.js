import React from 'react';
import { MetroSpinner } from "react-spinners-kit";
import './css/LoadingOverlay.css'
const LoadingOverlay = (props) => {
    return (
        <div className={'position-absolute w-100 h-100 loading-overlay-main-container flex-column justify-content-center align-items-center '+(props.loading?'':'d-none')}>
            <MetroSpinner size={40} color="#fff" loading={props.loading} />;
            <button className={'btn btn-secondary overlay-cancel-button'}>لغو</button>
        </div>
    );
};

export default LoadingOverlay;
