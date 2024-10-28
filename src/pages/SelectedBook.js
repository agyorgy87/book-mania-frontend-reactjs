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

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    useEffect(() => {
        axios.get(envAndLocal + "/get-book-by-id/" + params.id) 
            .then(response => {
                setBookDetails(response.data);
            })
    },[])

    return (
        <div className="selected-book-page">      
            <div>
                <NavigationBar/> 
            </div> 
                <div className="container mt-5 d-flex justify-content-around selected-book-picture-data-price-buttons-container">
                    <div className="col-xl-8 selected-book-picture-and-title">
                        <BookPictureAndData bookData={bookDetails}/> 
                    </div> 
                    <div className="col-xl-4 mt-5 mb-5 selected-book-price-and-buttons">
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


