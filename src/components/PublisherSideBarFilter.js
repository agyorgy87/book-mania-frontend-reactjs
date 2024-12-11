import React from 'react';
import axios from "axios";

const PublisherSideBarFilter = ({options, setVisibleBooks, setShowResult}) => { 

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    const scrollToUp = () => {
        window.scrollTo(0, 0)
    }

    const callPublisherWithList = (publisherName) => {
        axios.get(envAndLocal + `/get-all-by-publishers/${publisherName}`)
            .then((response) => {
            setVisibleBooks(response.data);
            })
        setShowResult(false);
        scrollToUp();
    }

return (
    <div>
        <li 
            className="list-group-item name-of-the-list active border-0 rounded">Publishers</li>
            {
                options?.map((publisher, index) => (
                    <li 
                        key={"all-publisher-div" + index} 
                        className="list-group-item list-group-item-action border-0 options-for-filtering" 
                        onClick={() => callPublisherWithList(publisher.publisher_name)}>{publisher.publisher_name}</li>
                ))
            }
    </div>
)}

export default PublisherSideBarFilter;