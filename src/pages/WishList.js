import "../css/WishList.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import { CartContext } from "../context/CartContext";
import NavigationBar from '../components/NavigationBar.js';
import { Link } from 'react-router-dom'; 
import { CgShoppingCart } from "react-icons/cg";
import BooksComponent from "../components/BooksComponent.js";



const WishList = () => {  

  let navigate = useNavigate();

  const userData = useContext(UserContext);

  const cartData = useContext(CartContext);

  const [userWishList, setUserWishList] = useState([])

  
  useEffect(() => {
    axios.get("http://localhost:4000/user-wishlist/" + userData.value.id)
        .then(response => {
          setUserWishList(response.data);
        })
  }, [])

/*
    const wishListAddToCart = (book) => {  
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
    <div className="wishlist-page">
        <div className="fixed-top">
            <NavigationBar/>
        </div>
        <div className="container">
            <div>
                <BooksComponent text="Wish list" list={userWishList}/> 
            </div>
        </div>
        {/* 
        <div className="container">
                <div className="row mt-5">
                    { userWishList.map((book, index) => (
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-5 d-flex flex-column" key={"newness-div" + index}>
                            <div className="mb-2">
                                <img 
                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                className="img-fluid wishlist-book-pics"                                             
                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column">                      
                                <div className="wishlist-book-title-container">
                                    <Link 
                                    className="wishlist-book-title"
                                    to={"/selectedbook/" + book.id}
                                    >                                      
                                        {book.title}
                                    </Link>
                                </div>
                                <div>
                                    <div>
                                        <p className="wishlist-author-name">{book.author_name}</p>
                                    </div>
                                    <div>
                                        <h5 className="wishlist-value-of-the-book">{book.price} $</h5>
                                    </div>                                                     
                                    <div>
                                        <button type="button" className="wishlist-add-to-cart-buttons" onClick={() => wishListAddToCart(book)}>                                                           
                                            Add To Cart 
                                                <CgShoppingCart className="fs-5 ms-2 wishlist-cart-icon"/>
                                        </button>
                                    </div>
                                </div>                                                                                              
                            </div>           
                        </div>                                        
                        ))
                    }
                </div>
            </div>  
            */}
    </div>
  )
}

export default WishList;