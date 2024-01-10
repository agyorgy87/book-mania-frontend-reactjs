import '../css/Checkout.css';
import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import CheckoutShippingAndDelivery from '../components/CheckoutShippingAndDelivery.js';
import CheckoutTotalSummary from '../components/CheckoutTotalSummary.js';

const Checkout = () => {

    return (
        <div className="checkout-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="shipping-and-delivery-container col-xl-5 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                    <CheckoutShippingAndDelivery/>
                </div>
                <div className="order-summary-container col-xl-5 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                    <CheckoutTotalSummary/>
                </div>  
            </div>
        </div>
    )
}

export default Checkout;
