import "../css/CartBooks.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";

const CartBooks = ({setAllQuantity}) => {

    let navigate = useNavigate(); 

    const cartData = useContext(CartContext);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    useEffect(() => {
        const allQuantityInOneArray = cartData.value.map(item => item.quantity);
        const sumAllQuantity = allQuantityInOneArray.reduce((previousAmount, currentValue) => previousAmount + currentValue, 0);
        setAllQuantity(sumAllQuantity);
    }, [cartData]);

    const plusOneBook = (book) => {     
        setButtonDisabled(false);  
        let allCartData = [...cartData.value]
        let foundIndex = allCartData.findIndex(x => x.id === book.id);
        let bookForModification = allCartData[foundIndex];
        allCartData.splice(foundIndex, 1);
        bookForModification["quantity"] = bookForModification["quantity"] + 1;
        allCartData.splice(foundIndex, 0, bookForModification)
        let stringifiedCartData = JSON.stringify(allCartData)
        localStorage.setItem("cart", stringifiedCartData);   
        cartData.setValue(allCartData);  
    }

    const minusOneBook = (book) => {
        if(book.quantity < 2) {
            setButtonDisabled(true);
        }else{
            let allCartData = [...cartData.value]
            let foundIndex = allCartData.findIndex(x => x.id === book.id);
            let bookForModification = allCartData[foundIndex];
            allCartData.splice(foundIndex, 1);
            bookForModification["quantity"] = bookForModification["quantity"] - 1;
            allCartData.splice(foundIndex, 0, bookForModification)
            let stringifiedCartData = JSON.stringify(allCartData)
            localStorage.setItem("cart", stringifiedCartData);   
            cartData.setValue(allCartData); 
        }
         
    }

    const deleteSelectedBook = (book) => {
        let searchedBookID = book.id;
        let cartDatas = localStorage.getItem("cart");
        let parsedCartDatas = JSON.parse(cartDatas);
        let newListWithoutSearchedBook = parsedCartDatas.filter(book => book.id !== searchedBookID);
        let stringifiedCartData = JSON.stringify(newListWithoutSearchedBook);
        localStorage.setItem("cart", stringifiedCartData);
        cartData.setValue(newListWithoutSearchedBook);
    }
 
    const deleteAllBooksFromLocal = () => {
        localStorage.removeItem('cart');
        cartData.setValue([]);
    }

    return (
        <div>
            {
                cartData.value.map((book, index) => (
                    <div className="selected-book-for-purchase mb-4 d-flex justify-content-between" key={"cart-data-div" + index}>
                        <div className="book-title-author-publisher-container d-flex"> 
                            <div>
                                <img 
                                src={envAndLocal + "/books_img/" + book.img_directory + "/" + book.image}
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
                        </div>                                       
                        <div className="d-flex flex-column pt-2 pe-3">
                            <div className="d-flex flex-row-reverse mb-3">
                                <div>
                                    <h4 className="cart-book-price">{(book.price * book.quantity).toFixed(2)} $</h4>
                                </div>                                                 
                            </div> 
                            <div className="d-flex align-self-end mb-3 ">                                                                           
                                <div>
                                    <button 
                                    className="plus-minus-button" 
                                    disabled={buttonDisabled}
                                    onClick={() => minusOneBook(book)}>
                                    <BiMinus className="plus-minus-icon"/> 
                                    </button>
                                </div>
                                <div className="ms-2 current-book-number">
                                    <p>{book.quantity}</p>
                                </div>
                                <div>
                                    <button 
                                    className="plus-minus-button ms-2" 
                                    onClick={() => plusOneBook(book)}>
                                    <BiPlus className="plus-minus-icon"/>
                                    </button>
                                </div> 
                            </div>                                         
                            <div className="d-flex align-self-end">
                                <div>
                                    <button className="remove-book-button" onClick={() => deleteSelectedBook(book)}><MdOutlineRemoveShoppingCart className="plus-minus-icon"/></button>
                                </div>
                            </div>
                        </div>                                                                            
                    </div>
                ))
            }
            {
                cartData.value.length > 0 ?
                    <div className="d-flex flex-row-reverse me-3 mb-5"> 
                        <div className="float-right">
                            <button className="delete-cart-button" onClick={deleteAllBooksFromLocal}>Clear Your Cart</button>
                        </div>
                    </div>
                : 
                    null
            }
        </div>
    )
}

export default CartBooks;