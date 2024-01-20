import "../css/CheckoutShippingAndDelivery.css"; 
import { useEffect, useState } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import ChangeShippingDetails from "../modal/ChangeShippingDetails.js";

const CheckoutShippingAndDelivery = () => {
    
    const userData = useContext(UserContext);
    let userDataId = userData.value.id;
    
    const [recipientDetails, setRecipientDetails] = useState([]);

    const [openChangeShippingADetailsModal, setOpenChangeShippingDetailsModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/get-registered-user/${userDataId}`)
            .then(response => {
                setRecipientDetails(response.data);
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
            <div>
                {openChangeShippingADetailsModal && <ChangeShippingDetails close={closeModal}/>}
            </div>
            <div className="mt-3 text-center shipping-and-delivery-top-text">
                <p>Shipping $ Delivery</p>
            </div>
                <div className="mt-5">
                    <div className="shipping-container">
                        <h5 >First Name:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.first_name}</h5>
                    </div>
                    <div className="form-group shipping-container">
                        <h5 >Last Name:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.last_name}</h5>
                    </div>
                    <div className="form-group shipping-container">
                        <h5>Address:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.address}</h5>
                    </div>
                    <div className="form-group shipping-container">
                        <h5>City:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.city}</h5>
                    </div>
                    <div className="form-group shipping-container">
                        <h5>Zip Code:</h5>
                        <h5 className="fw-bold">{recipientDetails[0]?.zip_code}</h5>
                    </div>
                </div>
                <div className="ps-5 pe-5 d-flex justify-content-center mt-3">
                    <button 
                    className="btn w-100 fs-5 send-shipping-data-button"
                    onClick={openModal}
                    >Change Shipping Details
                    </button>
                </div>
        </div>
    )
}

export default CheckoutShippingAndDelivery;
