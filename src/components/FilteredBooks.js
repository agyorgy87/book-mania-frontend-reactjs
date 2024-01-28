import '../css/FilteredBooks.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
//import { AiOutlineHeart } from "react-icons/ai";
//import { AiFillHeart } from "react-icons/ai";
//import { useContext } from 'react';
//import { UserContext } from "../context/UserContext.js";
import LoginWarning from "../modal/LoginWarning.js";

const FilteredBooks = (props) => {  

    let navigate = useNavigate();

    let listOfBooks = props.list

    //const userData = useContext(UserContext);

    const [openModal, setOpenModal] = useState(false);
    //const [fullOrEmptyHeart, setFullOrEmptyHeart] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    }
/*
    const [userWishList, setUserWishList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/user-wishlist/" + userData.value.id)
            .then(response => {
            setUserWishList(response.data);
            })
    }, [])

    const addBookToWishListFromHomePage = (bookId) => {

        let nameOfTheWishListBookId = "book_id";
        let allBookIdInTheWishList = userWishList.map((book) => book[nameOfTheWishListBookId]);
        let bookIdSearchAnswer = allBookIdInTheWishList.includes(bookId);

        if(!userData.value.jwt){
            setOpenModal(true); 
        }else if(bookIdSearchAnswer){
            alert("yes include")
        }else{
            let body = {userId: userData.value.id, bookId: bookId };
                axios.post("http://localhost:4000/add-wishlist", body)
                    .then(response => {
                        if(response.data.success === true) {
                        //console.log(response.data);
                        setFullOrEmptyHeart(true);
                    }
            })
        }   
    }
*/

    const modalMessage = "?"; 
    //col-md-4 col-lg-3 col-xl-3 col-xxl-2 
    return ( 
        <div className="container d-flex justify-content-center filtered-book-container"> 
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
                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} 
                                className="img-fluid filtered-book-pics shadow"                                             
                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column ps-4 pe-4">                      
                                <div className="d-flex">
                                    <Link 
                                    className="filtered-book-title"
                                    to={"/selectedbook/" + book.id}
                                    >                                      
                                    { book.title.length > 17 ? book.title.substring(0,23) + " ..." : book.title }                                                                                        
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