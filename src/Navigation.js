import {Routes, Route, BrowserRouter} from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home.js";
import Books from "./pages/Books.js";
import Contact from "./pages/Contact.js";
import Login from "./pages/Login.js";
import CreateAccount from "./pages/CreateAccount.js";
import SuccessfulRegistration from "./pages/SuccessfulRegistration.js"
import SelectedBook from "./pages/SelectedBook.js";
import WishList from "./pages/WishList.js";
import Cart from "./pages/Cart.js";
import { UserContext } from "./context/UserContext.js";
import { CartContext } from "./context/CartContext.js";

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

    const [userData, setUserData] = useState(obj);

    const [cartData, setCartData] = useState(cartObj);

    

    return(
        <div>
                <UserContext.Provider value={{value:userData, setValue:setUserData}}>
                    <CartContext.Provider value={{value:cartData, setValue:setCartData}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/books" element={<Books/>} />
                            <Route path="/contact" element={<Contact/>} />
                            <Route path="/login" element={<Login/>} />
                            <Route path="/createaccount" element={<CreateAccount/>} />
                            <Route path="/successfulregistration" element={<SuccessfulRegistration/>} />
                            <Route path="/selectedbook/:id" element={<SelectedBook/>} />
                            <Route path="/wishlist" element={<WishList/>} />
                            <Route path="/cart" element={<Cart/>} />
                        </Routes>
                    </BrowserRouter>
                    </CartContext.Provider>
                </UserContext.Provider>
        </div>
    )
}

export default Navigation;