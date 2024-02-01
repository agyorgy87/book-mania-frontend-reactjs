import {Routes, Route, BrowserRouter} from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home.js";
import Books from "./pages/Books.js";
import Contact from "./pages/Contact.js";
import Login from "./pages/Login.js";
import CreateAccount from "./pages/CreateAccount.js";
import SelectedBook from "./pages/SelectedBook.js";
import WishList from "./pages/WishList.js";
import Cart from "./pages/Cart.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import Checkout from "./pages/Checkout.js";
import { UserContext } from "./context/UserContext.js";
import { CartContext } from "./context/CartContext.js";
import { TotalPriceContext } from "./context/TotalPriceContext.js";

const Navigation = () => { 

    let userDetails = localStorage.getItem("token")

    let obj;

    if(userDetails === null) {
        obj = {};
    }else{
        obj = JSON.parse(userDetails);
        let currentDate = Math.floor(Date.now() / 1000)
        if(currentDate < obj.expireDate === false) {
            obj = {};
        }
    }

    let cartDetails = localStorage.getItem("cart")

    let cartObj;
     
    if(cartDetails === null){
        cartObj = [];
    }else{
        cartObj = JSON.parse(cartDetails);
    } 

    let totalPriceObj = {
        totalPriceKey: 0,
        discountKey: 0,
        discountedPriceKey: 0
    }

    const [userData, setUserData] = useState(obj);

    const [cartData, setCartData] = useState(cartObj);

    const [totalPriceData, setTotalPriceData] = useState(totalPriceObj);

    return(
        <div>
            <UserContext.Provider value={{value:userData, setValue:setUserData}}>
            <CartContext.Provider value={{value:cartData, setValue:setCartData}}>
            <TotalPriceContext.Provider value={{value:totalPriceData, setValue:setTotalPriceData}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/books" element={<Books/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/login" element={<Login/>} />                           
                        <Route path="/forgotpassword" element={<ForgotPassword/>} />
                        <Route path="/createaccount" element={<CreateAccount/>} />
                        <Route path="/selectedbook/:id" element={<SelectedBook/>} />
                        <Route path="/wishlist" element={<WishList/>} />
                        <Route path="/cart" element={<Cart/>} /> 
                        <Route path="/checkout" element={<Checkout/>} />                  
                    </Routes>
                </BrowserRouter>
            </TotalPriceContext.Provider>
            </CartContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default Navigation;