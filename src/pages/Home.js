import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";

const Home = () => {

    let navigate = useNavigate();

    const [newness, setNewness] = useState([]); 
    const [onlyTolkien, setOnlyTolkien] = useState([]);
    const [onlyComputerComplex, setOnlyComputerComplex] = useState([]);

    useEffect(() => {  

        axios.get("http://localhost:4000/get-all-by-newness/1")
            .then(response => {
                setNewness(response.data)
            })

        axios.get("http://localhost:4000/get-all-by-author/J.R.R.%20Tolkien")
            .then(response => {
                setOnlyTolkien(response.data)
            })

        axios.get(`http://localhost:4000/get-all-by-publishers/ComputerComplex`)
            .then(response => {
                setOnlyComputerComplex(response.data)
        })

    }, [])

    return (
        <div className="home-page">
            <div className="fixed-top">
                <NavigationBar/>
            </div>          
            <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
                <div className="coupon-card w-75 p-5 text-center shadow-sm">
                    <h1>50% COUPON DISCOUNT</h1>
                        <div>
                            <p className="card-text discount-font">If you have a coupon code, you can buy books at half price!</p>
                            <p className="card-text discount-font">You can find the coupon code in <a href="https://github.com/agyorgy87/book-mania-frontend-reactjs/blob/master/README.md"> my github repository, in CC.md file</a> :)</p>
                        </div>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
            </div>
            <div className="container">
                <div className="mb-3">
                    <h1 className="text-of-recommended-books">Newness</h1> 
                </div>
                <div className="row">
                    { newness.map((book, index) => (
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-5" key={"newness-div" + index}>
                            <div className="mb-2">
                                <img 
                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                className="img-fluid book-pics"                                             
                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column">                      
                                <div className="book-title-container">
                                    <h6 
                                    className="book-title"
                                    onClick={() => {navigate("/selectedbook/" + book.id)}}
                                    >                                      
                                    {book.title}
                                    </h6>
                                </div>
                                <div>
                                    <div>
                                        <p className="author-name">{book.author_name}</p>
                                    </div>
                                    <div>
                                        <h5 className="value-of-the-book">{book.price} $</h5>
                                    </div>                                                     
                                    <div>
                                        <button type="button" className="home-add-to-cart-buttons">                                                           
                                            Add To Cart
                                                <CgShoppingCart className="fs-5 ms-2 cart-icon"/>
                                        </button>
                                    </div>
                                </div>                                                                                              
                            </div>           
                        </div>                                        
                        ))
                    }
                </div>
            </div>               
            <div className="container">
                <div className="mb-3">
                    <h1 className="text-of-recommended-books">Tolkien's Pen</h1> 
                </div>
                <div className="row">
                    { onlyTolkien.map((book, index) => (
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-5" key={"tolkien-div" + index}>
                            <div className="mb-2">
                                <img 
                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                className="img-fluid book-pics"                                             
                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column">                     
                                <div className="book-title-container">
                                    <h6 
                                    className="book-title"
                                    onClick={() => {navigate("/selectedbook/" + book.id)}}
                                    >                                      
                                    {book.title}
                                    </h6>
                                </div>
                                <div>
                                    <div>
                                        <p className="author-name">{book.author_name}</p>
                                    </div>
                                    <div>
                                        <h5 className="value-of-the-book">{book.price} $</h5>
                                    </div>                                                     
                                    <div>
                                        <button type="button" className="home-add-to-cart-buttons">                   
                                            Add To Cart
                                                <CgShoppingCart className="fs-5 ms-2 cart-icon"/>
                                        </button>
                                    </div>
                                </div>                                                                                              
                            </div>           
                        </div>                                        
                        ))
                    }
                </div>
            </div>
            <div className="container">
                <div className="mb-3">
                    <h1 className="text-of-recommended-books">Computer Complex Publisher</h1> 
                </div>
                <div className="row">
                    { onlyComputerComplex.map((book, index) => (
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-5" key={"computer-complex-div" + index}>
                            <div className="mb-2 book-image-container">
                                <img 
                                src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                                className="img-fluid book-pics"                                             
                                onClick={() => {navigate("/selectedbook/" + book.id)}}
                                alt="book"
                                />                                        
                            </div>
                            <div className="d-flex flex-column">                     
                                <div className="book-title-container">
                                    {/*Link*/}
                                    <h6 
                                    className="book-title"
                                    onClick={() => {navigate("/selectedbook/" + book.id)}}
                                    >                                      
                                    {book.title}
                                    </h6>
                                </div>
                                <div>
                                    <div>
                                        <p className="author-name">{book.author_name}</p>
                                    </div>
                                    <div>
                                        <h5 className="value-of-the-book">{book.price} $</h5>
                                    </div>                                                     
                                    <div>
                                        <button type="button" className="home-add-to-cart-buttons">                                        
                                            Add To Cart
                                                <CgShoppingCart className="fs-5 ms-2 cart-icon"/>
                                        </button>
                                    </div>
                                </div>                                                                                              
                            </div>           
                        </div>                                        
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;

//style={{ backgroundImage: `url('${"http://localhost:4000/books_img/" + books.img_directory + "/" + books.image}')`}}
