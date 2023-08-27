import '../css/Contact.css';
import NavigationBar from '../components/NavigationBar.js';
import MessageForm from "../components/MessageForm.js";
import MapLocation from "../components/MapLocation.js";

const Contact = () => {

    return( 
        <div>
            <div>
                <NavigationBar/> 
            </div>
                <div className="contact-area">
                    <div className="container">
                        <div className="text-center mt-5 mb-3"> 
                            <p className="send-us-message-text">SEND US A MESSAGE</p>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center message-form-container">
                                <MessageForm/>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                                <MapLocation/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Contact;
