import '../css/Books.css';
import React, { useState, useEffect, useRef } from "react";
import NavigationBar from '../components/NavigationBar.js';

const Books = () => {

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);
    const [selectedBooksGenre, setSelectedBooksGenre] = useState([]);
    const [filterByPrice, setFilterByPrice] = useState("none");
    const [filterByReleaseDate, setFilterByReleaseDate] = useState("none");

    useEffect(() => {  
        fetch("http://localhost:4000/get-all-books")
            .then(data => data.json())
            .then(parsedData => {
                allBooks.current = parsedData;
                setVisibleBooks(parsedData);
            })
    }, [])


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


    return(
        <div>
            <div>
                <NavigationBar/>
            </div>
            <div className="search-site row">
                <div className="search-lists-container w-25 h-100 ps-5">
                    <ul class="list-group mt-4">
                        <li class="list-group-item active border-0 rounded">Categories</li>
                        <li class="list-group-item list-group-item-action border-0">Cooking</li>
                        <li class="list-group-item list-group-item-action border-0">Fantasy</li>
                        <li class="list-group-item list-group-item-action border-0">History</li>
                        <li class="list-group-item list-group-item-action border-0">Horror</li>
                        <li class="list-group-item list-group-item-action border-0">IT</li>                       
                    </ul>
                    <ul class="list-group mt-4">
                        <li class="list-group-item active border-0 rounded">Price</li>
                        <li class="list-group-item list-group-item-action border-0">Under 10$</li>
                        <li class="list-group-item list-group-item-action border-0">Between 11$ and 20$</li>
                        <li class="list-group-item list-group-item-action border-0">Between 21$ and 30$</li>
                        <li class="list-group-item list-group-item-action border-0">Between 31$ and 40$</li>
                        <li class="list-group-item list-group-item-action border-0">Over 40$</li>                       
                    </ul>
                    <ul class="list-group mt-4">
                        <li class="list-group-item active border-0 rounded">Release Date</li>
                        <li class="list-group-item list-group-item-action border-0">Before 2000</li>
                        <li class="list-group-item list-group-item-action border-0">Between 2001 and 2010</li>
                        <li class="list-group-item list-group-item-action border-0">Between 2011 and 2020</li>
                        <li class="list-group-item list-group-item-action border-0">After 2020</li>                       
                    </ul>
                    <ul class="list-group mt-4">
                        <li class="list-group-item active border-0 rounded">Special</li>
                        <li class="list-group-item list-group-item-action border-0"></li>
                        <li class="list-group-item list-group-item-action border-0"></li>
                        <li class="list-group-item list-group-item-action border-0"></li>
                        <li class="list-group-item list-group-item-action border-0"></li>                       
                    </ul>
                </div>
                <div className="w-75 h-100">
                    <div>
                    <select class="form-select" aria-label="Default select example">{/*onChange={(e) => setSelectedBooksGenre(e.target.value)}*/}
                        <option selected>Categories</option>
                        <option value="All">All Books</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="History">History</option>
                        <option value="Horror">Horrror</option>
                        <option value="IT">IT</option>
                    </select> 
                    <select class="form-select" aria-label="Default select example">{/*onChange={(e) => setFilterByPrice(e.target.value)}*/}
                        <option selected>Price</option>
                        <option value="under10">Under 10$</option>
                        <option value="11-20">Between 11$ and 20$</option>
                        <option value="21-30">Between 21$ and 30$</option>
                        <option value="31-40">Between 31$ and 40$</option> 
                        <option value="over40">Over 40$</option> 
                    </select>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Release Date</option>
                        <option value="before2000">Before 2000</option>
                        <option value="between2001and2010">Between 2001 and 2010</option>
                        <option value="between2011and2020">Between 2011 and 2020</option>
                        <option value="after2020">After 2020</option>
                    </select>
                    </div>
                    <div class="row">
                        <div class="input-group col-md-4">
                            <input class="form-control py-2 border-right-0 border" type="search" id="example-search-input"/>
                                <button class="btn btn-outline-secondary border rounded-right" type="button">
                                    <i class="bi bi-search"></i>
                                </button>
                        </div>
                    </div>            
                <div className="d-flex justify-content-center ms-5 mt-5">   
                <div className="row"> 
                <div>    
                    </div> 
                        {
                            visibleBooks.map((book, index) => (
                                <div class="card mb-3 me-1 border-0 " style={{maxWidth: "400px"}}>
                                    <div class="row g-0">
                                        <div class="col-md-5">
                                            <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} class="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="card-body pt-0">
                                                <h5 class="card-text ">{book.title}</h5>
                                                <p class="card-text">{book.author_name}</p>
                                                <h4 class="card-text">{book.price} $</h4>
                                            </div>
                                            <div className="card-body">
                                            <p><i class="bi bi-heart me-1"></i>Add To Wishlist</p>
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