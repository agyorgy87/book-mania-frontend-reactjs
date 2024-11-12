import "../css/CheckoutShippingAndDelivery.css"; 
import { useState } from 'react';


import ChangeShippingDetails from "../modal/ChangeShippingDetails.js"; 

const CheckoutShippingAndDelivery = ({shippingAddress, setShippingAddress}) => {

    const [openChangeShippingADetailsModal, setOpenChangeShippingDetailsModal] = useState(false);

    const openModal = () => { 
        setOpenChangeShippingDetailsModal(true);
    }

    const closeModal = () => {
        setOpenChangeShippingDetailsModal(false); 
    }

    return (  
        <div className="shipping-and-delivery-table"> 
            <div className="container-fluid">
                {openChangeShippingADetailsModal && <ChangeShippingDetails close={closeModal}
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                />}
            </div>
            <div className="text-center shipping-and-delivery-top-text"> 
                <p>Shipping $ Delivery</p>
            </div>
            <div className="mt-3">
                <div className="shipping-containers">
                    <p>First Name:</p>
                    <p className="fw-bold">{shippingAddress?.firstName}</p> 
                </div>
                <div className="shipping-containers">
                    <p>Last Name:</p>
                    <p className="fw-bold">{shippingAddress?.lastName}</p>
                </div>
                <div className="shipping-containers">
                    <p>Address:</p>
                    <p className="fw-bold">{shippingAddress?.address}</p>
                </div>
                <div className="shipping-containers">
                    <p>City:</p>
                    <p className="fw-bold">{shippingAddress?.city}</p>
                </div>
                <div className="shipping-containers">
                    <p>Zip Code:</p>
                    <p className="fw-bold">{shippingAddress?.zipCode}</p>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <button 
                className="btn change-shipping-details-button" 
                onClick={openModal}
                >Change Shipping Details
                </button>
            </div>
        </div>
    )
}

export default CheckoutShippingAndDelivery;
