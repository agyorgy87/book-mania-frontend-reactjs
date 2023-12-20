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
import SideBarFilters from '../components/SideBarFilters.js';
import SearchInput from '../components/SearchInput.js';
import GenreSideBarFilter from '../components/GenreSideBarFilter.js';
import PublisherSideBarFilter from '../components/PublisherSideBarFilter.js';

const Books = () => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);

    const [allGenre, setAllGenre] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);

    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    const [genreSelect, setGenreSelect] = useState();
    const [priceSelect, setPriceSelect] = useState();
    const [releaseDateSelect, setReleaseDateSelect] = useState();
    const [specialSearchSelect, setSpecialSearchSelect] = useState();
    const [publisherSelect, setPublisherSelect] = useState();

    /*
    setGenreSelect("");
    setPriceSelect("");
    setReleaseDateSelect("");
    setSpecialSearchSelect("");
    setPublisherSelect("");
    */

    //const [isLoading, setIsLoading] = useState(true);
/*
    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      }, []);
*/
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
            setGenreSelect(selectedOption);
            setPriceSelect("");
            setReleaseDateSelect("");
            setSpecialSearchSelect("");
            setPublisherSelect("");
            
        }else{
            axios.get(`http://localhost:4000/get-all-by-genre/"${selectedOption.value}"`)
            .then((response) => {
            setVisibleBooks(response.data);          
            setGenreSelect(selectedOption);
            setPriceSelect("");
            setReleaseDateSelect("");
            setSpecialSearchSelect("");
            setPublisherSelect("");
        
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

        setGenreSelect("");
        setPriceSelect(selectedOption);
        setReleaseDateSelect("");
        setSpecialSearchSelect("");
        setPublisherSelect("");
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

        setGenreSelect("");
        setPriceSelect("");
        setReleaseDateSelect(selectedOption);
        setSpecialSearchSelect("");
        setPublisherSelect("");
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

        setGenreSelect("");
        setPriceSelect("");
        setReleaseDateSelect("");
        setSpecialSearchSelect(selectedOption);
        setPublisherSelect("");
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

        setGenreSelect("");
        setPriceSelect("");
        setReleaseDateSelect("");
        setSpecialSearchSelect("");
        setPublisherSelect(selectedOption);
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

    const sideBarPriceFilters = [
        {filterName: "Under 10$", filterFunction: () => callPriceWithList(0,10)},
        {filterName: "Between 11$ and 20$", filterFunction: () => callPriceWithList(11,20)},
        {filterName: "Between 21$ and 30$", filterFunction: () => callPriceWithList(21,30)},
        {filterName: "Between 31$ and 40$", filterFunction: () => callPriceWithList(31,40)},
        {filterName: "Over 40$", filterFunction: () => callPriceWithList(40,999)},
    ]

    const sideBarDateFilters = [
        {filterName: "Before 2000", filterFunction: () => callReleaseDateWithList(0,2000)},
        {filterName: "Between 2001 and 2010", filterFunction: () => callReleaseDateWithList(2001,2010)},
        {filterName: "Between 2011 and 2020", filterFunction: () => callReleaseDateWithList(2011,2020)},
        {filterName: "After 2020", filterFunction: () => callReleaseDateWithList(2020,9999)},
    ]     

    const sideBarOtherFilter = [
        {filterName: "Cheapest books", filterFunction: () => callSpecialSearchWithList("price_name","asc")},
        {filterName: "Expensive books", filterFunction: () => callSpecialSearchWithList("price_name","desc")},
        {filterName: "ABC order", filterFunction: () => callSpecialSearchWithList("title_name","asc")},
        {filterName: "Number of Page in ascending oder", filterFunction: () => callSpecialSearchWithList("number_of_page_name","asc")},
    ]
    
    return(
        <div className="book-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            {/*
            { isLoading ? (
                <div>
                Loading...
                </div>
            ) : (*/}
            <div className="container-fluid">
            <div className="row">
                    <div className="col-md-3 col-lg-3 col-xl-3 col-xxl-2 side-bar d-none d-sm-none d-md-block">
                        <ul className="list-group mt-4">
                            <GenreSideBarFilter options={allGenre} onFilterClick={callGenreWithList}/>                                         
                        </ul>
                        <ul className="list-group mt-4">
                            <SideBarFilters text="Price" filter={sideBarPriceFilters}/>
                        </ul>
                        <ul className="list-group mt-4">
                            <SideBarFilters text="Release Date" filter={sideBarDateFilters}/>
                        </ul>
                        <ul className="list-group mt-4">
                            <SideBarFilters text="Other" filter={sideBarOtherFilter}/>
                        </ul>
                        <ul className="list-group mt-4">
                            <PublisherSideBarFilter options={allPublisher} onFilterClick={callPublisherWithList}/> 
                        </ul>
                    </div>
                <div className="col-md-9 col-lg-9 col-xl-9 col-xxl-10">
                    <div className="row d-flex justify-content-center mb-3 mt-4 ">
                        <SearchInput onChange={callAllTitlesAndAuthors} />                      
                    </div>
                    <div className="d-block d-md-none d-flex flex-column align-items-center ">
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%" }}
                                    placeholder="All Categories"                                
                                    onChange={callGenreWithSelect}
                                    options={categoriesOptions}
                                    value={genreSelect}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%" }}
                                    placeholder="Price"                                
                                    onChange={callPriceWithSelect}
                                    options={priceOptions}
                                    value={priceSelect}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%" }}
                                    placeholder="Release Date"                                
                                    onChange={callReleaseDateWithSelect}
                                    options={releaseDateOptions}
                                    value={releaseDateSelect}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%"}}
                                    placeholder="Special"                                
                                    onChange={callSpecialSearchWithSelect}
                                    options={specialOptions}
                                    value={specialSearchSelect}
                                />                                                  
                        </div>
                        <div className="select-div mt-3">
                                <Select 
                                    className="mb-1"
                                    style={{ width: "100%"}}
                                    placeholder="Publishers"                                
                                    onChange={callPublishersWithSelect}
                                    options={publishersOptions}
                                    value={publisherSelect}
                                />                                                  
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
                    
