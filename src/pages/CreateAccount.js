import '../css/CreateAccount.css';
import React, {useState, useEffect, useRef} from 'react';
import NavigationBar from '../components/NavigationBar.js';
//import { useNavigate } from "react-router-dom";
import Validate from '../ValidateInfo';

const CreateAccount = () => {

    //let navigate = useNavigate();

    const initialFieldValues = {
        firstName: '',
        lastName: '',
        gender: 'None',
        address: '',
        city: '',
        zip: '',
        email: '',
        password: '',
        passwordAgain: ''
    }

    let nameInput = useRef(null);

    let [values,setValues] = useState(initialFieldValues);

    let [inputValidate, setInputValidate] = useState({});

    //const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        nameInput.current.focus();
    }, [])


    const handleInputChange = (e) => {
    let {name, value} = e.target
    setValues({
        ...values,
        [name]:value
    })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        let ValidateErrors = Validate(values);
        if(ValidateErrors.error === true) {
            setInputValidate(ValidateErrors)
        } else if(ValidateErrors.error === false){
            //createData()
    }
    }

    return (
        <div>
            <div>
            <NavigationBar/>
            </div>
            <div clasName="ms-5">
                <form autoComplete="off" onSubmit={handleFormSubmit}>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">first name</label>
                            <input 
                            className={`form-control ${inputValidate.firstName ? 'invalid' : ''}`}
                            name="firstName"
                            id="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                            ref={nameInput}
                            />
                        </div>
                        {inputValidate.firstName ? <p className="invalid-data-text">{inputValidate.lastName}</p> : null}
                    <div class="form-group">
                        <label for="lastName">last name</label>
                            <input
                            className={`form-control ${inputValidate.lastName ? 'invalid' : ''}`} 
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
                            />
                    </div>
                    {inputValidate.lastName ? <p className="invalid-data-text">{inputValidate.lastName}</p> : null}
                    <div className="form-group">
                    <label for="genre-select">Gender</label>
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
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input 
                        className={`form-control ${inputValidate.address ? 'invalid' : ''}`} 
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleInputChange}
                        />
                    </div>
                    {inputValidate.address ? <p className="invalid-data-text">{inputValidate.address}</p> : null}
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="city">City</label>
                        <input 
                        className={`form-control ${inputValidate.city ? 'invalid' : ''}`} 
                        name="city"
                        id="city"
                        value={values.city}
                        onChange={handleInputChange}
                        />
                        </div>
                        {inputValidate.city ? <p className="invalid-data-text">{inputValidate.city}</p> : null}
                        <div class="form-group col-md-2">
                        <label for="zip">Zip</label>
                        <input 
                         className={`form-control ${inputValidate.zip ? 'invalid' : ''}`} 
                         name="zip"
                         id="zip"
                         value={values.zip}
                         onChange={handleInputChange}
                        />
                        </div>
                        {inputValidate.zip ? <p className="invalid-data-text">{inputValidate.zip}</p> : null}
                    </div>
                    <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input 
                        className={`form-control ${inputValidate.email ? 'invalid' : ''}`} 
                        placeholder="Email" 
                        name="email" 
                        id="email"
                        value={values.email}
                        onChange={handleInputChange}
                        />
                        </div>
                        {inputValidate.email ? <p className="invalid-data-text">{inputValidate.email}</p> : null}
                        <div class="form-group col-md-6">
                        <label for="password">Password</label>
                        <input
                        className={`form-control ${inputValidate.password ? 'invalid' : ''}`} 
                        placeholder="Password" 
                        name="password" 
                        id="password"
                        value={values.password}
                        onChange={handleInputChange}
                        />
                        </div>
                        {inputValidate.password ? <p className="invalid-data-text">{inputValidate.password}</p> : null}
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
    )
}

export default CreateAccount