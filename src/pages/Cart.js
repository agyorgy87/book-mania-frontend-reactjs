import '../css/Cart.css';
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { RiCouponLine } from "react-icons/ri";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";

const Cart = () => {

    /*
        const couponCodeInputRef = useRef(null);

        const couponCodeClick = () => {
        setInputValue(couponCodeInputRef.current.value);
    }
    */

    const cartData = useContext(CartContext);


    const deleteSelectedBook = (book) => {
        let searchedBookID = book.id;
        let bookDetails = cartData.value
        console.log(bookDetails);
        let cartDatas = localStorage.getItem("cart");
        let parsedCartDatas = JSON.parse(cartDatas);
        let newListWithoutSearchedBook = parsedCartDatas.filter(book => book.id !== searchedBookID);
        console.log(newListWithoutSearchedBook);
        let stringifiedCartData = JSON.stringify(newListWithoutSearchedBook);
        localStorage.setItem("cart", stringifiedCartData);
        window.location.reload();//better solution?
    }

    return (
        <div className="cart-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container">
                <h1>My Cart {/*(x book)*/}</h1>
                <div>
                    <div className="row">
                        <div className="col-8 books">
                            
                            {
                                cartData.value.map((book, index) => (
                                    <div className="selected-book-for-purchase mb-3 d-flex justify-content-between" key={"cart-data-div" + index}>
                                        <div className="cart-book-details d-flex">
                                            <div>
                                                <img 
                                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                                className="cart-book-pics mt-2 ms-4"                                             
                                                alt="book"
                                                /> 
                                            </div>
                                            <div className="mt-2 ms-4">
                                                <p>{book.title}</p>
                                                <p>{book.author_name}</p>
                                                <p>{book.publisher_name}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="price-count-details d-flex flex-column">
                                                <div>
                                                    <p>{book.price}</p>
                                                </div>                                             
                                                <div className="d-flex">
                                                    <div>
                                                        <button>-</button>
                                                    </div>
                                                    <div>
                                                        <p>{book.quantity}</p>
                                                    </div>
                                                    <div>
                                                        <button>+</button>
                                                    </div>
                                                </div>
                                                <div className="remove-book">
                                                    <button onClick={() => deleteSelectedBook(book)}>x</button>
                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-4 paying-container">
                            <div>
                                price:

                            </div>
                            <div className="mb-3">
                                <label htmlFor="coupon-code">Coupon Code:</label>
                                    <input 
                                    //ref={couponCodeInputRef}
                                    type="text" 
                                    className="form-control coupon-code-input" 
                                    id="coupon-code" 
                                    />
                            </div>
                            <div className="d-flex mb-5">
                                <button type="button" className="selected-book-add-coupon-code-button">                                                           
                                    Add Coupon Code
                                        <RiCouponLine className="fs-5 ms-2 coupon-icon"/>
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;