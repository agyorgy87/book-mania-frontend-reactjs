import '../css/SearchInput.css';
import React, { useState } from 'react';
import axios from "axios";

const SearchInput = ({setVisibleBooks, setShowResult, setSearchResult, setGenreSelect, setPriceSelect, setReleaseDateSelect, setSpecialSearchSelect, setPublisherSelect}) => { //{onChange}

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    const [searchInput, setSearchInput] = useState("");

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
            setSearchInput(e.target.value);
        } else {
            axios.get(envAndLocal + "/get-all-books")
             .then((response) => {
                setVisibleBooks(response.data);
            });
            setShowResult(false);
            setSearchResult("");
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value); 
        callAllTitlesAndAuthors(value);
    };

    const handleInputBlur = () => {
        setSearchInput(""); 
    };

    return (
        <div className="input-group mt-3 search-input-container">
            <button className="btn btn-lg search-button" type="button">
                <i className="bi bi-search"></i>
            </button>
                <input 
                    className="form-control search-input" 
                    type="search" 
                    id="example-search-input"
                    value={searchInput}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Search"
                />                           
        </div> 
    )
}

export default SearchInput;