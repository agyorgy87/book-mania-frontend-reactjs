import "../css/SelectedBook.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";

const SelectedBook = () => {

      let params = useParams();

      const [bookDetails, setBookDetails] = useState({});

      useEffect(() => {
        axios.get("http://localhost:4000/get-book-by-id/" + params.id)
            .then(response => {
                setBookDetails(response.data);
            })
      }, [])

    return (
        <div>
            <div>
                <NavigationBar/>
            </div> 
            {/*style={{ background: `url("http://localhost:4000/books_img/${bookDetails.img_directory}/${bookDetails.image_big}")` }}*/}
            <div>
            <img 
                src={"http://localhost:4000/books_img/" + bookDetails.img_directory + "/" + bookDetails.image_big}
                className="img-fluid"                                             
                alt="book"
                />    
            </div>
            {bookDetails.title}<br></br>
            {bookDetails.author_name}<br></br>
            {bookDetails.publisher_name}<br></br>
            {bookDetails.price}<br></br>
            {bookDetails.release_date}<br></br>
            {bookDetails.book_description}
    
        </div>
    )
}

export default SelectedBook