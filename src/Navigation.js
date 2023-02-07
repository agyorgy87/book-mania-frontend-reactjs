import {Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.js";
import Books from "./pages/Books.js";
import Contact from "./pages/Contact.js";


const Navigation = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;