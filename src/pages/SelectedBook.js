import "../css/SelectedBook.css";
import { useState, useEffect, useRef  } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import facebookLogo from "../img/facebook.png";
import twitterLogo from "../img/twitter.png";
import { CgShoppingCart } from "react-icons/cg";
import { RiCouponLine } from "react-icons/ri";


const SelectedBook = () => {

    let params = useParams();

    const userData = useContext(UserContext);
    
    const couponCodeInputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");


    const [bookDetails, setBookDetails] = useState({});
    const [heartIconFull, setHeartIconFull] = useState(false);

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

    useEffect(() => {
        axios.get("http://localhost:4000/get-book-by-id/" + params.id)
            .then(response => {
                setBookDetails(response.data);
            })
    }, [])

    const addToWishList = () => {

        if(!userData.value.jwt){
            alert("login!")
        }else{ 
            if(heartIconFull) {
                let body = {userId: userData.value.id, bookId: params.id};
                axios.post("http://localhost:4000/delete-wishlist", body)
                    .then(response => {
                        if(response.data.success === true) {
                        console.log(response.data)
                        setHeartIconFull(false);
                        }
                    })
                
            }else{
                let body = {userId: userData.value.id, bookId: params.id};
                axios.post("http://localhost:4000/add-wishlist", body)
                    .then(response => {
                        if(response.data.success === true) {
                        console.log(response.data)
                        setHeartIconFull(true);
                        }
                    })
            } 
        }           
    }

    const couponCodeClick = () => {
        setInputValue(couponCodeInputRef.current.value);

    }

    console.log(inputValue);

    return (
        <div className="selected-book-page">
            <div>
                <NavigationBar/>
            </div> 
            {/*style={{ background: `url("http://localhost:4000/books_img/${bookDetails.img_directory}/${bookDetails.image_big}")` }}*/}
            <div className="container d-flex flex-column">
                <div className="d-flex justify-content-between mt-4 mb-5">
                    <div className="d-flex">
                        <div className="me-4">
                            <img 
                            src={"http://localhost:4000/books_img/" + bookDetails.img_directory + "/" + bookDetails.image_big}
                            className="img-fluid shadow"                                             
                            alt="book"
                            />
                        </div>
                        <div>
                            <div className="selected-book-title mb-2">
                                {bookDetails.title}
                            </div>
                            <div className="selected-book-author-name mb-4">
                                by {bookDetails.author_name}
                            </div>
                            <div>
                                <div>
                                <p className="share-text pe-2">Share:</p>
                                <img 
                                    src={twitterLogo} 
                                    className="social-icons pe-1" 
                                    alt="Share on Twitter" 
                                    onMouseEnter={(e) => onHoverTwitter(e)} 
                                    onMouseLeave={(e) => onHoverTwitterOver(e)}
                                />
                                <img 
                                    src={facebookLogo} 
                                    className="social-icons" 
                                    alt="Share on Facebook" 
                                    onMouseEnter={(e) => onHoverFacebook(e)} 
                                    onMouseLeave={(e) => onHoverFacebookOver(e)}
                                />
                                </div>
                                <div className="social-hover-text ps-4 pt-1">
                                    {twitterHover && <p>{twitterText}</p>}
                                    {facebookHover && <p>{facebookText}</p>}
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div>
                        <div className="payment-container" style={{width: "20rem"}}> 
                            <div className="d-flex flex-column">
                                <div>
                                    <p className="mb-5 display-6">{bookDetails.price} $</p>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="coupon-code">Coupon Code:</label>
                                    <input 
                                    ref={couponCodeInputRef}
                                    type="text" 
                                    className="form-control coupon-code-input" 
                                    id="coupon-code" 
                                    />
                                </div>
                                <div className="d-flex mb-5">
                                    <button type="button" className="selected-book-add-coupon-code-button" onClick={couponCodeClick}>                                                           
                                        Add Coupon Code
                                            <RiCouponLine className="fs-5 ms-2 coupon-icon"/>
                                    </button>
                                </div>
                                <div className="d-flex mb-5">
                                    <button type="button" className="selected-book-add-to-cart-button">                                                           
                                        Add To Cart
                                            <CgShoppingCart className="fs-5 ms-2 cart-icon"/>
                                    </button>
                                </div>
                                <div>
                                    { heartIconFull ?
                                    <button className="selected-book-add-to-wishlist-button" onClick={addToWishList}><AiFillHeart className="fs-5 ms-2 heart-icon"/>This book is in your wishlist</button>
                                    :
                                    <button className="selected-book-add-to-wishlist-button" onClick={addToWishList}><AiOutlineHeart className="fs-5 ms-2 heart-icon"/> Add To Wishlist</button>
                                    }                           
                                </div>
                            </div>
                        </div>                       
                    </div>               
                </div>   
                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item overview-tab">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Overview</button>
                        </li>
                        <li className="nav-item about-the-author-tab">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">About the Author</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">ez</div>
                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">az</div>
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default SelectedBook;

{/*
            {bookDetails.publisher_name}<br></br>
            {bookDetails.release_date}<br></br>
            {bookDetails.book_description}
*/}

