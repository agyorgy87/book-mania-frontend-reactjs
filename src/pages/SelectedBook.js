import "../css/SelectedBook.css";
import React from 'react';
import { useContext } from 'react';
import { BookContext } from "../context/BookContext.js";
import NavigationBar from '../components/NavigationBar.js';

const SelectedBook = () => {

    const bookDetails = useContext(BookContext);

    console.log(bookDetails);

    return (
        <div>
            <div>
                <NavigationBar/>
            </div> 
            <div>
                <img src={"http://localhost:4000/books_img" + bookDetails.value.image_big} alt="..." />          
            </div>
            {bookDetails.value.title}<br></br>
            {bookDetails.value.author_name}<br></br>
            {bookDetails.value.publisher_name}<br></br>
            {bookDetails.value.price}<br></br>
            {bookDetails.value.release_date}<br></br>
            {bookDetails.value.book_description}
        </div>
    )
}

export default SelectedBook