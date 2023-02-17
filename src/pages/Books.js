import React from "react";
import NavigationBar from '../components/NavigationBar.js';

const Books = () => {
    return(
        <div>
            <div>
                <NavigationBar/>
            </div>
            <div>
                <select>
                    <option value="cooking">cooking</option>
                    <option value="fantasy">fantasy</option>
                    <option value="history">history</option>
                    <option value="horror">horror</option>
                    <option value="it">it</option>
                </select>
                <input placeholder="search by title or author"/>
            </div>
        </div>
    )
}

export default Books;