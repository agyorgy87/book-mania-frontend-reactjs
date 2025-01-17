import '../css/CreateAccount.css';
import { useState, useEffect, useRef} from 'react';
import NavigationBar from '../components/NavigationBar.js';
import validate from '../ValidateInfo';
import useForm from '../useForm';
import axios from "axios";
import { Link } from 'react-router-dom'; 
import { AiOutlineExclamationCircle } from "react-icons/ai";
import SuccessfulRegistrationModal from "../modal/SuccessfulRegistrationModal.js";
import ExistingEmailAddress from '../popup/ExistingEmailAddress.js';
import NotDataPhishing from '../popup/NotDataPhishing.js'; 

const CreateAccount = () => {

    const {handleChange, values, handleSubmit, errors} = useForm(validate);

    const [openSuccessfulRegistrationModal, setOpenSuccessfulRegistrationModal] = useState(false);
    const [openExistingEmailAddress, setOpenExistingEmailAddress] = useState(false);
    const [openNotDataPhishing, setOpenNotDataPhishing] = useState(false);

    let nameInput = useRef(null);

    useEffect(() => {
        nameInput.current.focus();
    }, [])

    useEffect(() => {
        setOpenNotDataPhishing(true);
    }, [])
   
    /*     
    //development mode

    const firstRun = useRef(0);

    useEffect(() => {
        console.log(process.env.NODE_ENV);
        if((process.env.NODE_ENV === "development" && firstRun.current >= 2) || (process.env.NODE_ENV === "production" && firstRun.current <= 1)){
            if(errors.error !== true){
                    let user = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: (values.gender === "female" ? 0 : 1),
                    address: values.address,
                    city: values.city,
                    zipCode: values.zip,
                    email: values.email,
                    pass: values.password
                }
                axios.post("http://localhost:4000/register", user)
                console.log(user);
                setOpenSuccessfulRegistrationModal(true);      
            } 
        }else{
            firstRun.current += 1;
        }
    },[errors])
    console.log(values.dataProtection);
    */

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL
    
    const sendUserDatas = () => {

        if(values.password !== values.passwordAgain) {
            return;
        }

        axios.get(`${envAndLocal}/get-user-email/${values.email}`)
        .then(response => {
            if(response.data.success === true) {
                setOpenExistingEmailAddress(true);
            }else if(response.data.success === false && errors.error !== true){
                let user = {
                firstName: values.firstName,
                lastName: values.lastName,
                gender: (values.gender === "female" ? 0 : 1),
                address: values.address,
                city: values.city,
                zipCode: values.zip,
                email: values.email,
                pass: values.password
            }
            axios.post(envAndLocal + "/register", user)
            setOpenSuccessfulRegistrationModal(true);
            }
        }) 
        .catch(error => {
            console.error("Error during registration process:", error); 
        });        
    } 
    
    const closePopupExistingEmailAddress = () => { 
        setOpenExistingEmailAddress(false);
    }

    const closePopupNotDataPhishing = () => {
        setOpenNotDataPhishing(false);
    }
        
    return ( 
        <div className="sign-up-page"> 
            <div>
                <NavigationBar/>
            </div>
                <div>
                    {openSuccessfulRegistrationModal && <SuccessfulRegistrationModal/>}
                </div>
                <div>
                    {openExistingEmailAddress && <ExistingEmailAddress close={closePopupExistingEmailAddress}/>}  
                </div>
                <div>
                    {openNotDataPhishing && <NotDataPhishing close={closePopupNotDataPhishing}/>}  
                </div>
                    <div className="col-12 col-sm-8 col-md-4 m-auto sign-up-container pt-3 mb-5 mt-2">                           
                        <div className="text-center">
                            <h1 className="sign-up-title fw-bold">Create an account</h1>
                        </div>                                                               
                                <form className="form-row ps-5 pe-5" autoComplete="off" onSubmit={handleSubmit}>
                                            <div className="form-group label-input-container registration-containers">      
                                                <label htmlFor="firstName" className="form-label labels fw-bold">First Name</label>
                                                    <div className="registration-inputs-height">                                               
                                                        <input 
                                                        type="text"
                                                        className={`form-control inputs ${errors.firstName ? 'invalid' : ''}`}
                                                        name="firstName"
                                                        id="firstName"
                                                        value={values.firstName}
                                                        onChange={handleChange}
                                                        ref={nameInput}
                                                        />
                                                    </div>
                                                    {errors.firstName ?
                                                        <div className="d-flex mt-1">
                                                            <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                            <p className="invalid-data-text ms-1">{errors.firstName}</p> 
                                                        </div>
                                                    : null
                                                    }
                                            </div>
                                            <div className="form-group label-input-container registration-containers">
                                                <label htmlFor="lastName" className="form-label labels fw-bold">Last Name</label>
                                                    <div className="registration-inputs-height">
                                                        <input
                                                        type="text"
                                                        className={`form-control inputs ${errors.lastName ? 'invalid' : ''}`} 
                                                        name="lastName"
                                                        id="lastName"
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        />
                                                    </div>
                                            {errors.lastName ?
                                                <div className="d-flex mt-1">
                                                    <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                    <p className="invalid-data-text ms-1">{errors.lastName}</p> 
                                                </div>
                                            : null
                                            }
                                            </div>
                                        <div className="registration-containers-check">                                                                           
                                            <div className="form-check form-check-inline ">
                                                <label className="form-check-label labels fw-bold" htmlFor="male">Male</label>
                                                    <input 
                                                    className="form-check-input custom-radio" 
                                                    id="gender" 
                                                    name="gender" 
                                                    type="radio" 
                                                    value="male"
                                                    checked={values.gender === "male" ? true : false}
                                                    onChange={handleChange}
                                                    />                                           
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label labels fw-bold" htmlFor="female">Female</label>
                                                    <input 
                                                    className="form-check-input custom-radio" 
                                                    id="gender" 
                                                    name="gender" 
                                                    type="radio" 
                                                    value="female"
                                                    checked={values.gender === "female" ? true : false}
                                                    onChange={handleChange}
                                                    />
                                            </div>
                                            {errors.gender ?
                                                <div className="d-flex">
                                                    <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                    <p className="invalid-data-text ms-1">{errors.gender}</p> 
                                                </div>
                                            : null}
                                        </div>                                           
                                        <div className="form-group label-input-container registration-containers">
                                            <label htmlFor="address" className="form-label labels fw-bold">Address</label>
                                                <div className="registration-inputs-height">
                                                    <input 
                                                    type="text"
                                                    className={`form-control inputs ${errors.address ? 'invalid' : ''}`} 
                                                    name="address"
                                                    id="address"
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.address ?
                                                    <div className="d-flex mt-1">
                                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                        <p className="invalid-data-text ms-1">{errors.address}</p> 
                                                    </div>
                                                : null
                                                }
                                        </div>                                                                   
                                        <div className="form-group label-input-container registration-containers">
                                            <label htmlFor="city" className="form-label labels fw-bold">City</label>
                                                <div className="registration-inputs-height">
                                                    <input 
                                                    type="text"
                                                    className={`form-control inputs ${errors.city ? 'invalid' : ''}`} 
                                                    name="city"
                                                    id="city"
                                                    value={values.city}
                                                    onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.city ?
                                                <div className="d-flex mt-1">
                                                    <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                    <p className="invalid-data-text ms-1">{errors.city}</p> 
                                                </div>
                                                : null
                                                }
                                        </div>                                           
                                        <div className="form-group label-input-container registration-containers">
                                            <label htmlFor="zip" className="form-label labels fw-bold">Zip Code</label>
                                                <div className="registration-inputs-height">
                                                    <input 
                                                    type="text"
                                                    className={`form-control inputs ${errors.zip ? 'invalid' : ''}`}  
                                                    name="zip"
                                                    id="zip"
                                                    value={values.zip}
                                                    onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.city ?
                                                    <div className="d-flex mt-1">
                                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                        <p className="invalid-data-text ms-1">{errors.city}</p> 
                                                    </div>
                                                : null
                                                }
                                        </div>                                                                         
                                        <div className="form-group label-input-container registration-containers">
                                            <label htmlFor="email" className="form-label labels fw-bold">Email</label>
                                                <div className="registration-inputs-height">
                                                    <input 
                                                    type="email"
                                                    className={`form-control inputs ${errors.email ? 'invalid' : ''}`} 
                                                    name="email" 
                                                    id="email"
                                                    value={values.email}
                                                    onChange={handleChange} 
                                                    />
                                                </div>
                                                {errors.email ?
                                                    <div className="d-flex mt-1">
                                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                        <p className="invalid-data-text ms-1">{errors.email}</p> 
                                                    </div>
                                                : null
                                                }
                                        </div>                                        
                                        <div className="form-group label-input-container registration-containers mb-5"> 
                                            <label htmlFor="password" className="form-label labels fw-bold">Password</label>  
                                                <div className="registration-inputs-height">                                  
                                                    <input
                                                    className={`form-control inputs ${errors.password ? 'invalid' : ''}`} 
                                                    name="password" 
                                                    id="password"
                                                    type="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    />
                                                    {errors.password ?
                                                        <div className="d-flex mt-1">
                                                            <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                                <p className="invalid-data-text ms-1">{errors.password}</p> 
                                                        </div>
                                                    : <p className="password-help">Your password must be least 8 characters and minimum 1 number.</p>
                                                    }
                                                </div>                                                                                  
                                        </div>                                                                                  
                                        <div className="form-group label-input-container registration-container">
                                            <label htmlFor="password" className="form-label labels fw-bold">Password Again</label>
                                                <div className="registration-inputs-height">
                                                    <input 
                                                    className={`form-control inputs ${errors.passwordAgain ? 'invalid' : ''}`} 
                                                    name="passwordAgain"
                                                    id="passwordAgain"
                                                    type="password"  
                                                    value={values.passwordAgain}
                                                    onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.passwordAgain ?
                                                    <div className="d-flex mt-1">
                                                        <AiOutlineExclamationCircle className="sign-up-alert-mark fs-5 me-1"/>
                                                        <p className="invalid-data-text ms-1">{errors.passwordAgain}</p> 
                                                    </div>
                                                : null}
                                        </div>
                                        {/*
                                        <div className="form-group d-flex justify-content-center">
                                            <div className="form-check">
                                                        <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="dataProtection"
                                                        id="dataProtection"
                                                        value={values.dataProtection === "true" ? "false" : "true"}
                                                        onChange={handleChange} />
                                                    <label className="form-check-label" for="gridCheck">
                                                        I accept the data protection regulations
                                                    </label>
                                            </div>
                                        </div>
                                        */}
                                        <div className="d-flex justify-content-center mt-5">
                                            <button type="submit" className="btn w-100 fs-5 sign-up-button" onClick={sendUserDatas}>Sign up</button>
                                        </div>                                           
                                        <div className="d-flex justify-content-center mt-3">
                                            <p className="text-center">By signing up, you agree to our <Link>Terms of Service</Link> and<Link> Privacy Policy</Link></p>
                                        </div>
                                </form> 
                                <hr className="custom-hr mt-2 mb-3"/>
                                <div className="d-flex justify-content-center">
                                    <p className="mt-2 mb-4 me-2 fs-5 fw-lighter sign-up-ask">Have an account?</p> 
                                    <Link className="mt-2 fs-5 fw-bold sign-up-link" to={"/login"}>Login</Link>
                                </div>                           
                        </div>         
        </div>
    )
}

export default CreateAccount;