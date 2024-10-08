import '../css/SearchInput.css';
import React from 'react';

const SearchInput = ( {onChange} ) => { 

    return (
        <div className="input-group mt-3 search-input-container">
            <button className="btn btn-lg search-button" type="button">
                <i className="bi bi-search"></i>
            </button>
                <input 
                    className="form-control search-input" 
                    type="search" 
                    id="example-search-input"
                    onChange={(e) => onChange(e.target.value)} 
                    placeholder="Search by title or author"
                />                           
        </div> 
  )
}

export default SearchInput;