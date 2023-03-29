import '../css/Books.css';
import React, { useState, useEffect, useRef } from "react";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";

const Books = () => {

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);

    const [allGenre, setAllGenre] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);
    

    useEffect(() => { 
        getAllBooks();  
        getAllGenre();
        getAllPublisher();
    }, [])

    const scrollToUp = () => {
        window.scrollTo(0, 0)
      }

    const getAllBooks = () => {
        axios.get("http://localhost:4000/get-all-books")
             .then((response) => {
                setVisibleBooks(response.data);
                allBooks.current = response.data;
        });
    }

    const getAllGenre = () => {
        axios.get(`http://localhost:4000/get-all-genre`)
            .then((response) => {
            setAllGenre(response.data);
        })
        scrollToUp();
    }

    const getAllPublisher = () => {
        axios.get(`http://localhost:4000/get-all-publisher`)
            .then((response) => {
            setAllPublisher(response.data);
        })
        scrollToUp();
    }

    const callGenre = (genreName) => {
        if(genreName === "allBooks"){
            getAllBooks();
        }else{
            axios.get(`http://localhost:4000/get-all-by-genre/"${genreName}"`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        }    
        scrollToUp();
    }

    const callPrice = (fromPrice, toPrice) => {
        axios.get(`http://localhost:4000/get-all-by-price/${fromPrice}/${toPrice}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        scrollToUp();
    }

    const callSelectedPrice = (value) => {
        console.log(value["min"],value["max"]);
        /*
        axios.get(`http://localhost:4000/get-all-by-price/${fromPrice}/${toPrice}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        */
    }

    const callReleaseDate = (fromDate, toDate) => {
        axios.get(`http://localhost:4000/get-all-by-release-date/${fromDate}/${toDate}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        scrollToUp();
    }

    const specialSearch = (selectedSpecialSearch, selectedSpecialOrder) => {
        axios.get(`http://localhost:4000/get-all-by-special/${selectedSpecialSearch}/${selectedSpecialOrder}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        scrollToUp();
    }

    const callPublisher = (publisherName) => {
        axios.get(`http://localhost:4000/get-all-by-publishers/${publisherName}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        scrollToUp();
    }

    
    
    
    return(
        <div>
            <div>
                <NavigationBar/>
            </div>
            <div className="search-site row">
                <div className="search-lists-container w-25 h-100 ps-5">
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Categories</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={getAllBooks}>All</li> 
                        {
                            allGenre.map((genre, index) => (
                                <li className="list-group-item list-group-item-action border-0" onClick={() => callGenre(genre.genre_type)}>{genre.genre_type}</li>
                            ))
                        }
                                             
                    </ul>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Price</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callPrice(0, 10)}>Under 10$</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callPrice(11, 20)}>Between 11$ and 20$</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callPrice(21, 30)}>Between 21$ and 30$</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callPrice(31, 9999)}>Over 31$</li>{/*külön apit csinálni*/}
                                              
                    </ul>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Release Date</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callReleaseDate(0, 2000)}>Before 2000</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callReleaseDate(2001, 2010)}>Between 2001 and 2010</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callReleaseDate(2011, 2020)}>Between 2011 and 2020</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => callReleaseDate(2020, 9999)}>After 2020</li>                       
                    </ul>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Special</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => specialSearch("title_name", "asc")}>ABC order</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => specialSearch("number_of_page_name", "asc")}>Number of pages in ascending order</li>                       
                        <li className="list-group-item list-group-item-action border-0" onClick={() => specialSearch("price_name", "asc")}>From the cheapest book</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => specialSearch("price_name", "desc")}>From the most expensive book</li>
                        
                    </ul>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Publishers</li>
                        {
                            allPublisher.map((publisher, index) => (
                                <li className="list-group-item list-group-item-action border-0" onClick={() => callPublisher(publisher.publisher_name)}>{publisher.publisher_name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-75 h-100">
                    <div>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => callGenre(e.target.value)}>
                        <option selected>Categories</option>
                        <option value="allBooks">All Books</option>
                        {
                            allGenre.map((genre, index) => (
                                <option>{genre.genre_type}</option>
                            ))
                        }
                    </select> 
                    <select className="form-select" aria-label="Default select example" onClick={(e) => callSelectedPrice(e.target.dataset)}>
                        <option selected>Price</option>
                        <option data-min="0" data-max="10">Under 10$</option>
                        <option data-min="11" data-max="20">Between 11$ and 20$</option>
                        <option data-min="21" data-max="30">Between 21$ and 30$</option>
                        <option data-min="31" data-max="40">Between 31$ and 40$</option> 
                        <option data-min="41" data-max="99">Over 40$</option> 
                    </select>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Release Date</option>
                        <option value="before2000">Before 2000</option>
                        <option value="between2001and2010">Between 2001 and 2010</option>
                        <option value="between2011and2020">Between 2011 and 2020</option>
                        <option value="after2020">After 2020</option>
                    </select>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Special</option>
                        <option >ABC order</option>
                        <option >Number of pages in ascending order</option>
                        <option >From the cheapest book0</option>
                        <option >From the most expensive book</option>
                    </select>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Publishers</option>
                        <option >Ad Astra</option>
                        <option >Bestline</option>
                        <option >Disciplina</option>
                        <option >ComputerPanorama</option>
                        <option >ComputerComplex</option>
                    </select>
                    </div>
                    <div className="row">
                        <div className="input-group col-md-4">
                            <input className="form-control py-2 border-right-0 border" type="search" id="example-search-input"/>
                                <button className="btn btn-outline-secondary border rounded-right" type="button">
                                    <i className="bi bi-search"></i>
                                </button>
                        </div>
                    </div>            
                    <div className="d-flex justify-content-center ms-5 mt-5">   
                        <div className="row"> 
                            <div>    
                            Search result:
                            </div> 
                                {
                                    visibleBooks.map((book, index) => (
                                        <div className="card mb-3 me-1 border-0 " style={{maxWidth: "400px"}}>
                                            <div className="row g-0">
                                                <div className="col-md-5">
                                                    <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} className="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="card-body pt-0">
                                                        <h5 className="card-text ">{book.title}</h5>
                                                        <p className="card-text">{book.author_name}</p>
                                                        <h4 className="card-text">{book.price} $</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <p><i className="bi bi-heart me-1"></i>Add To Wishlist</p>
                                                        {/*<i class="bi bi-heart"></i> -> filled heart icon*/}
                                                        <button type="button" className="add-to-cart-buttons">Add To Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                        </div> 
                    </div>                       
                </div>
            </div>         
    </div>   
    )
}

export default Books;
