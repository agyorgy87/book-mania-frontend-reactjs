import "../css/NotDataPhishing.css";
import "../css/ExistingEmailAddress.css";
import {useState} from "react";
import { GoAlert } from "react-icons/go";

const NotDataPhishing = (props) => { 

    const [understandCheckbox, setUnderstandCheckbox] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const changeButtonToAvailable = (e) => {
        setUnderstandCheckbox(e.target.checked);
        setButtonDisabled(!e.target.checked);
    }

    return (
        <div className="overlay">
            <form className="form not-dataphishing-container d-flex flex-column shadow-lg p-4 bg-body-tertiary rounded">
                <div className="text-center"> 
                    <GoAlert className="alert-icon fs-1"/>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-1">
                    <h4 className="alert-modal-text text-center pt-2">Dear Visitor!</h4>
                </div>
                <div className="d-flex justify-content-center mb-1">
                    <h4 className="alert-modal-text text-center pt-2">If you register, do not enter real data!
                    This page was not created for dataphishing, but only as a hobby project!
                    </h4>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="me-2">
                        <input type="checkbox" checked={understandCheckbox} onChange={changeButtonToAvailable}/>
                    </div>
                    <div>
                        <p className="understand-text">I Understand</p>
                    </div>         
                </div>
                <div className="d-flex justify-content-center">
                    <button className="close-button btn outline-none fs-5" onClick={props.close} disabled={buttonDisabled}>Close</button>
                </div>           
            </form>
        </div>
    );
}

export default NotDataPhishing;