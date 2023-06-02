import '../css/Cart.css';
import { useState, useEffect, useRef } from 'react';
import NavigationBar from '../components/NavigationBar.js';

import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";

const Cart = () => {

    
    const couponCodeInputRef = useRef(null);

     const [couponCodeInput, setCouponCodeInput] = useState("")

    const couponCodeInputValue = () => {
        setCouponCodeInput(couponCodeInputRef.current.value);
    }
    
   const cartData = useContext(CartContext);
   const [totatPriceInOrderSummary, setTotalPriceInOrderSummary] = useState(0);

    useEffect(() => {
        let allData = cartData.value;
        let allPrice = allData.map(obj => obj.price);
        let sumPrice = 0; 
        allPrice.forEach(num => {sumPrice += num;})
        let priceFixed = sumPrice.toFixed(2)
        setTotalPriceInOrderSummary(priceFixed);
    }, [totatPriceInOrderSummary])


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

    const deleteAllBooksFromLocal = () => {
        localStorage.removeItem('cart');
        window.location.reload();
    }

    console.log(couponCodeInput)

    return (
        <div className="cart-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container">
                <div>
                    <h1 className="top-my-cart-text me-2">My Cart</h1>
                    <h4 className="my-cart-items-text">({cartData.value.length} items)</h4>
                </div>
                <div>
                    <div className="row">
                        <div className="col-9">                           
                            {
                                cartData.value.map((book, index) => (
                                    <div className="selected-book-for-purchase mb-3 d-flex justify-content-between" key={"cart-data-div" + index}>
                                        <div className="book-title-author-publisher-container d-flex">
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
                                            <div className="price-count-remove-container d-flex flex-column pt-2 pe-3">
                                                <div className="d-flex flex-row-reverse mb-2">
                                                    <div>
                                                        <h4>{book.price} $</h4>
                                                    </div>                                                 
                                                </div> 
                                                <div className="d-flex mb-4">                                                                           
                                                        <div>
                                                            <button className="plus-minus-button"><BiMinus className="plus-minus-icon" /></button>
                                                        </div>
                                                        <div className="ms-2">
                                                            <p>{book.quantity}</p>
                                                        </div>
                                                        <div>
                                                            <button className="plus-minus-button ms-2"><BiPlus className="plus-minus-icon"/></button>
                                                        </div>
                                                </div>                                         
                                                <div className="d-flex flex-row-reverse">
                                                    <div>
                                                        <button className="remove-button" onClick={() => deleteSelectedBook(book)}><RiDeleteBin7Line className="plus-minus-icon"/></button>
                                                    </div>
                                                </div>
                                            </div>                                                                            
                                    </div>
                                ))
                            }
                            {
                            cartData.value.length > 0 ?
                            <div className="d-flex justify-content-center mb-5">
                                <div>
                                    <button className="delete-all-cart-data-button" onClick={deleteAllBooksFromLocal}>Clear Your Cart</button>
                                </div>
                            </div>
                            : 
                            null
                        }
                        </div>                       
                        <div className="col-3 paying-container ps-4">
                            <div className="mt-2">
                                <p className="h3">Order Summary</p>
                            </div>
                            <div className="mt-3">
                                <p className="subtotal-items-text">{cartData.value.length} items Subtotal</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="total-text">Total</h5>
                                </div>
                                <div className="pe-4">
                                    <h5>{totatPriceInOrderSummary}</h5>
                                </div>
                            </div>
                            <div className="mt-3 coupon-code-container ">
                                <div>
                                    <p>Have a coupon code?</p>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter coupon code" ref={couponCodeInputRef}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button" onClick={couponCodeInputValue}>Add</button>
                                        </div>
                                </div>
                            </div>
                            <div>
                                <button className="payment-button">payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;