import React from 'react';
import "../css/BooksInTheWishList.css";
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom'; 

const BooksInTheWishList = (props) => { 

    let userWishList = props.list;

    let navigate = useNavigate();   

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    return ( 
        <div className="container d-flex justify-content-center">   
            <div className="row"> 
                { userWishList.map((book, index) => ( 
                    <div key={"newness-div" + index} 
                    className="wish-list-book-card-container col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-5">
                        <div className="d-flex flex-column wish-list-book-card">
                            <div className="d-flex justify-content-center mb-4 mt-4">
                                <img 
                                src={envAndLocal + "/books_img/" + book.img_directory + "/" + book.image} 
                                className="img-fluid wish-list-book-pics shadow"                                             
                                onClick={() => {navigate("/selectedbook/" + book.book_id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column ps-4 pe-4">                      
                                <div className="d-flex books-wishlist-container">
                                    <Link 
                                    className="wish-list-book-title"
                                    to={"/selectedbook/" + book.id}
                                    >
                                    {book.title}                                   
                                    {/*{ book.title.length > 17 ? book.title.substring(0,23) + " ..." : book.title }*/}                                                                                       
                                    </Link>
                                </div>
                                <div className="d-flex mt-2">
                                    <p className="wish-list-author-name">{book.author_name}</p>
                                </div>                                                                                                                                                                  
                            </div> 
                            <div className="d-flex ps-4">                                              
                                <p className="wish-list-book-price">{book.price} $</p>                                                                                                                                                   
                            </div>                                           
                        </div>    
                    </div>                                    
                ))}
                
            </div>
        </div>
    )
}

export default BooksInTheWishList;

