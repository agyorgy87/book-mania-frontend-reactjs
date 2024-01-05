import "../css/OrderSummary.css";
import { useState, useEffect, useRef } from 'react';
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { TotalPriceContext } from "../context/TotalPriceContext.js";
import axios from "axios";
import LoginWarning from "../modal/LoginWarning.js";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const userData = useContext(UserContext);

    const totalPriceData = useContext(TotalPriceContext);

    const couponCodeInputRef = useRef(null);

    const [totatPriceInOrderSummary, setTotalPriceInOrderSummary] = useState(0);

    const [couponCodeValidationMessage, setCouponCodeValidationMessage] = useState(false);

    const [couponCodeIsCorrectOrIncorrect, setCouponCodeIsCorrectOrIncorrect] = useState(true);

    const [couponCodeInput, setCouponCodeInput] = useState("");

    const [bookMultiple, setBookMultiple] = useState(1);

    const [showingDiscount, setShowingDiscount] = useState(0);

    const [discountedPrice, setDiscountedPrice] = useState(0);

    const [openModal, setOpenModal] = useState(false);

    const modalMessage = "If you want to buy, please log in.";

    let allPriceInOneArray = {
        totalPriceKey: totatPriceInOrderSummary,
        discountKey: showingDiscount,
        discountedPriceKey: discountedPrice
    };

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
        setDiscountedPrice((bookMultiple * totatPriceInOrderSummary).toFixed(2));
    },[bookMultiple, totatPriceInOrderSummary]);

    useEffect(() => {
        if(couponCodeInput.length === 0) {
            setCouponCodeValidationMessage(false)
        }
    }, [couponCodeInput]);

    useEffect(() => {
        sumPriceCalculator();
    }, [cartData.value]);

    const couponCodeCheck = () => {
        axios.get(`http://localhost:4000/get-coupon-code/${couponCodeInput}`)
            .then(response => {
                console.log(response);
                if(response.data.success === true) {
                    setBookMultiple(response.data.bookMultiple);
                    setCouponCodeValidationMessage(true);
                    setCouponCodeIsCorrectOrIncorrect(true);
                }else{
                    setCouponCodeValidationMessage(true);
                    setCouponCodeIsCorrectOrIncorrect(false);
                }
        })
    }

    const proceedToCheckout = () => {
        if(!userData.value.jwt){
            setOpenModal(true);
        }
        else if(userData.value.jwt && couponCodeInput !== ""){
            axios.get(`http://localhost:4000/set-coupon-used/${couponCodeInput}`)
            .then(response => {
                console.log(response);               
        })
        totalPriceData.setValue(allPriceInOneArray);
        navigate("/checkout");
        }
        else if(userData.value.jwt) {
            totalPriceData.setValue(allPriceInOneArray);
            navigate("/checkout");
        }
    }

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

    const closeModal = () => {
        setOpenModal(false);
    }

    let allQuantity = allItems(); 

    console.log(allPriceInOneArray);

    return (
        <div className="container-fluid paying-container ps-4 pe-4">
            <div>
                {openModal && <LoginWarning close={closeModal} message={modalMessage}/>}  
            </div>
                <div className="mt-3 d-flex justify-content-center">
                    <p className="order-summary-text">Order Summary</p>
                </div>
                <div className="mt-3 d-flex flex-row-reverse">
                    <p className="subtotal-items-text">{allQuantity} items Subtotal</p>
                </div>                           
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="total-text">Total:</p>
                    </div>
                    <div>                               
                        <p className="total-price-in-number">{totatPriceInOrderSummary} $</p>                               
                    </div>
                </div>
                    { 
                        bookMultiple !== 1 ? 
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="discount-text">Discount:</p>
                                    </div>
                                    <div>
                                        <p className="discount-percentage">-{showingDiscount}%</p>
                                    </div>
                                </div>                             
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="discounted-price-text">Discounted Price:</p> 
                                    </div>
                                    <div>
                                        <p className="discounted-price">{discountedPrice} $</p>
                                    </div>
                                </div>                                  
                            </div>
                        :
                            null
                    }
                    <div>
                        <label htmlFor="coupon-code-input" className="coupon-question form-label">Have a coupon code?</label>
                        <div className="input-group mb-4 coupon-code-input-container">
                            <input 
                            type="text" 
                            id="coupon-code-input"
                            className="form-control coupon-code-input" 
                            placeholder="Enter coupon code" 
                            ref={couponCodeInputRef} 
                            onChange={(e) => setCouponCodeInput(e.target.value)}
                            />                             
                            <button className="btn add-coupon-code-button" type="button" onClick={couponCodeCheck}>Apply</button>                              
                        </div> 
                    </div> 
                { 
                    couponCodeValidationMessage ?
                        <div className="d-flex justify-content-center">
                            { 
                                couponCodeIsCorrectOrIncorrect ?
                                    <div className="d-flex">
                                        <BsFillEmojiSmileFill className="emoji-smile me-2"/>
                                            <p className="correct-message">The coupon code is correct.</p>
                                    </div>
                                    
                                : 
                                    <div className="d-flex">
                                        <BsFillEmojiFrownFill className="emoji-sad me-2"/>
                                            <p className="incorrect-message">The coupon code is incorrect.</p>
                                    </div>
                             }                                   
                        </div>
                    :
                        null
                }
                <div>
                    <button className="btn payment-button mt-3 mb-4" onClick={proceedToCheckout}>Procced To Checkout</button>
                </div>  
        </div>
    )
}

export default OrderSummary;