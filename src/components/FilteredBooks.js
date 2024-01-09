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

    const modalMessage = "?"

    return ( 
        <div className="container"> 
            <div>
                {openModal && <LoginWarning close={closeModal} message={modalMessage}/>}   
            </div>
            <div className="row ms-5">
                { listOfBooks.map((book, index) => (
                    <div className="col-md-4 col-lg-3 col-xl-3 col-xxl-2 d-flex flex-column filtered-book-card mb-5" key={"newness-div" + index}>
                        <div className="d-flex justify-content-center mb-4 mt-4">
                            <img 
                            src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} 
                            className="img-fluid filtered-book-pics shadow"                                             
                            onClick={() => {navigate("/selectedbook/" + book.id)}}
                            alt="book"
                            />                                        
                        </div>
                        <div className="d-flex flex-column">                      
                            <div className="d-flex ps-2 pe-2">
                                <Link 
                                className="filtered-book-title"
                                to={"/selectedbook/" + book.id}
                                >                                      
                                    { book.title.length > 17 ? book.title.substring(0,19) + " ..." : book.title }                                                                                        
                                </Link>
                            </div>
                            <div className="d-flex ps-2 pe-2 mt-2">
                                <p className="filtered-author-name">{book.author_name}</p>
                            </div>                                                                                                                                                                  
                        </div> 
                        <div className="d-flex justify-content-between ps-4 pe-5 filtered-book-price-heart-container">                                       
                            <div>
                                <p className="filtered-value-of-the-book">{book.price} $</p>
                            </div>                                       
                                <div>
                                    {/*
                                    <button 
                                    className="heart-button" 
                                    >{/*onClick={() => addBookToWishListFromHomePage(book.id)} 
                                    <AiOutlineHeart className="book-heart-icon"/>                                            
                                    </button>
                                    */}
                                    {/* 
                                    { fullOrEmptyHeart ?
                                    <AiFillHeart className="book-heart-icon-full"/>
                                    :
                                    <AiOutlineHeart className="book-heart-icon"/>
                                    }
                                    */}
                                    {/*
                                    {fullOrEmptyHeart ?
                                    <button className="heart-button" onClick={addBookToWishListFromHomePage}><AiFillHeart className="book-heart-icon-full"/></button>
                                    :
                                    <button className="heart-button" onClick={() => addBookToWishListFromHomePage(book.id)}></button>
                                    }
                                    */}
                                </div>                                                                                         
                        </div>                                           
                    </div>                                        
                ))}
            </div>
        </div>
    )

}

export default FilteredBooks;