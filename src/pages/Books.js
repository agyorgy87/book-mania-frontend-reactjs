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

    }, [visibleBooks])


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
            <div> 
                <select onChange={(e) => setSelectedBooksGenre(e.target.value)}>
                    <option value="none">ALL BOOKS</option>
                    <option value="Cooking">COOKING</option>
                    <option value="Fantasy">FANTASY</option>
                    <option value="History">HISTORY</option>
                    <option value="Horror">HORROR</option>
                    <option value="IT">IT</option>
                </select>
                <div> 
                <select onChange={(e) => setFilterByPrice(e.target.value)}>
                    <option value="none">Filter By Price</option>
                    <option value="0-20">0-20</option>
                    <option value="21-40">21-40</option>
                    <option value="41-60">41-60</option>  
                </select>
            </div>
            <div> 
                <select>
                    <option value="none">filter by Publication Date</option>
                    <option value="Cooking"></option>
                    <option value="Fantasy"></option>
                    <option value="History"></option>
                    <option value="Horror"></option>
                    <option value="IT"></option>
                </select>
            </div>
            </div>
                <input placeholder="search by title or author"/>
            <div className="visible-movies-container">
                {
                    visibleBooks.map( book => (
                        <div>  
                            <img 
                                src={"http://localhost:4000/books_img/" + book.image}
                                className="movies-movie-icons"
                                alt="book"                             
                                />
                            {book.title}
                            {book.genre}
                            {book.author_name}
                        </div> 
                                ))
                            }
                    </div> 
        </div>
    )
}

export default Books;