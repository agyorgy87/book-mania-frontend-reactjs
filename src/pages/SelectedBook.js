import "../css/SelectedBook.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";
import BookPictureAndData from "../components/BookPictureAndData.js";
import BookPriceAndButtons from "../components/BookPriceAndButtons.js"


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
                <div className="container d-flex">
                    <div className="mt-5 mb-5 selected-book-picture-and-title">
                        <BookPictureAndData bookData={bookDetails}/> 
                    </div> 
                    <div className="mt-5 mb-5 selected-book-price-and-buttons">
                        <BookPriceAndButtons bookData={bookDetails}/>
                    </div>
                </div>   
                <div>
                <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active tabs-style" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Overview</button>
                    <button className="nav-link tabs-style" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Book Details</button>
                </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="overview mt-3">   
                            <p className="overview-value">{bookDetails.book_description}</p>              
                        </div> 
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="content d-flex mt-3">
                            <div>
                                <p className="content-title">Release date</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.release_date}</p>
                            </div>                 
                        </div>
                            <hr/>
                        <div className="content d-flex">
                            <div>
                                <p className="content-title">Number of page</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.number_of_page}</p>
                            </div>                 
                        </div>
                            <hr/>
                        <div className="content d-flex">
                            <div>
                                <p className="content-title">Genre</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.genre_type}</p>
                            </div>                 
                        </div>
                    </div>
                </div>
                </div>
            </div>           
    )
}

export default SelectedBook;

{/*style={{ background: `url("http://localhost:4000/books_img/${bookDetails.img_directory}/${bookDetails.image_big}")` }}*/}
