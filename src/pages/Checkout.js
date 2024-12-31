import '../css/Checkout.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import NavigationBar from '../components/NavigationBar.js';
import CheckoutShippingAndDelivery from '../components/CheckoutShippingAndDelivery.js';
import CheckoutTotalSummary from '../components/CheckoutTotalSummary.js';
import SuccessfullOrderModal from "../modal/SuccessfullOrderModal.js";

const Checkout = () => {

    const userData = useContext(UserContext);
    let userDataId = userData.value.id;

    const [shippingAddress, setShippingAddress] = useState({});
    const [openSuccessfullOrderModal, setOpenSuccessfullOrderModal] = useState(false); 

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    useEffect(() => {     
            axios.get(envAndLocal + `/get-registered-user/${userDataId}`)
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
            })       
    },[]);

    return (
        <div className="checkout-page mb-5"> 
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div>
                {openSuccessfullOrderModal && <SuccessfullOrderModal/>}
            </div>
            <div className="checkout-page-container">
                <div className="shipping-and-delivery-container d-flex justify-content-center">
                    <CheckoutShippingAndDelivery 
                    shippingAddress={shippingAddress}
                    setShippingAddress={setShippingAddress}
                    />
                </div>
                <div className="d-flex justify-content-center "> 
                    <CheckoutTotalSummary   
                    shippingAddress={shippingAddress}
                    setOpenModal={setOpenSuccessfullOrderModal} 
                    />
                </div>  
            </div>
        </div>
    )
}

export default Checkout;
