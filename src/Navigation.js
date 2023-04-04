import {Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home.js";
import Books from "./pages/Books.js";
import Contact from "./pages/Contact.js";
import Login from "./pages/Login.js";
import CreateAccount from "./pages/CreateAccount.js";
import SuccessfulRegistration from "./pages/SuccessfulRegistration.js"
import { BookContext } from "./context/BookContext.js";

const Navigation = () => {

    const [bookData, setBookData] = useState([])

    return(
        <div>
            <BookContext.Provider value={{value:bookData, setValue:setBookData}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/books" element={<Books/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/createaccount" element={<CreateAccount/>} />
                        <Route path="/successfulregistration" element={<SuccessfulRegistration/>} />
                    </Routes>
                </BrowserRouter>
            </BookContext.Provider>
        </div>
    )
}

export default Navigation;