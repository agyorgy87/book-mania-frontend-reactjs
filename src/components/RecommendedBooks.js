import '../css/RecommendedBooks.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import LoginWarning from "../modal/LoginWarning.js";

const RecommendedBooks = (props) => {

    let navigate = useNavigate();

    let listOfRecommendedBooks = props.list

    const userData = useContext(UserContext);

    const [openModal, setOpenModal] = useState(false);
    const [userWishList, setUserWishList] = useState([]);

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    useEffect(() => {
        if(userData.value.jwt) { 
            const fetchData = () => {
                try{
                    axios.get(envAndLocal + "/user-wishlist/" + userData.value.id)
                    .then(response => {
                        setUserWishList(response.data);
                      })
                    }catch (error) {
                        //console.log("Error data:", error);
                    }
            }
            fetchData();
        }
    },[])

    const userFavoritBooksIDsInArray = userWishList.map(item => item.book_id);

    const addBookToWishListFromHomePage = (bookId) => {
        
        if(!userData.value.jwt){
            setOpenModal(true); 
        }else{
            let body = {userId: userData.value.id, bookId: bookId };
            axios.post(envAndLocal + "/add-wishlist", body)
            .then(response => {
                if(response.data.success === true) {
                    setUserWishList([...userWishList, { book_id: bookId }]);
                }
            })
        }   
    }

    const deleteBookFromTheHomePage = (deletedBookId) => {
        let body = {userId: userData.value.id, bookId: deletedBookId};
            axios.post(envAndLocal + "/delete-wishlist", body)
                .then(response => {
                    if(response.data.success === true) {
                        setUserWishList(userWishList.filter(book => book.book_id !== deletedBookId));
                    }
            }) 
    }

    const closeModal = () => { 
        setOpenModal(false);
    }
    
    const modalMessage = "Sign in to add the book to your wish list."
    
    return (
        <div className="container d-flex justify-content-center">   
            <div>
                {openModal && <LoginWarning close={closeModal} message={modalMessage}/>}   
            </div>
            <div className="row d-flex justify-content-center col-md-12 col-lg-10 col-xl-8 col-xxl-12">            
                <div className="mb-3">
                    <h1 className="text-of-recommended-books">{props.text}</h1> 
                </div>   
                        { listOfRecommendedBooks.map((book, index) => (
                            <div className="d-flex flex-column book-card mb-5" key={"newness-div" + index}>
                                <div className="d-flex justify-content-center mb-4 mt-4">
                                    <img 
                                    src={envAndLocal + "/books_img/" + book.img_directory + "/" + book.image} 
                                    className="img-fluid home-book-pics shadow"                                             
                                    onClick={() => {navigate("/selectedbook/" + book.id)}}
                                    alt="book"
                                    />                                        
                                </div>
                                <div className="d-flex flex-column">                      
                                    <div className="d-flex ps-2 pe-2">
                                        <Link 
                                        className="home-book-title" 
                                        to={"/selectedbook/" + book.id}
                                        >                                      
                                        { book.title.length > 26 ? book.title.substring(0,28) + " ..." : book.title }                                                                                        
                                        </Link>
                                    </div>
                                    <div className="d-flex ps-2 pe-2 mt-2">
                                        <p className="home-author-name">{book.author_name}</p>
                                    </div>                                                                                                                                                                  
                                </div> 
                                <div className="d-flex justify-content-between ps-2 pe-2 book-price-heart-container pb-2">                                       
                                        <div>
                                            <p className="home-value-of-the-book">{book.price} $</p>
                                        </div>                                       
                                        <div className="d-flex align-items-center">
                                            { userFavoritBooksIDsInArray.includes(book.id) ?
                                                <button 
                                                className="heart-button" 
                                                onClick={() => deleteBookFromTheHomePage(book.id)}
                                                >
                                                    <AiFillHeart className="book-heart-icon-full"/>
                                                </button>
                                            :
                                                <button 
                                                className="heart-button" 
                                                onClick={() => addBookToWishListFromHomePage(book.id)}>
                                                    <AiOutlineHeart className="book-heart-icon"/>
                                                </button>
                                            }                                                                        
                                        </div>                                                                                         
                                </div>                                           
                            </div>                                        
                            ))
                        }                                         
            </div>
        </div>
    )
}

export default RecommendedBooks;