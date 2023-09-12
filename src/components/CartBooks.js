import "../css/CartBooks.css";
import { useEffect } from 'react';
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
//import { NumberOfCartItems } from "../context/NumberOfCartItems";

const CartBooks = () => {

    const cartData = useContext(CartContext);
/*   
    const NumberOfCartData = useContext(NumberOfCartItems);

    const allItems = () => {
        let allData = cartData.value
        let sum = 0;
        for(let book of allData) {
            sum += book.quantity
        }
        NumberOfCartData.setValue(sum);
    }
*/
    const plusOneBook = (book) => {      
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
                    <div className="selected-book-for-purchase mb-3 d-flex justify-content-between" key={"cart-data-div" + index}>
                        <div className="book-title-author-publisher-container d-flex"> 
                            <div>
                                <img 
                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                className="cart-book-pics mt-2"                                             
                                alt="book"
                                /> 
                            </div>
                            <div className="mt-2 ms-4">
                                <p className="cart-book-title">{book.title}</p>
                                <p className="cart-book-author-name mb-4">{book.author_name}</p>
                            </div>
                        </div>                                       
                        <div className="d-flex flex-column pt-2 pe-3">
                            <div className="d-flex flex-row-reverse mb-2">
                                <div>
                                    <h4 className="cart-book-price">{(book.price * book.quantity).toFixed(2)} $</h4>
                                </div>                                                 
                            </div> 
                            <div className="d-flex mb-4">                                                                           
                                <div>
                                    <button 
                                    className="plus-minus-button" 
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
                            <div className="d-flex flex-row-reverse">
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
                    <div className="d-flex flex-row-reverse me-5"> 
                        <div className="float-right">
                            <button className="delete-cart-button mb-5" onClick={deleteAllBooksFromLocal}>Clear Your Cart</button>
                        </div>
                    </div>
                : 
                    null
            }
        </div>
    )
}

export default CartBooks;