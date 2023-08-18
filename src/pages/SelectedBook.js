import "../css/SelectedBook.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import { CartContext } from "../context/CartContext";
import facebookLogo from "../icons/facebook.png";
import twitterLogo from "../icons/twitter.png";
import { CgShoppingCart } from "react-icons/cg";
import WishListModal from "../modal/WishListModal.js";

const SelectedBook = () => {

    let params = useParams();

    const userData = useContext(UserContext);
    const cartData = useContext(CartContext);

    const [bookDetails, setBookDetails] = useState({});
    const [heartIconFull, setHeartIconFull] = useState(false);

    const [twitterHover, setTwitterHover] = useState(false);
    const [facebookHover, setFacebookHover] = useState(false);

    const [openModal, setOpenModal] = useState(false);

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
        if(userData.value.jwt){       
            axios.get("http://localhost:4000/display-wishlist/" + userData.value.id + "/" + params.id)
            .then(response => {
                if(response.data.length > 0) {
                    setHeartIconFull(true);
                }
            })
        }
    }, [])


    const addToWishList = () => {
        if(!userData.value.jwt){
            setOpenModal(true);
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

    const SelectedBookAddToCart = () => {
        const bookDetailsCopy = {...bookDetails}
        bookDetailsCopy.quantity = 1
        const cartDataCopy = [...cartData.value, bookDetailsCopy]
        cartData.setValue(cartDataCopy);
        localStorage.setItem("cart", JSON.stringify(cartDataCopy));
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    console.log(bookDetails);
    
    return (
        <div className="selected-book-page">
            <div>
                <NavigationBar/>
            </div> 
            <div>
                {openModal && <WishListModal close={closeModal}/>}  
            </div>
            {/*style={{ background: `url("http://localhost:4000/books_img/${bookDetails.img_directory}/${bookDetails.image_big}")` }}*/}
            <div className="container d-flex flex-column">
                <div className="d-flex justify-content-between book-buttons-container mt-4 mb-5">
                    
                    <div className="d-flex col-lg-9 col-md-9 col-sm-9 col-12 book-container">
                        <div className="me-2">
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
                                <div className="pt-2">
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
                    
                    
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12 selected-book-price-container">
                            <div className="d-flex flex-column">
                                <div>
                                    <p className="mb-5 display-6">{bookDetails.price} $</p>
                                </div>
                                <div className="align-items-center">
                                <div className="mb-3">
                                    <button type="button" className="selected-book-add-to-cart-button" onClick={SelectedBookAddToCart}>                                                           
                                        Add To Cart
                                            <CgShoppingCart className="fs-5 ms-2 cart-icon"/>
                                    </button>
                                </div>
                                <div>
                                    { heartIconFull ?
                                    <button className="selected-book-add-to-wishlist-button" onClick={addToWishList}>This book is in your wishlist<AiFillHeart className="fs-5 ms-2 heart-icon"/></button>
                                    :
                                    <button className="selected-book-add-to-wishlist-button" onClick={addToWishList}>Add To Wishlist<AiOutlineHeart className="fs-5 ms-2 heart-icon"/></button>
                                    }                           
                                </div> 
                                </div>
                            </div>                   
                    </div> 
                </div>   
                <div>
                <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active tabs-style" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Overview</button>
                    <button className="nav-link tabs-style" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Book Details</button>
                </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="overview mt-3">
                            <p className="overview-title">Overview</p>   
                            <p className="overview-value">{bookDetails.book_description}</p>              
                        </div> 
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="content d-flex mt-3">
                            <div>
                                <p className="content-title">Release date</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.release_date}</p>
                            </div>                 
                        </div>
                            <hr/>
                        <div className="content d-flex">
                            <div>
                                <p className="content-title">Number of page</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.number_of_page}</p>
                            </div>                 
                        </div>
                            <hr/>
                        <div className="content d-flex">
                            <div>
                                <p className="content-title">Genre</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.genre_type}</p>
                            </div>                 
                        </div>
                    </div>
                </div>
                </div>
            </div>           
        </div>
    )
}

export default SelectedBook;

