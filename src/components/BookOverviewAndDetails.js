import "../css/BookOverviewAndDetails.css";
import React from 'react';

const BookOverviewAndDetails = (props) => {

    const bookDetails = props.bookData;

    return (
        <div className="overview-book-details-container">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active tabs-style fw-bold overview-and-book-deatils-title" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Overview</button>
                    <button className="nav-link tabs-style fw-bold overview-and-book-deatils-title" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Book details</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="overview mt-3">   
                        <p className="overview-value description-text ps-3 pe-3">{bookDetails.book_description}</p>              
                    </div> 
                </div>
                <div className="tab-pane fade ps-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="d-flex mt-3">
                        <div>
                            <div>
                                <p className="content-title book-details-title me-2">Genre:</p>
                            </div>
                            <div>
                                <p className="content-title book-details-title me-2">Release date: </p>
                            </div>
                            <div>
                                <p className="content-title book-details-title me-2">Number of page:</p>
                            </div>
                        </div>
                        <div className="ms-3">
                            <div>
                                <p className="content-value">{bookDetails.genre_type}</p>
                            </div>
                            <div>
                                <p className="content-value">{bookDetails.release_date}</p>
                            </div> 
                            <div>
                                <p className="content-value">{bookDetails.number_of_page}</p>
                            </div>                                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookOverviewAndDetails;