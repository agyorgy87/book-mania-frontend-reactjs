import React from 'react';
import "../css/BooksInTheWishList.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; 

const BooksInTheWishList = (props) => {

    let userWishList = props.list;

    let navigate = useNavigate();

    console.log(userWishList);

    return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div> 
                        <h1 className="text-of-wish-list-books">{props.text}</h1> 
                    </div>
                    <div className="row ms-5">
                        { userWishList.map((book, index) => (
                            <div className="col-md-4 col-lg-3 col-xl-3 col-xxl-2 d-flex flex-column wish-list-book-card mb-5" key={"newness-div" + index}>
                                <div className="d-flex justify-content-center mb-4 mt-4">
                                    <img 
                                    src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                    className="img-fluid wishlist-book-pics shadow"                                             
                                    onClick={() => {navigate("/selectedbook/" + book.book_id)}}
                                    alt="book"
                                    />                                        
                                </div>
                                <div className="d-flex flex-column">                      
                                    <div className="d-flex ps-2 pe-2">
                                        <Link 
                                        className="wishlist-book-title"
                                        to={"/selectedbook/" + book.id}
                                        >                                      
                                        { book.title.length > 17 ? book.title.substring(0,19) + " ..." : book.title }
                                        </Link>
                                    </div>
                                    <div className="d-flex ps-2 pe-2 mt-2">
                                        <p className="wishlist-author-name">{book.author_name}</p>
                                    </div>
                                </div>           
                                <div className="d-flex ps-2">
                                    <p className="wishlist-value-of-the-book">{book.price} $</p>
                                </div>                                                                                                                                                   
                            </div>                                        
                        ))}
                    
                    </div>
                </div>
            </div>
    )
}

export default BooksInTheWishList;