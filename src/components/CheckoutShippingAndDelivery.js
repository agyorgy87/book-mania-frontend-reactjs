import "../css/CheckoutShippingAndDelivery.css"; 
import { useEffect, useState } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";

const CheckoutShippingAndDelivery = () => {

    const [firstNameInputValue, setFirstNameInputValue] = useState("");
    const [lastNameInputValue, setLastNameInputValue] = useState("");
    const [addressInputValue, setAddressInputValue] = useState("");
    const [cityInputValue, setCityInputValue] = useState("");
    const [zipCodeInputValue, setZipCodeInputValue] = useState("");

    const userData = useContext(UserContext);
    let userDataId = userData.value.id;

    //console.log(userAllData);

    useEffect(() => {
        axios.get(`http://localhost:4000/get-registered-user/${userDataId}`)
            .then(response => {
                const userData = response.data[0];
                if(userData) {
                    setFirstNameInputValue(userData.first_name);
                    setLastNameInputValue(userData.last_name);
                    setAddressInputValue(userData.address);
                    setCityInputValue(userData.city);
                    setZipCodeInputValue(userData.zip_code);
                }
            })
            .catch(error => {
                console.log("Error message:", error);
            })
    },[]);

    const firstNameInputChange = (e) => {
        setFirstNameInputValue(e.target.value); 
    }

    const lastNameInputChange = (e) => {
        setLastNameInputValue(e.target.value);
    }

    const addressInputChange = (e) => {
        setAddressInputValue(e.target.value);
    }

    const cityInputChange = (e) => {
        setCityInputValue(e.target.value);
    }

    const zipCodeInputChange = (e) => {
        setZipCodeInputValue(e.target.value);
    }


    return (  
        <div>
            <div className="mt-3 text-center shipping-and-delivery-top-text">
                <p>Shipping $ Delivery</p>
            </div>
                    <form className="ps-5 pe-5" autoComplete="off">
                        <div className="form-group labels-and-inputs-container shipping-container">
                            <label className="form-label shipping-label fw-bold">First Name</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={firstNameInputValue}
                                    onChange={firstNameInputChange}
                                    />
                                </div>
                        </div>
                        <div className="form-group labels-and-inputs-container shipping-container">
                            <label className="form-label shipping-label fw-bold">Last Name</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={lastNameInputValue}
                                    onChange={lastNameInputChange}
                                    />
                                </div>
                        </div>                   
                        <div className="form-group labels-and-inputs-container shipping-container">
                            <label className="form-label shipping-label fw-bold">Address</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={addressInputValue}
                                    onChange={addressInputChange}
                                    />
                                </div>
                        </div> 
                        <div className="form-group labels-and-inputs-container shipping-container">
                            <label className="form-label shipping-label fw-bold">City</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={cityInputValue}
                                    onChange={cityInputChange}
                                    />
                                </div>
                        </div> 
                        <div className="form-group labels-and-inputs-container shipping-container">
                            <label className="form-label shipping-label fw-bold">Zip Code</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={zipCodeInputValue}
                                    onChange={zipCodeInputChange}
                                    />
                                </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn w-100 fs-5 send-shipping-data-button">Save Delivery Address</button>
                        </div>
                    </form>
        </div>
    )
}

export default CheckoutShippingAndDelivery;
