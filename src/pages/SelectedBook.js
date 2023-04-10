import React from 'react';
import { useContext } from 'react';
import { BookContext } from "../context/BookContext.js";
import NavigationBar from '../components/NavigationBar.js';

const SelectedBook = () => {

    const bookDetails = useContext(BookContext);

    console.log(bookDetails);

    return (
        <div>
            <div>
                <NavigationBar/>
            </div> 
            <div>
                <div className="mw-100" src={`${bookDetails.value.image_big}`}>
                    
                </div>
            </div>
        </div>
    )
}

export default SelectedBook