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
                                        <div class="form-group">
                                            <input 
                                            className={`form-control ${errors.firstName ? 'danger' : ''}`}
                                            name="firstName"
                                            id="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            ref={nameInput}
                                            placeholder="First Name"
                                            />
                                        </div>
                                        {errors.firstName ? <p className="invalid-data-text ms-1">{errors.lastName}</p> : null}
                                        <div class="form-group">
                                            <input
                                            className={`form-control ${errors.lastName ? 'invalid' : ''}`} 
                                            name="lastName"
                                            id="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                            />
                                        </div>
                                        {errors.lastName ? <p className="invalid-data-text ms-1">{errors.lastName}</p> : null}
                                            {/*
                                        <div className="form-group">
                                        <select 
                                        className={`form-select ${inputValidate.gender ? 'invalid' : ''}`}
                                        placeholder="Gender" 
                                        name="gender" 
                                        id="gender"
                                        value={values.gender}
                                        onChange={handleInputChange}                                   
                                        >
                                        <option value="None">select</option>
                                        <option value="woman">woman</option>
                                        <option value="man">man</option>
                                    </select>
                                    </div>
                                    {inputValidate.gender ? <p className="invalid-data-text">{inputValidate.gender}</p> : null}
                                    */}
                                    </div>
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
                                    <div class="form-group">
                                        <input 
                                        className={`form-control ${errors.address ? 'invalid' : ''}`} 
                                        name="address"
                                        id="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        />
                                    </div>
                                    {errors.address ? <p className="invalid-data-text ms-1">{errors.address}</p> : null}
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                        <input 
                                        className={`form-control ${errors.city ? 'invalid' : ''}`} 
                                        name="city"
                                        id="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        />
                                        </div>
                                        {errors.city ? <p className="invalid-data-text ms-1">{errors.city}</p> : null}
                                        <div class="form-group col-md-6">
                                        <input 
                                        className={`form-control ${errors.zip ? 'invalid' : ''}`} 
                                        name="zip"
                                        id="zip"
                                        value={values.zip}
                                        onChange={handleChange}
                                        placeholder="Zip Code"
                                        />
                                        </div>
                                        {errors.zip ? <p className="invalid-data-text ms-1">{errors.zip}</p> : null}
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input 
                                        className={`form-control ${errors.email ? 'invalid' : ''}`} 
                                        name="email" 
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Email" 
                                        />
                                        </div>
                                        {errors.email ? <p className="invalid-data-text ms-1">{errors.email}</p> : null}
                                        <div class="form-group col-md-6">
                                        <label for="password">Password</label>
                                        <input
                                        className={`form-control ${errors.password ? 'invalid' : ''}`} 
                                        placeholder="Password" 
                                        name="password" 
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        />
                                        </div>
                                        {errors.password ? <p className="invalid-data-text ms-1">{errors.password}</p> : null}
                                        <div class="form-group col-md-6">
                                        <label for="inputPassword4">Password again</label>
                                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password again"/>
                                        </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                        <label class="form-check-label" for="gridCheck">
                                            Check me out
                                        </label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Registration</button>
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