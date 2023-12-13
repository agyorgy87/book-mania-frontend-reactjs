import React from 'react';

const SideBarFilters = (props) => {

    return (
        <div>
            <li className="list-group-item name-of-the-list active border-0 rounded">{props.text}</li>
            {
                props.filter.map((filter) => 
                <li 
                    className="list-group-item list-group-item-action border-0 options-for-filtering" 
                    onClick={filter.filterFunction}>{filter.filterName}
                </li>
                )
            }                                                       
        </div>
    )
}

export default SideBarFilters;