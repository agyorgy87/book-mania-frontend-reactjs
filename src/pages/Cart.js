import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { RiCouponLine } from "react-icons/ri";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";

const Cart = () => {

    //const couponCodeInputRef = useRef(null);

    /*
        const couponCodeClick = () => {
        setInputValue(couponCodeInputRef.current.value);

    }
    */

    const cartData = useContext(CartContext);

  return (
    <div>
        <div>
            <NavigationBar/>
        </div>
        <div classname="container row">
            <div className="row">
            <div className="col-8">
                {
                    cartData.value.map((book, index) => (
                        <div key={"cart-data-div" + index}>
                            {book.title}
                            {book.quantity}
                        </div>
                    ))
                }
            </div>
            <div className="col-4">
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
  )
}

export default Cart;