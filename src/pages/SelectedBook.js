import "../css/SelectedBook.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const SelectedBook = () => {

    let params = useParams();

    const [bookDetails, setBookDetails] = useState({});
    const [heartIconFull, setHeartIconFull] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/get-book-by-id/" + params.id)
            .then(response => {
                setBookDetails(response.data);
            })
    }, [])

    const addToWishList = () => {
        if(heartIconFull) {
            setHeartIconFull(false);
        }else{
            setHeartIconFull(true);
        }
        
    }

    return (
        <div>
            <div>
                <NavigationBar/>
            </div> 
            {/*style={{ background: `url("http://localhost:4000/books_img/${bookDetails.img_directory}/${bookDetails.image_big}")` }}*/}
            <div className="container d-flex flex-column">
                <div className="d-flex justify-content-between mt-4 mb-5">
                    <div className="d-flex">
                        <div className="me-4">
                            <img 
                            src={"http://localhost:4000/books_img/" + bookDetails.img_directory + "/" + bookDetails.image_big}
                            className="img-fluid"                                             
                            alt="book"
                            />
                        </div>
                        <div>
                            <div>
                                {bookDetails.title}
                            </div>
                            <div>
                                {bookDetails.author_name}
                            </div>
                            <div>
                                share: twitter-icon, facebook-icon
                            </div>
                        </div>
                    </div>  
                    <div>
                        <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h3 className="card-title mb-5">{bookDetails.price} $</h3>
                                <input className="form-control" placeholder="Enter Coupon Code"></input>
                                <button type="button" className="btn btn-primary">Add Coupon Code</button>
                                <button type="button" className="btn btn-primary">Add To Cart</button>
                            </div>
                        </div>
                        <div>
                            { heartIconFull ?
                            <button onClick={addToWishList}><AiFillHeart/> This book is in your wishlist</button>
                            :
                            <button onClick={addToWishList}><AiOutlineHeart/> Add To Wishlist</button>
                            }
                            
                        </div>
                    </div>               
                </div>   
                <div>
                    overview
                </div>
            </div>
            
        </div>
    )
}

export default SelectedBook;

{/*
            {bookDetails.publisher_name}<br></br>
            {bookDetails.release_date}<br></br>
            {bookDetails.book_description}
*/}

