import "../css/WishList.css"
import {useEffect, useState} from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import NavigationBar from '../components/NavigationBar.js';
import BooksInTheWishList from "../components/BooksInTheWishList.js";



const WishList = () => {  

    const userData = useContext(UserContext);

    const [userWishList, setUserWishList] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:4000/user-wishlist/" + userData.value.id)
            .then(response => {
            setUserWishList(response.data);
            
            })
    }, [])

    console.log(userWishList);

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
                <div className="mb-4"> 
                    <h1 className="text-of-wish-list-books">My wish list</h1>
                </div>
                <div>
                    <BooksInTheWishList list={userWishList}/> 
                </div>               
            </div>
        </div>
    )
}

export default WishList;