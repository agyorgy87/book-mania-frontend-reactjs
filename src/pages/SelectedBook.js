import "../css/SelectedBook.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";
import BookPictureAndData from "../components/BookPictureAndData.js";
import BookPriceAndButtons from "../components/BookPriceAndButtons.js";
import BookOverviewAndDetails from "../components/BookOverviewAndDetails.js";


const SelectedBook = () => {

    let params = useParams();

    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        axios.get("http://localhost:4000/get-book-by-id/" + params.id) 
            .then(response => {
                setBookDetails(response.data);
            })
    },[])

    return (
        <div className="selected-book-page">    
            <div>
                <NavigationBar/>
            </div> 
                <div className="container selected-book-picture-data-price-buttons-container">
                    <div className="mt-5 mb-5 selected-book-picture-and-title">
                        <BookPictureAndData bookData={bookDetails}/> 
                    </div> 
                    <div className="mt-5 mb-5 selected-book-price-and-buttons">
                        <BookPriceAndButtons bookData={bookDetails}/>
                    </div>
                </div> 
                <div className="container">
                    <BookOverviewAndDetails bookData={bookDetails}/>
                </div>          
        </div>           
    )
}

export default SelectedBook;

{/*style={{ background: `url("http://localhost:4000/books_img/${bookDetails.img_directory}/${bookDetails.image_big}")` }}*/}
