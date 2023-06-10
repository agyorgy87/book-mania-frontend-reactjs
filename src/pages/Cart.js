import '../css/Cart.css';
import { useState, useEffect, useRef } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Cart = () => {

    const userData = useContext(UserContext)

    const cartData = useContext(CartContext);
   
    const [totatPriceInOrderSummary, setTotalPriceInOrderSummary] = useState(0);

    const couponCodeInputRef = useRef(null);

    const [couponCodeInput, setCouponCodeInput] = useState("");

    const [bookMultiple, setBookMultiple] = useState(1);

    const [showinDiscount, setShowingDiscount] = useState(0);

    const [couponCodeValidation, setCouponCodeValidation] = useState(2);

    const couponCodeCheck = () => {
        axios.get(`http://localhost:4000/get-coupon-code/${couponCodeInput}`)
            .then(response => {
                console.log(response);
                if(response.data.success === true) {
                    setBookMultiple(response.data.bookMultiple)
                    setCouponCodeValidation(true)
                }else{
                    setCouponCodeValidation(false)
                }
        })
    }

    const sendCouponCode = () => {
        if(userData.value.jwt){
            axios.get(`http://localhost:4000/set-coupon-used/${couponCodeInput}`)
            .then(response => {
                console.log(response);               
                alert("sikeres fizetés");
        })
        }else{
            alert("a kuponokat csak bejelentkezve tudod használni")
        }    
    }
    
    useEffect(() => {
        sumPriceCalculator();
    }, [cartData.value]);

    useEffect(() => {
        if(bookMultiple === 0.8) {
            setShowingDiscount(20)
        }else if(bookMultiple === 0.7){
            setShowingDiscount(30)
        }else if(bookMultiple === 0.5){
            setShowingDiscount(50)
        }
    }, [bookMultiple])

    const sumPriceCalculator = () => {
        let allData = cartData.value
        let sum = 0;
        for(let book of allData) {
            sum += book.price * book.quantity
        }
        setTotalPriceInOrderSummary(sum.toFixed(2));   
    }

    const allItems = () => {
        let allData = cartData.value
        let sum = 0;
        for(let book of allData) {
            sum += book.quantity
        }
        return sum;
    }

    const deleteSelectedBook = (book) => {
        let searchedBookID = book.id;
        let cartDatas = localStorage.getItem("cart");
        let parsedCartDatas = JSON.parse(cartDatas);
        let newListWithoutSearchedBook = parsedCartDatas.filter(book => book.id !== searchedBookID);
        let stringifiedCartData = JSON.stringify(newListWithoutSearchedBook);
        localStorage.setItem("cart", stringifiedCartData);
        window.location.reload();//better solution?
    }

    const deleteAllBooksFromLocal = () => {
        localStorage.removeItem('cart');
        window.location.reload();
    }

    const plusOneBook = (book) => {      
        let allCartData = [...cartData.value]
        let foundIndex = allCartData.findIndex(x => x.id === book.id);
        let bookForModification = allCartData[foundIndex];
        allCartData.splice(foundIndex, 1);
        bookForModification["quantity"] = bookForModification["quantity"] + 1;
        allCartData.splice(foundIndex, 0, bookForModification)
        let stringifiedCartData = JSON.stringify(allCartData)
        localStorage.setItem("cart", stringifiedCartData);   
        cartData.setValue(allCartData);    
    }

    const minusOneBook = (book) => {
        let allCartData = [...cartData.value]
        let foundIndex = allCartData.findIndex(x => x.id === book.id);
        let bookForModification = allCartData[foundIndex];
        allCartData.splice(foundIndex, 1);
        bookForModification["quantity"] = bookForModification["quantity"] - 1;
        allCartData.splice(foundIndex, 0, bookForModification)
        let stringifiedCartData = JSON.stringify(allCartData)
        localStorage.setItem("cart", stringifiedCartData);   
        cartData.setValue(allCartData);  
    }

    let allQuantity = allItems();

    return (
        <div className="cart-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container">
                <div className="mb-3">
                    <h1 className="top-my-cart-text me-2">My Cart</h1>
                    <h4 className="my-cart-items-text">({allQuantity} items)</h4>
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
                                                <p className="cart-book-title">{book.title}</p>
                                                <p className="cart-book-author-name mb-4">{book.author_name}</p>
                                                <p className="cart-book-release-date mb-1">{book.release_date}</p>
                                                <p className="cart-book-publisher-name">{book.publisher_name}</p>
                                            </div>
                                        </div>                                       
                                            <div className="price-count-remove-container d-flex flex-column pt-2 pe-3">
                                                <div className="d-flex flex-row-reverse mb-2">
                                                    <div>
                                                        <h4>{(book.price * book.quantity).toFixed(2)} $</h4>
                                                    </div>                                                 
                                                </div> 
                                                <div className="d-flex mb-4">                                                                           
                                                        <div>
                                                            <button 
                                                            className="plus-minus-button" 
                                                            onClick={() => minusOneBook(book)}>
                                                                <BiMinus className="plus-minus-icon"/> 
                                                            </button>
                                                        </div>
                                                        <div className="ms-2 current-book-number">
                                                            <p>{book.quantity}</p>
                                                        </div>
                                                        <div>
                                                            <button 
                                                            className="plus-minus-button ms-2" 
                                                            onClick={() => plusOneBook(book)}>
                                                                <BiPlus className="plus-minus-icon"/>
                                                            </button>
                                                        </div>
                                                </div>                                         
                                                <div className="d-flex flex-row-reverse">
                                                    <div>
                                                        <button className="remove-button" onClick={() => deleteSelectedBook(book)}><MdOutlineRemoveShoppingCart className="plus-minus-icon"/></button>
                                                    </div>
                                                </div>
                                            </div>                                                                            
                                    </div>
                                ))
                            }
                            {
                            cartData.value.length > 0 ?
                            <div className="d-flex flex-row-reverse me-5">
                                <div className="float-right">
                                    <button className="delete-cart-button" onClick={deleteAllBooksFromLocal}>Clear Your Cart</button>
                                </div>
                            </div>
                            : 
                            null
                        }
                        </div>                      
                        <div className="col-3 ps-4 container-fluid paying-container">
                            <div className="mt-2">
                                <p className="h3">Order Summary</p>
                            </div>
                            <div className="mt-3">
                                <p className="subtotal-items-text">{allQuantity} items Subtotal</p>
                            </div>                           
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="total-text">Total</h5>
                                </div>
                                <div className="pe-4 mb-3">                               
                                    <h5>{totatPriceInOrderSummary} $</h5>                               
                                </div>
                            </div>
                            { bookMultiple !== 1 ?
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row-reverse me-4">
                                        <h5>-{showinDiscount}%</h5>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5 className="total-text">Discounted Price</h5>
                                        </div>
                                        <div className="pe-4">
                                            <h5>{(bookMultiple * totatPriceInOrderSummary).toFixed(2)} $</h5>
                                        </div>
                                    </div>                                  
                                </div>
                            :
                            null
                            }
                            <div>
                                <p className="coupon-question">Have a coupon code?</p>
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control coupon-code-input" placeholder="Enter coupon code" ref={couponCodeInputRef} onChange={(e) => setCouponCodeInput(e.target.value)}/>                             
                                    <button className="btn add-coupon-code-button" type="button" onClick={couponCodeCheck}>Add</button>                              
                            </div> 
                            { couponCodeValidation === true ?
                                <div class="alert alert-success" role="alert">
                                    Coupon Code Correct.
                                </div>
                                :
                                <div class="alert alert-danger" role="alert">
                                    Coupon Code Invalid.
                                </div>
                            }
                            <div>
                                <button className="payment-button mb-4" onClick={sendCouponCode}>Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;