import "../css/CheckoutShippingAndDelivery.css"; 
import { useEffect, useState } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const CheckoutShippingAndDelivery = () => {

    const [firstNameInputValue, setFirstNameInputValue] = useState(".");
    const [lastNameInputValue, setLastNameInputValue] = useState(".");
    const [addressInputValue, setAddressInputValue] = useState(".");
    const [cityInputValue, setCityInputValue] = useState(".");
    const [zipCodeInputValue, setZipCodeInputValue] = useState(".");

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);

    const firstNameErrorTextMessage = "Please enter your first name."
    const lastNameErrorTextMessage = "Please enter your last name."
    const addressErrorTextMessage = "Please enter your address."
    const cityErrorTextMessage = "Please enter you city."
    const zipCodeErrorMessage = "Please enter your zip code."
  
    const userData = useContext(UserContext);
    let userDataId = userData.value.id;

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

    useEffect (() => {
        if(firstNameInputValue === ""){
            setFirstNameError(true);
        }else{
            setFirstNameError(false);
        }
        
        if(lastNameInputValue === ""){
            setLastNameError(true);
        }else{
            setLastNameError(false);
        }
        
        if(addressInputValue === ""){
            setAddressError(true);
        }else{
            setAddressError(false);
        }
        
        if(cityInputValue === ""){
            setCityError(true);
        }else{
            setCityError(false);
        }

         if(zipCodeInputValue === ""){
            setZipCodeError(true);
        }else{
            setZipCodeError(false);
        }
    },[firstNameInputValue,lastNameInputValue,addressInputValue,cityInputValue,zipCodeInputValue]);

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

    const sendPurchaseInformation = () => {
        console.log("yes");
    }


    return (  
        <div>
            <div className="mt-3 text-center shipping-and-delivery-top-text">
                <p>Shipping $ Delivery</p>
            </div>
                    <form className="ps-5 pe-5" autoComplete="off">
                        <div className="form-group shipping-container">
                            <label className="form-label fw-bold">First Name</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={firstNameInputValue}
                                    onChange={firstNameInputChange}
                                    />
                                </div>
                                {firstNameError ?
                                    <div className="d-flex mt-1">
                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                            <p className="invalid-data-text ms-1">{firstNameErrorTextMessage}</p> 
                                    </div>
                                    : null
                                }
                        </div>
                        <div className="form-group shipping-container">
                            <label className="form-label fw-bold">Last Name</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={lastNameInputValue}
                                    onChange={lastNameInputChange}
                                    />
                                </div>
                                {lastNameError ?
                                    <div className="d-flex mt-1">
                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                            <p className="invalid-data-text ms-1">{lastNameErrorTextMessage}</p> 
                                    </div>
                                    : null
                                }
                        </div>                   
                        <div className="form-group shipping-container">
                            <label className="form-label fw-bold">Address</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={addressInputValue}
                                    onChange={addressInputChange}
                                    />
                                </div>
                                {addressError ?
                                    <div className="d-flex mt-1">
                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                            <p className="invalid-data-text ms-1">{addressErrorTextMessage}</p> 
                                    </div>
                                    : null
                                }
                        </div> 
                        <div className="form-group shipping-container">
                            <label className="form-label fw-bold">City</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={cityInputValue}
                                    onChange={cityInputChange}
                                    />
                                </div>
                                {cityError ?
                                    <div className="d-flex mt-1">
                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                            <p className="invalid-data-text ms-1">{cityErrorTextMessage}</p> 
                                    </div>
                                    : null
                                }
                        </div> 
                        <div className="form-group shipping-container">
                            <label className="form-label fw-bold">Zip Code</label>
                                <div className="delivery-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control delivery-inputs"
                                    value={zipCodeInputValue}
                                    onChange={zipCodeInputChange}
                                    />
                                </div>
                                {zipCodeError ?
                                    <div className="d-flex mt-1">
                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                            <p className="invalid-data-text ms-1">{zipCodeErrorMessage}</p> 
                                    </div>
                                    : null
                                }
                        </div> 
                    </form>
                <div className="ps-5 pe-5 d-flex justify-content-center mt-3">
                    <button 
                    className="btn w-100 fs-5 send-shipping-data-button"
                    onClick={sendPurchaseInformation}
                    >Save Delivery Address
                    </button>
                </div>
        </div>
    )
}

export default CheckoutShippingAndDelivery;
