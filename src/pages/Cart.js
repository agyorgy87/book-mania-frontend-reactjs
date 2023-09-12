import '../css/Cart.css';
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar.js';
//import axios from "axios";
//import { BiPlus } from "react-icons/bi";
//import { BiMinus } from "react-icons/bi";
//import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
//import { UserContext } from "../context/UserContext";
//import LoginWarning from "../modal/LoginWarning.js";
import CartBooks from "../components/CartBooks.js";
import OrderSummary from "../components/OrderSummary.js";

const Cart = () => {  

    const cartData = useContext(CartContext);

    const [allQuantity, setAllQuantity] = useState()

    const allItems = () => {
        let allData = cartData.value
        let sum = 0;
        for(let book of allData) {
            sum += book.quantity
        }
        return sum; 
    }

    useEffect(() => {
        allItems()
    },[])
    
    /*
    const userData = useContext(UserContext);

    const cartData = useContext(CartContext);
   
    const [totatPriceInOrderSummary, setTotalPriceInOrderSummary] = useState(0);

    const couponCodeInputRef = useRef(null);

    const [couponCodeInput, setCouponCodeInput] = useState("");

    const [bookMultiple, setBookMultiple] = useState(1);

    const [showingDiscount, setShowingDiscount] = useState(0);

    const [couponCodeValidationMessage, setCouponCodeValidationMessage] = useState(false);

    const [couponCodeIsCorrectOrIncorrect, setCouponCodeIsCorrectOrIncorrect] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    const couponCodeCheck = () => {
        axios.get(`http://localhost:4000/get-coupon-code/${couponCodeInput}`)
            .then(response => {
                console.log(response);
                if(response.data.success === true) {
                    setBookMultiple(response.data.bookMultiple);
                    setCouponCodeValidationMessage(true);
                    setCouponCodeIsCorrectOrIncorrect(true);
                    //context set coupon code
                }else{
                    setCouponCodeValidationMessage(true);
                    setCouponCodeIsCorrectOrIncorrect(false);
                }
        })
    }

    const proceedToCheckout = () => {
        if(userData.value.jwt){
            axios.get(`http://localhost:4000/set-coupon-used/${couponCodeInput}`)
            .then(response => {
                console.log(response);               
                //navigate to payment page
        })  
        }else{
            setOpenModal(true);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
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
    }, [bookMultiple]);

    useEffect(() => {
        if(couponCodeInput.length === 0) {
            setCouponCodeValidationMessage(false)
        }
    }, [couponCodeInput]);

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
        cartData.setValue(newListWithoutSearchedBook);
    }

    const deleteAllBooksFromLocal = () => {
        localStorage.removeItem('cart');
        cartData.setValue([]);
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
*/

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
                        <div className="col-md-8 col-lg-8 continer-fluid"> 
                            <CartBooks/>
                        </div> 
                        {/*                         
                            {
                                cartData.value.map((book, index) => (
                                    <div className="selected-book-for-purchase mb-3 d-flex justify-content-between" key={"cart-data-div" + index}>
                                        <div className="book-title-author-publisher-container d-flex">
                                            <div>
                                                <img 
                                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                                className="cart-book-pics mt-2"                                             
                                                alt="book"
                                                /> 
                                            </div>
                                            <div className="mt-2 ms-4">
                                                <p className="cart-book-title">{book.title}</p>
                                                <p className="cart-book-author-name mb-4">{book.author_name}</p>
                                            </div>
                                        </div>                                       
                                            <div className="d-flex flex-column pt-2 pe-3">
                                                <div className="d-flex flex-row-reverse mb-2">
                                                    <div>
                                                        <h4 className="cart-book-price">{(book.price * book.quantity).toFixed(2)} $</h4>
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
                                    <button className="delete-cart-button mb-5" onClick={deleteAllBooksFromLocal}>Clear Your Cart</button>
                                </div>
                            </div>
                            : 
                            null
                            }
                        */}                                             
                        <div className="col-md-4 col-lg-4">
                            <OrderSummary/>
                            {/*
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
                            { couponCodeValidationMessage ?
                                <div className={`${couponCodeIsCorrectOrIncorrect ? "alert alert-success" : "alert alert-danger"}`} role="alert">
                                    { couponCodeIsCorrectOrIncorrect ?
                                        "Coupon Code Correct."
                                        :
                                        "Coupon Code Incorrect."
                                    }                                   
                                </div>
                                :
                                null
                            }
                            <div>
                                <button className="payment-button mb-4" onClick={proceedToCheckout}>Procced To Checkout</button>
                            </div>
                        */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart;