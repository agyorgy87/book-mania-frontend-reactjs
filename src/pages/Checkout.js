import '../css/Checkout.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import NavigationBar from '../components/NavigationBar.js';
import CheckoutShippingAndDelivery from '../components/CheckoutShippingAndDelivery.js';
import CheckoutTotalSummary from '../components/CheckoutTotalSummary.js';

const Checkout = () => {

    const userData = useContext(UserContext);
    let userDataId = userData.value.id;

    const [shippingAddress, setShippingAddress] = useState({});

    useEffect(() => {     
            axios.get(`http://localhost:4000/get-registered-user/${userDataId}`)
                .then(response => {                  
                    let userOrderDetails = {
                        firstName: response.data[0].first_name,
                        lastName: response.data[0].last_name,
                        address: response.data[0].address,
                        city: response.data[0].city,
                        zipCode: response.data[0].zip_code,
                        email: response.data[0].email
                    };
                    setShippingAddress(userOrderDetails);
                    //console.log(userOrderDetails);
            })       
    },[]);

    return (
        <div className="checkout-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="shipping-and-delivery-container col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                    <CheckoutShippingAndDelivery 
                    shippingAddress={shippingAddress}
                    setShippingAddress={setShippingAddress}
                    />
                </div>
                <div className="order-summary-container col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                    <CheckoutTotalSummary 
                    shippingAddress={shippingAddress}
                    />
                </div>  
            </div>
        </div>
    )
}

export default Checkout;
