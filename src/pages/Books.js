import '../css/Books.css';
import NavigationBar from '../components/NavigationBar.js';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';

const Books = () => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);

    const [allGenre, setAllGenre] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);

    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState("");
    
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
        setShowResult(false);
    }

    const getAllGenre = () => {
        axios.get(`http://localhost:4000/get-all-genre`)
            .then((response) => {
            setAllGenre(response.data);
        })
        setShowResult(false);
        scrollToUp();
    }

    const getAllPublisher = () => {
        axios.get(`http://localhost:4000/get-all-publisher`)
            .then((response) => {
            setAllPublisher(response.data);
        })
        setShowResult(false);
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
        setShowResult(false);  
        scrollToUp();
    }

    const callPrice = (fromPrice, toPrice) => {
        axios.get(`http://localhost:4000/get-all-by-price/${fromPrice}/${toPrice}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(false);
        scrollToUp();
    }

    const callSelectedPrice = (value) => {
        
        let selectedOption = value.target.options[value.target.selectedIndex]
        let selectedOptionMin = selectedOption.dataset.min
        let selectedOptionMax = selectedOption.dataset.max
        
        if(selectedOptionMin !== undefined && selectedOptionMax !== undefined){
            axios.get(`http://localhost:4000/get-all-by-price/${selectedOptionMin}/${selectedOptionMax}`)
            .then((response) => {
            setVisibleBooks(response.data);     
            })    
        }
        setShowResult(false);
    }

    const callReleaseDate = (fromDate, toDate) => {
        axios.get(`http://localhost:4000/get-all-by-release-date/${fromDate}/${toDate}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(false);
        scrollToUp();
    }

    const callSelectedReleaseDate = (value) => {
        
        let selectedOption = value.target.options[value.target.selectedIndex]
        let selectedOptionMin = selectedOption.dataset.min
        let selectedOptionMax = selectedOption.dataset.max
        
        if(selectedOptionMin !== undefined && selectedOptionMax !== undefined){
            axios.get(`http://localhost:4000/get-all-by-release-date/${selectedOptionMin}/${selectedOptionMax}`)
            .then((response) => {
            setVisibleBooks(response.data);     
            })    
        }
        setShowResult(false);
    }

    const specialSearch = (selectedSpecialSearch, selectedSpecialOrder) => {
        axios.get(`http://localhost:4000/get-all-by-special/${selectedSpecialSearch}/${selectedSpecialOrder}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(false);
        scrollToUp();
    }

    const selectedSpecialSearch = (e) => {

        let selectedOption = e.target.options[e.target.selectedIndex]
        let selectedOptionOrderBy = selectedOption.dataset.orderBy
        let selectedOptionOrder = selectedOption.dataset.order
        
        if(selectedOptionOrderBy !== undefined && selectedOptionOrder !== undefined){
            axios.get(`http://localhost:4000/get-all-by-special/${selectedOptionOrderBy}/${selectedOptionOrder}`)
            .then((response) => {
            setVisibleBooks(response.data);     
            })    
        }
        setShowResult(false);
    }

    const callPublisher = (publisherName) => {
        if(publisherName === "allBooks"){
            getAllBooks();
        }else{
        axios.get(`http://localhost:4000/get-all-by-publishers/${publisherName}`)
            .then((response) => {
            setVisibleBooks(response.data);
            })
        }
        setShowResult(false);
        scrollToUp();
    }

    const callAllTitlesAndAuthors = (e) => {
        axios.get(`http://localhost:4000/get-book-title/${e}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(true);
        setSearchResult(e);
    }

    const visibleBooksAddToCart = (book) => { 
        const bookDetailsCopy = {...book}
        bookDetailsCopy.quantity = 1
        const cartDataCopy = [...cartData.value, bookDetailsCopy]
        cartData.setValue(cartDataCopy);
        localStorage.setItem("cart", JSON.stringify(cartDataCopy));
    }
    /*d-lg-block*/
    return(
        <div className="book-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container-fluid">
            <div className="row">
                    <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-2 side-bar d-none d-sm-none d-md-block">
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded ">Categories</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={getAllBooks}>All</li> 
                            {
                                allGenre.map((genre, index) => (
                                    <li key={"allgenre-list-div" + index} className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callGenre(genre.genre_type)}>{genre.genre_type}</li>
                                ))
                            }
                                                
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Price</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPrice(0, 10)}>Under 10$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPrice(11, 20)}>Between 11$ and 20$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPrice(21, 30)}>Between 21$ and 30$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPrice(31, 9999)}>Over 31$</li>{/*külön apit csinálni*/}
                                                
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Release Date</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDate(0, 2000)}>Before 2000</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDate(2001, 2010)}>Between 2001 and 2010</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDate(2011, 2020)}>Between 2011 and 2020</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDate(2020, 9999)}>After 2020</li>                       
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Special</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => specialSearch("title_name", "asc")}>ABC order</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => specialSearch("number_of_page_name", "asc")}>Number of pages in ascending order</li>                       
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => specialSearch("price_name", "asc")}>From the cheapest book</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => specialSearch("price_name", "desc")}>From the most expensive book</li>
                            
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Publishers</li>
                            {
                                allPublisher.map((publisher, index) => (
                                    <li key={"all-publisher-div" + index} className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPublisher(publisher.publisher_name)}>{publisher.publisher_name}</li>
                                ))
                            }
                        </ul>
                    </div>
                <div className="col-md-9 col-lg-9 col-xl-9 col-xxl-10">
                    <div className="d-block d-md-none d-flex flex-column align-items-center">
                        <select className="form-select mb-3 all-select" aria-label="Default select example" onChange={(e) => callGenre(e.target.value)}>
                            <option>Categories</option>
                            <option value="allBooks">All Books</option>
                                {
                                    allGenre.map((genre, index) => (
                                        <option key={"allgenre-select" + index}>{genre.genre_type}</option>
                                    ))
                                }
                        </select> 
                        <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => callSelectedPrice(e)}>
                            <option>Price</option>
                            <option data-min="0" data-max="10">Under 10$</option>
                            <option data-min="11" data-max="20">Between 11$ and 20$</option>
                            <option data-min="21" data-max="30">Between 21$ and 30$</option>
                            <option data-min="31" data-max="40">Between 31$ and 40$</option> 
                            <option data-min="41" data-max="99">Over 40$</option> 
                        </select>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => callSelectedReleaseDate(e)}>
                            <option>Release Date</option>
                            <option data-min="0" data-max="2000">Before 2000</option>
                            <option data-min="2000" data-max="2010">Between 2000 and 2010</option>
                            <option data-min="2010" data-max="2020">Between 2010 and 2020</option>
                            <option data-min="2020" data-max="9999">After 2020</option>
                        </select>
                        <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => selectedSpecialSearch(e)}>
                            <option>Special</option>
                            <option data-order-by="title_name" data-order="asc">ABC order</option>
                            <option data-order-by="number_of_page_name" data-order="asc">Number of pages in ascending order</option>
                            <option data-order-by="price_name" data-order="asc">From the cheapest book</option>
                            <option data-order-by="price_name" data-order="desc">From the most expensive book</option>
                        </select>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => callPublisher(e.target.value)}>
                            <option>Categories</option>
                            <option value="allBooks">All Books</option>
                            {
                                allPublisher.map((publisher, index) => (
                                    <option key={"publisher-div" + index}>{publisher.publisher_name}</option>
                                ))
                            }
                        </select> 
                    </div> 
                    <div className="row d-flex justify-content-center mb-5 mt-4 ">
                        <div className="input-group mt-3 search-input-container">
                            <input 
                            className="form-control search-input" 
                            type="search" 
                            id="example-search-input"
                            onChange={(e) => callAllTitlesAndAuthors(e.target.value)}
                            />
                            <button className="btn btn-lg btn-outline-secondary border rounded-right outline-none search-button" type="button">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>                       
                    </div>            
                    <div className="container search-result-container">   
                        <div className="row">
                            {   showResult ?
                                <div className="mb-3">    
                                    <h1 className="search-result-books d-flex">Results for "{searchResult}"</h1>             
                                </div> 
                                :
                                null
                            }
                            
                            <div className="row">
                                { visibleBooks.map((book, index) => (
                                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-5 col-xl-ps-5" key={"visiblediv" + index}>
                                        <div className="mb-2">
                                            <img 
                                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                                className="img-fluid book-pics"                                             
                                                alt="book"
                                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                                />                                        
                                        </div>
                                        <div className="d-flex flex-column">                     
                                            <div className="book-title-container">
                                            <Link 
                                            className="book-title"
                                            to={"/selectedbook/" + book.id}
                                            >                                      
                                                {book.title}
                                            </Link>
                                            </div>
                                            <div>
                                                <div>
                                                    <p className="author-name">{book.author_name}</p>
                                                </div>
                                                <div>
                                                    <h5 className="value-of-the-book">{book.price} $</h5>
                                                </div>                                                     
                                                <div>
                                                    <button type="button" className="book-add-to-cart-buttons" onClick={() => visibleBooksAddToCart(book)}>                                                           
                                                        Add To Cart
                                                            <CgShoppingCart className="fs-5 ms-2 cart-icon"/>
                                                    </button>
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
        </div>     
    </div>   
    )
}

export default Books;
