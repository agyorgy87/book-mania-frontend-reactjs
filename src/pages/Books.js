import React, { useState, useEffect, useRef } from "react";
import NavigationBar from '../components/NavigationBar.js';

const Books = () => {

    const allBooks = useRef([]);
    const [visibleBooks, setVisibleBooks] = useState([]);
    const [selectedBooksGenre, setSelectedBooksGenre] = useState([]);

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
      
    
    const bookGenreSelection = () => {

        let filterBooksGenre = allBooks.current
        console.log(filterBooksGenre);
        if(selectedBooksGenre !== "none"){   
            filterBooksGenre = filterBooksGenre.filter(book => book.genre === selectedBooksGenre);
            setVisibleBooks(filterBooksGenre); 
        }
        setVisibleBooks(filterBooksGenre);    
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