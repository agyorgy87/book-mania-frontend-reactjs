import '../css/CreateAccount.css';
import { useEffect, useRef} from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from "react-router-dom";
import validate from '../ValidateInfo';
import useForm from '../useForm';
import axios from "axios";
import { Link } from 'react-router-dom';

const CreateAccount = () => {
    const {handleChange, values, handleSubmit, errors} = useForm(validate);

    let navigate = useNavigate();

    let nameInput = useRef(null);

    const firstRun = useRef(0);

    useEffect(() => {
        nameInput.current.focus();
    }, [])

                
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
                navigate("/successfulregistration")
            } 
        }else{
            firstRun.current += 1;
        }
    },[errors])

    console.log(values.dataProtection);

    return (
        <div>
            <div>
            <NavigationBar/>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 m-auto">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12"> 
                                            <div className="section-title">
                                                <h3>Create Account</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <div class="form-row">
                                        <div className="mb-4">
                                            <div class="form-group">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input 
                                                type="text"
                                                className={`inputs ${errors.firstName ? 'border-danger' : ''}`}
                                                name="firstName"
                                                id="firstName"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                ref={nameInput}
                                                />
                                            </div>
                                            {errors.firstName ? <p className="invalid-data-text ms-1">{errors.lastName}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <input
                                                type="text"
                                                className={`inputs ${errors.lastName ? 'danger' : ''}`} 
                                                name="lastName"
                                                id="lastName"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                />
                                            </div>
                                            {errors.lastName ? <p className="invalid-data-text ms-1">{errors.lastName}</p> : null}   
                                        </div>
                                        <div className="mb-4">                                                                           
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label" htmlFor="male">Male</label>
                                                    <input 
                                                    className="form-check-input" 
                                                    id="gender" 
                                                    name="gender" 
                                                    type="radio" 
                                                    value="male"
                                                    checked={values.gender === "male" ? true : false}
                                                    onChange={handleChange}
                                                    />                                           
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label" for="female">Female</label>
                                                    <input 
                                                    className="form-check-input" 
                                                    id="gender" 
                                                    name="gender" 
                                                    type="radio" 
                                                    value="female"
                                                    checked={values.gender === "female" ? true : false}
                                                    onChange={handleChange}
                                                    />
                                            </div>
                                            {errors.gender ? <p className="invalid-data-text ms-1">{errors.gender}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div class="form-group">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <input 
                                                type="text"
                                                className={`inputs ${errors.address ? 'danger' : ''}`} 
                                                name="address"
                                                id="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                />
                                            </div>
                                            {errors.address ? <p className="invalid-data-text ms-1">{errors.address}</p> : null} 
                                        </div> 
                                        <div className="mb-4">                         
                                            <div className="form-group">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input 
                                                type="text"
                                                className={`inputs ${errors.city ? 'danger' : ''}`} 
                                                name="city"
                                                id="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                />
                                            </div>
                                            {errors.city ? <p className="invalid-data-text ms-1">{errors.city}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="zip" className="form-label">Zip Code</label>
                                                <input 
                                                type="text"
                                                className={`inputs ${errors.zip ? 'danger' : ''}`} 
                                                name="zip"
                                                id="zip"
                                                value={values.zip}
                                                onChange={handleChange}
                                            />
                                            </div>
                                            {errors.zip ? <p className="invalid-data-text ms-1">{errors.zip}</p> : null}    
                                        </div>  
                                        <div className="mb-4">                            
                                            <div className="form-group">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input 
                                                type="email"
                                                className={`inputs ${errors.email ? 'danger' : ''}`} 
                                                name="email" 
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange} 
                                                />
                                            </div>
                                            {errors.email ? <p className="invalid-data-text ms-1">{errors.email}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group"> 
                                                <label htmlFor="password" className="form-label">Password</label>                                     
                                                <input
                                                className={`inputs ${errors.password ? 'danger' : ''}`} 
                                                name="password" 
                                                id="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}

                                                />
                                            </div>                                       
                                            <p className="password-help">Your password must be least 8 characters and minimum 1 number.</p>                                            
                                            {errors.password ? <p className="invalid-data-text ms-1">{errors.password}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="password" className="form-label">Password Again</label>
                                                <input 
                                                className={`inputs ${errors.passwordAgain ? 'danger' : ''}`} 
                                                name="passwordAgain"
                                                id="passwordAgain"
                                                type="password"  
                                                value={values.passwordAgain}
                                                onChange={handleChange}
                                                />
                                            </div>
                                            {errors.passwordAgain ? <p className="invalid-data-text ms-1">{errors.passwordAgain}</p> : null}
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
                                        <div className="d-flex justify-content-center my-3">
                                            <button type="submit" className="btn btn-primary">Create Account</button>
                                        </div>                                           
                                    </div>
                                </form>
                                <div className="d-flex justify-content-center mt-3">
                                    <p className="terms-and-policy">By signing up, you agree to our <Link>Terms of Service</Link> and<Link> Privacy Policy</Link></p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="terms-and-policy">Have an account? <Link to={"/login"}>Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount