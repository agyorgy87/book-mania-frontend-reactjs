import React from 'react';
import '../css/SideBarsStyle.css';
import axios from "axios";


const GenreSideBarFilter = ({options, setVisibleBooks, setShowResult}) => {

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    const scrollToUp = () => {
        window.scrollTo(0, 0)
    }

    const getAllBooks = () => {
        axios.get(envAndLocal + "/get-all-books")
             .then((response) => {
                setVisibleBooks(response.data);
        });
        setShowResult(false);
    }

    const callGenreWithList = (genreName) => {
        if(genreName === "allBooks"){
            getAllBooks();
        }else{
            axios.get(envAndLocal + `/get-all-by-genre/"${genreName}"`)
            .then((response) => {
            setVisibleBooks(response.data);
        })
        }  
        setShowResult(false);  
        scrollToUp();
    }

    return (
        <div>
            <li className="list-group-item name-of-the-list active border-0 rounded">Categories</li>
                <li 
                    className="list-group-item list-group-item-action border-0 options-for-filtering" 
                    onClick={() => callGenreWithList('allBooks')}>All Books</li> 
                    {
                        options.map((genre, index) => (
                            <li 
                                key={"allgenre-list-div" + index} 
                                className="list-group-item list-group-item-action border-0 options-for-filtering" 
                                onClick={() => callGenreWithList(genre.genre_type)}>{genre.genre_type}</li>
                        ))
                    } 
        </div>
    )
}

export default GenreSideBarFilter;