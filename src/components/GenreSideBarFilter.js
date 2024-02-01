import React from 'react';
import '../css/SideBarsStyle.css';


const GenreSideBarFilter = ({options, onFilterClick}) => {
    return (
        <div>
            <li className="list-group-item name-of-the-list active border-0 rounded">Categories</li>
                <li 
                    className="list-group-item list-group-item-action border-0 options-for-filtering" 
                    onClick={() => onFilterClick('allBooks')}>All Books</li> 
                    {
                        options.map((genre, index) => (
                            <li 
                                key={"allgenre-list-div" + index} 
                                className="list-group-item list-group-item-action border-0 options-for-filtering" 
                                onClick={() => onFilterClick(genre.genre_type)}>{genre.genre_type}</li>
                        ))
                    } 
        </div>
    )
}

export default GenreSideBarFilter;