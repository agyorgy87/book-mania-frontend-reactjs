import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    let navigate = useNavigate();

    return (
        <div>
            <div>
            <NavigationBar/>
            </div>
            <div clasName="ms-5">
                <div>
                <form >
                    <div class="form-row">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">first name</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="first name"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">last name</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="last name"/>
                    </div>
                    <div className="form-group">
                    <label for="genre-select">genre</label>
                    <select class="form-select" aria-label="Default select example" id="genre-select">
                        <option selected>select</option>
                        <option value="1">woman</option>
                        <option value="2">man</option>

                    </select>
                    </div>
                    </div>
                    <div class="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip"/>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                        </div>
                        <div class="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                        </div>
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
                    <button type="submit" class="btn btn-primary">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount