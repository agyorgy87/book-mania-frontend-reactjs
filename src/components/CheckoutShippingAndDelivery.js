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
        <div>
            <div className="container-fluid">
                {openChangeShippingADetailsModal && <ChangeShippingDetails close={closeModal}
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                />}
            </div>
            <div className="mt-3 text-center shipping-and-delivery-top-text">
                <p>Shipping $ Delivery</p>
            </div>
                <div className="mt-5">
                    <div className="shipping-containers">
                        <h5 >First Name:</h5>
                        <h5 className="fw-bold">{shippingAddress?.firstName}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5 >Last Name:</h5>
                        <h5 className="fw-bold">{shippingAddress?.lastName}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5>Address:</h5>
                        <h5 className="fw-bold">{shippingAddress?.address}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5>City:</h5>
                        <h5 className="fw-bold">{shippingAddress?.city}</h5>
                    </div>
                    <div className="shipping-containers">
                        <h5>Zip Code:</h5>
                        <h5 className="fw-bold">{shippingAddress?.zipCode}</h5>
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
