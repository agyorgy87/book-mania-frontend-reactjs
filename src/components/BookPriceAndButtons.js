import "../css/BookPriceAndButtons.css";
import { useState, useEffect } from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import LoginWarning from "../modal/LoginWarning.js";

const BookPriceAndButtons = (props) => {

    let bookDetails = props.bookData;

    let params = useParams(); 

    const userData = useContext(UserContext);
    const cartData = useContext(CartContext);

    const [heartIconFull, setHeartIconFull] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const modalMessage = "If you want to add this book to your wishlist, please log in."
    
    useEffect(() => {
        if(!userData.value.jwt){
            setHeartIconFull(false);
        }
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

        let currentBookId = bookDetails.id;

        let cartDataIdValues = [];

        let cartDataValues = cartData.value;

        for(let i = 0; i < cartDataValues.length; i++) {
            let currentObject = cartDataValues[i];

            if('id' in currentObject) {
                cartDataIdValues.push(currentObject.id);
            }
        }

        let idSearchResultInTheArray = cartDataIdValues.includes(currentBookId);
        
        if(idSearchResultInTheArray) {
            console.log("this book is already exist in the cart.")
        }else{
            const bookDetailsCopy = {...bookDetails}
            bookDetailsCopy.quantity = 1
            const cartDataCopy = [...cartData.value, bookDetailsCopy]
            cartData.setValue(cartDataCopy);
            localStorage.setItem("cart", JSON.stringify(cartDataCopy)); 
        }
    }


    const closeModal = () => {
        setOpenModal(false);
    }


    return (
        <div className="selected-book-price-container"> 
            <div> 
                {openModal && <LoginWarning close={closeModal} message={modalMessage}/>}  
            </div>
            <div className="d-flex flex-column">
                <div>
                    <p className="book-price-number">{bookDetails.price}$</p>
                </div>
                <div className="align-items-center">
                <div className="mb-3">
                    <button
                    type="button" 
                    className="selected-book-add-to-cart-button btn fs-5 border-0 fw-bold" 
                    onClick={SelectedBookAddToCart}>                                                           
                        Add To Cart
                            <CgShoppingCart className="fs-4 ms-2 selected-book-cart-icon"/>
                    </button>
                </div>
                <div> 
                    { heartIconFull ?
                    <button 
                    className="selected-book-add-to-wishlist-button btn fw-bold" 
                    onClick={addToWishList}>
                        Remove from Wishlist
                            <AiFillHeart 
                            className="fs-4 ms-2 selected-book-full-heart-icon"/>
                    </button>
                    :
                    <button 
                    className="selected-book-add-to-wishlist-button btn fw-bold"
                    onClick={addToWishList}>
                        Add To Wishlist
                            <AiOutlineHeart 
                            className="fs-4 ms-2 selected-book-not-full-heart-icon"/>
                    </button>
                    }                           
                </div> 
                </div>
            </div>                   
        </div> 
    )
}

export default BookPriceAndButtons;