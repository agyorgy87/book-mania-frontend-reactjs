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
            <div className="container d-flex">
                <div className="shipping-and-delivery-container">
                    <CheckoutShippingAndDelivery/>
                </div>
                <div className="order-summary-container">
                    <CheckoutTotalSummary/>
                </div>  
            </div>
        </div>
    )
}

export default Checkout;
