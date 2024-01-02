import '../css/Checkout.css';
import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import CheckoutShippingAndDelivery from '../components/CheckoutShippingAndDelivery.js';
import CheckoutTotalSummary from '../components/CheckoutTotalSummary.js';

const Checkout = () => {

    const cartData = useContext(CartContext);

    return (
        <div className="checkout-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container d-flex">
                <div className="order-summary-container">
                    <CheckoutTotalSummary/>
                </div>
                <div className="shipping-and-delivery-container">
                    <CheckoutShippingAndDelivery/>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
