import React, { useState } from 'react';
import "../css/BookPictureAndData.css";
import facebookLogo from "../icons/facebook.png";
import twitterLogo from "../icons/twitter.png";


const BookPictureAndData = (props) => {

    const bookDetails = props.bookData;

    const [twitterHover, setTwitterHover] = useState(false);
    const [facebookHover, setFacebookHover] = useState(false);

    const twitterText = "Share on Twitter"
    const facebookText = "Share on Facebook"

    const onHoverTwitter = (e) => {
        e.preventDefault();
        setTwitterHover(true); 
      };

      const onHoverTwitterOver = (e) => {
        e.preventDefault();
        setTwitterHover(false);
      };

    const onHoverFacebook = (e) => {
        e.preventDefault();
        setFacebookHover(true); 
      };

      const onHoverFacebookOver = (e) => {
        e.preventDefault();
        setFacebookHover(false);
      };


    return (
        <div className="d-flex book-picture-and-title-container"> 
            <div className="d-flex justify-content-center">
                <div className="book-picture-container d-flex justify-content-center align-items-center me-3">
                    <img 
                    src={"http://localhost:4000/books_img/" + bookDetails.img_directory + "/" + bookDetails.image_big}
                    className="shadow book-picture"                                             
                    alt="book"
                    /> 
                </div>
            </div>
            <div className="book-title-author-social-container">   
                <div className="mb-2"> 
                    <p className="book-title">{bookDetails.title}</p>
                </div>
                <div className="mb-4 book-author-name-container">
                    <p className="me-1">By</p><p className="book-author-name">{bookDetails.author_name}</p>
                </div>
                <div>
                    <p className="share-text">Share:</p>
                        <img 
                        src={facebookLogo} 
                        className="social-icons pe-2" 
                        alt="Share on Facebook" 
                        onMouseEnter={(e) => onHoverFacebook(e)} 
                        onMouseLeave={(e) => onHoverFacebookOver(e)}
                        />
                        <img 
                        src={twitterLogo} 
                        className="social-icons" 
                        alt="Share on Twitter" 
                        onMouseEnter={(e) => onHoverTwitter(e)} 
                        onMouseLeave={(e) => onHoverTwitterOver(e)}
                        />                      
                    <div className="social-hover-text">
                        {facebookHover && <p>{facebookText}</p>}
                        {twitterHover && <p>{twitterText}</p>}
                    </div> 
                </div>                  
            </div>                 
        </div>
    )
}

export default BookPictureAndData;