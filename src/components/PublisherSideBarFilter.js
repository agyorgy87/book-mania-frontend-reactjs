import React from 'react';

const PublisherSideBarFilter = ({options, onFilterClick}) => { 
  return (
    <div>
        <li 
            className="list-group-item name-of-the-list active border-0 rounded">Publishers</li>
            {
                options?.map((publisher, index) => (
                    <li 
                        key={"all-publisher-div" + index} 
                        className="list-group-item list-group-item-action border-0 options-for-filtering" 
                        onClick={() => onFilterClick(publisher.publisher_name)}>{publisher.publisher_name}</li>
                ))
            }
    </div>
  )
}

export default PublisherSideBarFilter;