import "../css/ChangeShippingDetails.css"; 
import { useEffect, useState } from 'react';
import { AiOutlineExclamationCircle } from "react-icons/ai"; 
import { IoMdClose } from "react-icons/io";

const ChangeShippingDetails = ({shippingAddress, setShippingAddress, close}) => {

    const [firstNameInputValue, setFirstNameInputValue] = useState(shippingAddress.firstName);
    const [lastNameInputValue, setLastNameInputValue] = useState(shippingAddress.lastName);
    const [addressInputValue, setAddressInputValue] = useState(shippingAddress.address);
    const [cityInputValue, setCityInputValue] = useState(shippingAddress.city);
    const [zipCodeInputValue, setZipCodeInputValue] = useState(shippingAddress.zipCode);

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

        if(zipCodeInputValue === "" || zipCodeInputValue.length < 4){
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

    const saveNewShippingAddress = () => {
        let userOrderDetails = {
            firstName: firstNameInputValue,
            lastName: lastNameInputValue,
            address: addressInputValue,
            city: cityInputValue,
            zipCode: zipCodeInputValue
        }
        setShippingAddress(userOrderDetails);
        close();
    }

    return ( 
        <div className="overlay">  
            <div className="change-shipping-address-container mx-auto d-flex flex-column shadow-lg 
                p-1 pe-1 bg-body-tertiary rounded col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="d-flex flex-row-reverse change-shipping-modal-close-button-container">
                    <button className="change-shipping-modal-close-button pt-2 pe-2" onClick={close}><IoMdClose/></button>
                </div>
                <div className="shipping-top-text d-flex justify-content-center">
                    <p>Change Shipping Address</p>
                </div>               
                    <form className="ps-3 pe-3" autoComplete="off">
                        <div className="form-group shipping-container">
                            <label className="form-label fw-bold">First Name</label>
                                <div className="shipping-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control shipping-inputs"
                                    value={firstNameInputValue}
                                    onChange={firstNameInputChange}
                                    disabled={true}
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
                                <div className="shipping-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control shipping-inputs"
                                    value={lastNameInputValue}
                                    onChange={lastNameInputChange}
                                    disabled={true}
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
                                <div className="shipping-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control shipping-inputs"
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
                                <div className="shipping-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control shipping-inputs"
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
                                <div className="shipping-inputs-height">
                                    <input
                                    type="text"
                                    className="form-control shipping-inputs"
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
                <div className="d-flex justify-content-center mt-3 ps-3 pe-3">
                    <button 
                    className="btn fs-5 save-shipping-address-button"
                    onClick={saveNewShippingAddress}
                    >Save Shipping Address
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeShippingDetails;