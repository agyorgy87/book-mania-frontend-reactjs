import '../css/BooksComponent.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
//import { CgShoppingCart } from "react-icons/cg";
//import { useContext } from 'react';
//import { CartContext } from "../context/CartContext";

const RecommendedBooks = (props) => {

    let navigate = useNavigate();

    let list = props.list

    /*
    const cartData = useContext(CartContext);

    const homePageBookAddToCart = (book) => {
        
        let allData = cartData.value;
        let allCartDataId = allData.map(obj => obj.id);

        if(allCartDataId.includes(book.id) === true) {
            alert("this book is already in the cart")
        }else{
            const bookDetailsCopy = {...book}
            bookDetailsCopy.quantity = 1
            const cartDataCopy = [...cartData.value, bookDetailsCopy]
            cartData.setValue(cartDataCopy);
            localStorage.setItem("cart", JSON.stringify(cartDataCopy));
        }
    }
    */
    return (
        <div>
            <div className="row d-flex justify-content-between">
                <div className="mb-2">
                    <h1 className="text-of-recommended-books">{props.text}</h1> 
                </div>
                        { list.map((book, index) => (
                            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-5 d-flex flex-column book-card me-5" key={"newness-div" + index}>
                                <div className="d-flex justify-content-center mt-3 mb-4 mt-4">
                                    <img 
                                    src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                    className="img-fluid home-book-pics shadow"                                             
                                    onClick={() => {navigate("/selectedbook/" + book.id)}}
                                    alt="book"
                                    />                                        
                                </div>
                                <div className="d-flex flex-column">                      
                                    <div className="d-flex ps-2 pe-2">
                                        <Link 
                                        className="home-book-title"
                                        to={"/selectedbook/" + book.id}
                                        >                                      
                                        { book.title.length > 20 ? book.title.substring(0,21) + " ..." : book.title}                                                                                        
                                        </Link>
                                    </div>
                                    <div className="d-flex ps-1 pe-1 mt-2">
                                        <p className="home-author-name">{book.author_name}</p>
                                    </div>                                                                                                                                                                  
                                </div> 
                                <div className="d-flex justify-content-around book-price-heart-container">                                       
                                        <div>
                                            <h5 className="home-value-of-the-book">{book.price} $</h5>
                                        </div>
                                        <div>
                                            <button><AiOutlineHeart/></button>
                                        </div>                                                                                           
                                </div>                                           
                            </div>                                        
                            ))
                        }
                    </div>
        </div>
    )
}

export default RecommendedBooks;