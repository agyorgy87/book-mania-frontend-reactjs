import '../css/Books.css';
import NavigationBar from '../components/NavigationBar.js';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Books = () => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);

    const [allGenre, setAllGenre] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);

    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      }, []);
    
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

    const callGenreWithList = (genreName) => {
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

    const categoriesOptions = [
        { value: "allBooks", label: "All Books" },
        { value: "Cooking", label: "Cooking" },
        { value: "Fantasy", label: "Fantasy" },
        { value: "History", label: "History" },
        { value: "Horror", label: "Horror" },
        { value: "IT", label: "IT" }
    ];

    const callGenreWithSelect = (selectedOption) => {
        if(selectedOption.value === "allBooks"){
            getAllBooks();
        }else{
            axios.get(`http://localhost:4000/get-all-by-genre/"${selectedOption.value}"`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        }  
        setShowResult(false);  
        scrollToUp();
    }

    const callPriceWithList = (fromPrice, toPrice) => {
        axios.get(`http://localhost:4000/get-all-by-price/${fromPrice}/${toPrice}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(false);
        scrollToUp();
    }

    const priceOptions = [
        { value: "0-10", label: "Under 10$" },
        { value: "11-20", label: "Between 11$ and 20$" },
        { value: "21-30", label: "Between 21$ and 30$" },
        { value: "31-40", label: "Between 31$ and 40$" },
        { value: "40-9999", label: "Over 40$" }
    ];

    const callPriceWithSelect = (selectedOption) => {

        const twoAmountsLimit = selectedOption.value
        const numbers = twoAmountsLimit.split("-").map(numStr => parseInt(numStr));
        const fromPrice = numbers[0];
        const toPrice = numbers[1];
        
        axios.get(`http://localhost:4000/get-all-by-price/${fromPrice}/${toPrice}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(false);
        scrollToUp();   
    }

    const callReleaseDateWithList = (fromDate, toDate) => {
        axios.get(`http://localhost:4000/get-all-by-release-date/${fromDate}/${toDate}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        setShowResult(false);
        scrollToUp();
    }

    const releaseDateOptions = [
        { value: "0-2000", label: "Before 2000" },
        { value: "2001-2010", label: "Between 2000 and 2010" },
        { value: "2011-2020", label: "Between 2010 and 2020" },
        { value: "2000-9999", label: "After 2020" }
    ]

    const callReleaseDateWithSelect = (selectedOption) => {
        
        const twoAmountsLimit = selectedOption.value
        const numbers = twoAmountsLimit.split("-").map(numStr => parseInt(numStr));
        const fromDate = numbers[0];
        const toDate = numbers[1];
        
        axios.get(`http://localhost:4000/get-all-by-release-date/${fromDate}/${toDate}`)
            .then((response) => {
            setVisibleBooks(response.data);     
            })    
        setShowResult(false);
    }

    const callSpecialSearchWithList = (selectedSpecialSearch, selectedSpecialOrder) => {
        axios.get(`http://localhost:4000/get-all-by-special/${selectedSpecialSearch}/${selectedSpecialOrder}`)
            .then((response) => {
            setVisibleBooks(response.data);
            console.log(response.data) 
        })
        setShowResult(false);
        scrollToUp();
    }

    const specialOptions = [
        { value: "title_name-asc", label: "ABC order" },
        { value: "number_of_page_name-asc", label: "Number of pages in ascending order" },
        { value: "price_name-asc", label: "From the cheapest book" },
        { value: "price_name-desc", label: "From the most expensive book" }
    ]

    const callSpecialSearchWithSelect = (selectedOption) => {

        const twoParameters = selectedOption.value;
        const twoPart = twoParameters.split("-");
        console.log(twoPart);
        const selectedOptionOrderBy = twoPart[0];
        const selectedOptionOrder = twoPart[1];
        
        axios.get(`http://localhost:4000/get-all-by-special/${selectedOptionOrderBy}/${selectedOptionOrder}`)
            .then((response) => {
            setVisibleBooks(response.data);  
              
            })    
        setShowResult(false);
    }

    const callPublisherWithList = (publisherName) => {

        axios.get(`http://localhost:4000/get-all-by-publishers/${publisherName}`)
            .then((response) => {
            setVisibleBooks(response.data);
            })
        setShowResult(false);
        scrollToUp();
    }


    const publishersOptions = [
        { value: "Ad Astra", label: "Ad Astra" },
        { value: "Bestline", label: "Bestline" },
        { value: "Disciplina", label: "Disciplina" },
        { value: "ComputerPanorama", label: "ComputerPanorama" },
        { value: "ComputerComplex", label: "ComputerComplex" }

    ]

    const callPublishersWithSelect = (selectedOption) => {

        axios.get(`http://localhost:4000/get-all-by-publishers/${selectedOption.value}`)
            .then((response) => {
            setVisibleBooks(response.data);
        }) 
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
    

    

    return(
        <div className="book-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            { isLoading ? (
                <div>
                Loading...
                </div>
            ) : (
            <div className="container-fluid">
            <div className="row">
                    <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-2 side-bar d-none d-sm-none d-md-block">
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded ">Categories</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={getAllBooks}>All</li> 
                            {
                                allGenre.map((genre, index) => (
                                    <li key={"allgenre-list-div" + index} className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callGenreWithList(genre.genre_type)}>{genre.genre_type}</li>
                                ))
                            }                                               
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Price</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPriceWithList(0, 10)}>Under 10$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPriceWithList(11, 20)}>Between 11$ and 20$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPriceWithList(21, 30)}>Between 21$ and 30$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPriceWithList(31, 40)}>Between 31$ and 40$</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPriceWithList(40, 9999)}>Over 40$</li>
                                                
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Release Date</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDateWithList(0, 2000)}>Before 2000</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDateWithList(2001, 2010)}>Between 2001 and 2010</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDateWithList(2011, 2020)}>Between 2011 and 2020</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callReleaseDateWithList(2020, 9999)}>After 2020</li>                       
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Special</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callSpecialSearchWithList("title_name", "asc")}>ABC order</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callSpecialSearchWithList("number_of_page_name", "asc")}>Number of pages in ascending order</li>                       
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callSpecialSearchWithList("price_name", "asc")}>From the cheapest book</li>
                            <li className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callSpecialSearchWithList("price_name", "desc")}>From the most expensive book</li>
                            
                        </ul>
                        <ul className="list-group mt-4">
                            <li className="list-group-item name-of-the-list active border-0 rounded">Publishers</li>
                            {
                                allPublisher.map((publisher, index) => (
                                    <li key={"all-publisher-div" + index} className="list-group-item list-group-item-action border-0 options-for-filtering" onClick={() => callPublisherWithList(publisher.publisher_name)}>{publisher.publisher_name}</li>
                                ))
                            }
                        </ul>
                    </div>
                <div className="col-md-9 col-lg-9 col-xl-9 col-xxl-10">
                    <div className="d-block d-md-none d-flex flex-column align-items-center ">
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%" }}
                                    placeholder="All Categories"                                
                                    onChange={callGenreWithSelect}
                                    options={categoriesOptions}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%" }}
                                    placeholder="Price"                                
                                    onChange={callPriceWithSelect}
                                    options={priceOptions}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%" }}
                                    placeholder="Release Date"                                
                                    onChange={callReleaseDateWithSelect}
                                    options={releaseDateOptions}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%"}}
                                    placeholder="Special"                                
                                    onChange={callSpecialSearchWithSelect}
                                    options={specialOptions}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%"}}
                                    placeholder="Publishers"                                
                                    onChange={callPublishersWithSelect}
                                    options={publishersOptions}
                                />                                                  
                        </div>
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
        )}  
    </div>   
    )
}

export default Books;
                    
