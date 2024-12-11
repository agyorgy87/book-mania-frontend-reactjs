import '../css/SearchInput.css';
import React from 'react';
import axios from "axios";

const SearchInput = ({setVisibleBooks, setShowResult, setSearchResult, setGenreSelect, setPriceSelect, setReleaseDateSelect, setSpecialSearchSelect, setPublisherSelect}) => { //{onChange}

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    const callAllTitlesAndAuthors = (e) => {
        if (e.trim() !== "") {
            axios.get(envAndLocal + `/get-book-title/${e}`)
                .then((response) => {
                    setVisibleBooks(response.data);
                })
                .catch((error) => {
                    //console.error("Error fetching book titles:", error);
                });
            setShowResult(true);
            setSearchResult(e);
            setGenreSelect("");
            setPriceSelect("");
            setReleaseDateSelect("");
            setSpecialSearchSelect("");
            setPublisherSelect("");
        } else {
            axios.get(envAndLocal + "/get-all-books")
             .then((response) => {
                setVisibleBooks(response.data);
            });
            setShowResult(false);
            setSearchResult("");
        }
    }

    return (
        <div className="input-group mt-3 search-input-container">
            <button className="btn btn-lg search-button" type="button">
                <i className="bi bi-search"></i>
            </button>
                <input 
                    className="form-control search-input" 
                    type="search" 
                    id="example-search-input"
                    onChange={(e) => callAllTitlesAndAuthors(e.target.value)} 
                    placeholder="Search by title or author"
                />                           
        </div> 
  )
}

export default SearchInput;