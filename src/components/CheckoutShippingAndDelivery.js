import "../css/CheckoutShippingAndDelivery.css"; 
import { useEffect, useState } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import ChangeShippingDetails from "../modal/ChangeShippingDetails.js"; 

const CheckoutShippingAndDelivery = (props) => {
    
    const userData = useContext(UserContext);
    let userDataId = userData.value.id;
    
    const [recipientDetails, setRecipientDetails] = useState([]);

    const [openChangeShippingADetailsModal, setOpenChangeShippingDetailsModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/get-registered-user/${userDataId}`)
            .then(response => {
                setRecipientDetails(response.data);

                let userOrderDetails = {
                    firstName: response.data[0].first_name,
                    lastName: response.data[0].last_name,
                    address: response.data[0].address,
                    city: response.data[0].city,
                    zipCode: response.data[0].zip_code,
                    email: response.data[0].email
                };

                props.setUserShippingAddress(userOrderDetails);
            })
    },[]);

    const openModal = () => { 
        setOpenChangeShippingDetailsModal(true);
    }

    const closeModal = () => {
        setOpenChangeShippingDetailsModal(false);
    }

    return (  
        <div>
            <div className="container-fluid">
                {openChangeShippingADetailsModal && <ChangeShippingDetails close={closeModal}
                userShippingAddress={props.userShippingAddress} setUserShippingAddress={props.setUserShippingAddress}
                />}
            </div>
            <div className="mt-3 text-center shipping-and-delivery-top-text">
                <p>Shipping $ Delivery</p>
            </div>
                <div className="mt-5">
                    <div className="shipping-containers">
                        <h5 >First Name:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.first_name}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5 >Last Name:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.last_name}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5>Address:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.address}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5>City:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.city}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5>Zip Code:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.zip_code}</h5>
                    </div>
                </div>
                <div className="mt-3 d-flex justify-content-center send-shipping-data-button-container">
                    <button 
                    className="btn send-shipping-data-button" 
                    onClick={openModal}
                    >Change Shipping Details
                    </button>
                </div>
        </div>
    )
}

export default CheckoutShippingAndDelivery;
