import '../css/Books.css';
import React, { useState, useEffect, useRef } from "react";
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";

const Books = () => {

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);

    const [allGenre, setAllGenre] = useState([]);

    //const [filterByPrice, setFilterByPrice] = useState("none");
    //const [filterByReleaseDate, setFilterByReleaseDate] = useState("none");

    useEffect(() => { 
        /*
        fetch("http://localhost:4000/get-all-books")
            .then(data => data.json())
            .then(parsedData => {
                allBooks.current = parsedData;
                setVisibleBooks(parsedData);
            })
        */
        getAllBooks();  
        getAllGenre();
    }, [])

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
            console.log(response);
            })
    }

    
    const callGenre = (genreName) => {
        axios.get(`http://localhost:4000/get-all-by-genre/"${genreName}"`)
            .then((response) => {
            setVisibleBooks(response.data);
            }) 
    }

    const callPrice = (fromPrice, toPrice) => {

        axios.get(`http://localhost:4000/get-all-by-price/${fromPrice}/${toPrice}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
    }

    const callReleaseDate = (e) => {
        let allDate = e.currentTarget.id;
        let twoDateInArray = allDate.split("-");
        let fromDate = twoDateInArray[0];
        let toDate = twoDateInArray[1]

        axios.get(`http://localhost:4000/get-all-by-release-date/${fromDate}/${toDate}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
    }

    const specialSearch = (selectedSpecialSearch, selectedSpecialOrder) => {
        

        axios.get(`http://localhost:4000/get-all-by-special/${selectedSpecialSearch}/${selectedSpecialOrder}`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
    }

    const publisherSearch = (e) => {
        let selectedPublisher = e.currentTarget.id;

        axios.get(`http://localhost:4000/get-all-by-publishers/${selectedPublisher}`)
            .then((response) => {
            setVisibleBooks(response.data);
            })
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
                        <li className="list-group-item list-group-item-action border-0" id="0-2000" onClick={callReleaseDate}>Before 2000</li>
                        <li className="list-group-item list-group-item-action border-0" id="2001-2010" onClick={callReleaseDate}>Between 2001 and 2010</li>
                        <li className="list-group-item list-group-item-action border-0" id="2011-2020" onClick={callReleaseDate}>Between 2011 and 2020</li>
                        <li className="list-group-item list-group-item-action border-0" id="2020-9999" onClick={callReleaseDate}>After 2020</li>                       
                    </ul>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Special</li>
                        <li className="list-group-item list-group-item-action border-0" onClick={() => specialSearch("title_name", "asc")}>ABC order</li>
                        <li className="list-group-item list-group-item-action border-0" id="number_of_page_name" onClick={specialSearch}>Number of pages in ascending order</li>                       
                        <li className="list-group-item list-group-item-action border-0" id="price_name" onClick={specialSearch}>From the cheapest book</li>
                        <li className="list-group-item list-group-item-action border-0">From the most expensive book</li>
                        
                    </ul>
                    <ul className="list-group mt-4">
                        <li className="list-group-item active border-0 rounded">Publishers</li>
                        <li className="list-group-item list-group-item-action border-0" id="Ad Astra" onClick={publisherSearch}>Ad Astra</li>
                        <li className="list-group-item list-group-item-action border-0" id="Bestline" onClick={publisherSearch}>Bestline</li>                       
                        <li className="list-group-item list-group-item-action border-0" id="Disciplina" onClick={publisherSearch}>Disciplina</li>
                        <li className="list-group-item list-group-item-action border-0" id="ComputerPanorama" onClick={publisherSearch}>ComputerPanorama</li>
                        <li className="list-group-item list-group-item-action border-0" id="ComputerComplex" onClick={publisherSearch}>ComputerComplex</li>
                    </ul>
                </div>
                <div className="w-75 h-100">
                    <div>
                    <select className="form-select" aria-label="Default select example">{/*onChange={(e) => setSelectedBooksGenre(e.target.value)}*/}
                        <option selected>Categories</option>
                        <option value="All">All Books</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="History">History</option>
                        <option value="Horror">Horrror</option>
                        <option value="IT">IT</option>
                    </select> 
                    <select className="form-select" aria-label="Default select example">{/*onChange={(e) => setFilterByPrice(e.target.value)}*/}
                        <option selected>Price</option>
                        <option value="under10">Under 10$</option>
                        <option value="11-20">Between 11$ and 20$</option>
                        <option value="21-30">Between 21$ and 30$</option>
                        <option value="31-40">Between 31$ and 40$</option> 
                        <option value="over40">Over 40$</option> 
                    </select>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Release Date</option>
                        <option value="before2000">Before 2000</option>
                        <option value="between2001and2010">Between 2001 and 2010</option>
                        <option value="between2011and2020">Between 2011 and 2020</option>
                        <option value="after2020">After 2020</option>
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

/*
    useEffect(() => { 
        bookGenreSelection();
    },[selectedBooksGenre])

    useEffect(() => { 
        bookPriceSelection();
    },[filterByPrice])
      
    const bookGenreSelection = () => {

        let filterBooksGenre = allBooks.current

        if(selectedBooksGenre !== "none"){   
            filterBooksGenre = filterBooksGenre.filter(book => book.genre === selectedBooksGenre);
            setVisibleBooks(filterBooksGenre); 
        }
        setVisibleBooks(filterBooksGenre);    
    }

const bookPriceSelection = () => {

    if(filterByPrice === "0-20"){
        const priceBetweenZeroAndTwenty = allBooks.current.filter(book => book.price >= 0 && book.price <= 20);
        setVisibleBooks(priceBetweenZeroAndTwenty);
    }
    else if(filterByPrice === "21-40"){
        const priceBetweenTwentyOneAndFourty = allBooks.current.filter(book => book.price >= 21 && book.price <= 40);
        setVisibleBooks(priceBetweenTwentyOneAndFourty);
    }
    else if(filterByPrice === "41-60"){
        const priceBetweenFourtyOneAndSixty = allBooks.current.filter(book => book.price >= 41 && book.price <= 60);
        setVisibleBooks(priceBetweenFourtyOneAndSixty);
    }
    else if(filterByPrice === "none"){
        setVisibleBooks(allBooks.current)
    }
}
*/