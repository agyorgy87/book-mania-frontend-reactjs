import React from "react"; 
import NavigationBar from '../components/NavigationBar.js';

const Contact = () => {
    return(
        <div>
            <div>
                <NavigationBar/>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <div>
                    <div className="d-flex justify-content-center">
                        <h1>Contact</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="me-5">
                        <form>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Email address</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Name</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Message</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div class="input-group mb-3">
                                    <select class="custom-select" id="inputGroupSelect02">
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <div class="input-group-append">
                                        <label class="input-group-text" for="inputGroupSelect02">Question</label>
                                    </div>
                                </div>
                        </form>
                        </div>
                        <div>
                            googlemap
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
