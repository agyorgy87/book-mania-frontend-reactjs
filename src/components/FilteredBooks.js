import '../css/FilteredBooks.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import LoginWarning from "../modal/LoginWarning.js";

const FilteredBooks = (props) => {  

    let navigate = useNavigate();

    let listOfBooks = props.list

    const [openModal, setOpenModal] = useState(false);


    const closeModal = () => {
        setOpenModal(false);
    }
 
    const modalMessage = "?"; 

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    return ( 
        <div className="ps-5 pe-5"> 
            <div>
                {openModal && <LoginWarning close={closeModal} message={modalMessage}/>}   
            </div>
            <div className="row"> 
                { listOfBooks.map((book, index) => ( 
                    <div key={"newness-div" + index} 
                    className="filtered-book-card-container col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-5">
                        <div className="d-flex flex-column filtered-book-card">
                            <div className="d-flex justify-content-center mb-4 mt-4">
                                <img 
                                src={envAndLocal + "/books_img/" + book.img_directory + "/" + book.image} 
                                className="img-fluid filtered-book-pics shadow"                                             
                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column ps-4 pe-4">                      
                                <div className="d-flex filtered-book-title-container">
                                    <Link 
                                    className="filtered-book-title"
                                    to={"/selectedbook/" + book.id}
                                    >  
                                    {book.title}                                                              
                                    {/*{ book.title.length > 17 ? book.title.substring(0,22) + " ..." : book.title }*/}                                                                                     
                                    </Link>
                                </div>
                                <div className="d-flex mt-2">
                                    <p className="filtered-author-name">{book.author_name}</p>
                                </div>                                                                                                                                                                  
                            </div> 
                            <div className="d-flex ps-4">                                              
                                <p className="filtered-book-price">{book.price} $</p>                                                                                                                                                   
                            </div>                                           
                        </div>    
                    </div>                                    
                ))}
                
            </div>
        </div>
    )
}

export default FilteredBooks;