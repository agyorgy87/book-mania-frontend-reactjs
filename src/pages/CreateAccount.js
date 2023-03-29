import '../css/CreateAccount.css';
import React, {useState, useEffect, useRef} from 'react';
import NavigationBar from '../components/NavigationBar.js';
//import { useNavigate } from "react-router-dom";
import validate from '../ValidateInfo';
import useForm from '../useForm';

const CreateAccount = () => {
    const {handleChange, values, handleSubmit, errors} = useForm(validate);

    //let navigate = useNavigate();

    let nameInput = useRef(null);

    useEffect(() => {
        nameInput.current.focus();
    }, [])

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
                                                <h3>Registration</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <div class="form-row">
                                        <div className="mb-4">
                                            <div class="form-group">
                                                <input 
                                                className={`form-control ${errors.firstName ? 'border-danger' : ''}`}
                                                name="firstName"
                                                id="firstName"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                ref={nameInput}
                                                placeholder="First Name"
                                                />
                                            </div>
                                            {errors.firstName ? <p className="invalid-data-text ms-1">{errors.lastName}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div class="form-group">
                                                <input
                                                className={`form-control ${errors.lastName ? 'danger' : ''}`} 
                                                name="lastName"
                                                id="lastName"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                placeholder="Last Name"
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
                                                <input 
                                                className={`form-control ${errors.address ? 'danger' : ''}`} 
                                                name="address"
                                                id="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                placeholder="Address"
                                                />
                                            </div>
                                            {errors.address ? <p className="invalid-data-text ms-1">{errors.address}</p> : null} 
                                        </div> 
                                        <div className="mb-4">                         
                                            <div class="form-group">
                                                <input 
                                                className={`form-control ${errors.city ? 'danger' : ''}`} 
                                                name="city"
                                                id="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                placeholder="City"
                                                />
                                            </div>
                                            {errors.city ? <p className="invalid-data-text ms-1">{errors.city}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div class="form-group">
                                                <input 
                                                className={`form-control ${errors.zip ? 'danger' : ''}`} 
                                                name="zip"
                                                id="zip"
                                                value={values.zip}
                                                onChange={handleChange}
                                                placeholder="Zip Code"
                                            />
                                            </div>
                                            {errors.zip ? <p className="invalid-data-text ms-1">{errors.zip}</p> : null}    
                                        </div>  
                                        <div className="mb-4">                            
                                            <div class="form-group">
                                                <input 
                                                className={`form-control ${errors.email ? 'danger' : ''}`} 
                                                name="email" 
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                placeholder="Email" 
                                                />
                                            </div>
                                            {errors.email ? <p className="invalid-data-text ms-1">{errors.email}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">                                      
                                                <input
                                                className={`form-control ${errors.password ? 'danger' : ''}`} 
                                                name="password" 
                                                id="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                placeholder="Password" 
                                                />
                                            </div>
                                            {errors.password ? <p className="invalid-data-text ms-1">{errors.password}</p> : null}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <input 
                                                className={`form-control ${errors.passwordAgain ? 'danger' : ''}`} 
                                                name="passwordAgain"
                                                id="passwordAgain"
                                                type="password"  
                                                value={values.passwordAgain}
                                                onChange={handleChange}
                                                placeholder="Password again"
                                                />
                                            </div>
                                            {errors.passwordAgain ? <p className="invalid-data-text ms-1">{errors.passwordAgain}</p> : null}
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                                    <label className="form-check-label" for="gridCheck">
                                                        I accept the data protection regulations
                                                    </label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center my-3">
                                            <button type="submit" className="btn btn-primary">Registration</button>
                                        </div>                                           
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount