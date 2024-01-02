import React from 'react';
import { Link } from 'react-router-dom'; 
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { TotalPriceContext } from "../context/TotalPriceContext.js";
import { useNavigate } from "react-router-dom";

const CheckoutTotalSummary = () => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const totalPriceData = useContext(TotalPriceContext);

    console.log(totalPriceData);//included all data!

    return (
        <div>{/*css classes from CartBooks.js componens*/}
            { cartData.value.map((book, index) => ( 
                <div className="mb-4 d-flex justify-content-between" key={"cart-data-div" + index}>
                    <div className="book-title-author-publisher-container d-flex"> 
                        <div>
                            <img 
                            src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                            className="cart-book-pics mt-2"                                             
                            alt="book"
                            onClick={() => {navigate("/selectedbook/" + book.id)}}
                            /> 
                        </div>
                        <div className="mt-2 ms-4">
                            <Link 
                            className="cart-book-title"
                            to={"/selectedbook/" + book.id}
                            > 
                            {book.title}
                            </Link>
                            <p className="cart-book-author-name mt-3">{book.author_name}</p>
                        </div>
                        <div>
                            <p>X {book.quantity}</p>
                        </div>
                    </div>                                                                                                                
                </div>
            ))}
            <div>
                <p>discount: {totalPriceData.value.discountKey}</p>
                <p>discounted price: {totalPriceData.value.discountedPriceKey}</p>
                <p>total price: {totalPriceData.value.totalPriceKey}</p>
            </div> 
        </div>
    )
}

export default CheckoutTotalSummary