import '../css/Contact.css';
import NavigationBar from '../components/NavigationBar.js';
import MessageForm from "../components/MessageForm.js";

const Contact = () => {

    return(
        <div>
            <div>
                <NavigationBar/> 
            </div>
                <div className="contact-area">
                    <div className="container">
                        <div className="text-center mt-5 mb-3"> 
                            <p className="send-us-message-text">SEND US MESSAGE</p>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-5 d-flex justify-content-center">
                                <MessageForm/>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                                <div className="map-area">
                                    <iframe title="address-point" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.8402062041205!2d19.07995727675107!3d47.51250309447013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc7ed6d66397%3A0xc13fd2d58ab64c29!2sBudapest%2C%20V%C3%A1rosliget%2C%201146!5e0!3m2!1sen!2shu!4v1692280477141!5m2!1sen!2shu"
                                    allowFullScreen="" loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Contact;
