import '../css/Checkout.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import NavigationBar from '../components/NavigationBar.js';
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Checkout = () => {

    const cartData = useContext(CartContext);
    const userData = useContext(UserContext);
    
    let userDataId = userData.value.id;

    const [userAllData, setUserAllData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/get-registered-user/${userDataId}`)
            .then(response => {
                setUserAllData(response.data)
            })
    },[])

    const allData = userAllData[0];

    return (
        <div className="checkout-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container d-flex">
                <div className="shipping-and-delivery-container">
                    <h1>Shipping $ Delivery</h1>
                    <p>first name:{allData.first_name}</p>
                </div>
                <div className="order-summary-container">
                    <h1>Order Summary</h1>
                </div>
            </div>
        </div>
    )
}

export default Checkout
