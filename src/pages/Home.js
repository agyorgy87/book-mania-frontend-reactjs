import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { BookContext } from "../context/BookContext.js";
import { AiOutlineHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import axios from "axios";

const Home = () => {

    const bookDetails = useContext(BookContext);

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
            <div>
                <NavigationBar/>
            </div>          
            <div className="container mt-5 d-flex justify-content-center align-items-center">
                <div className="coupon-card w-75 p-5 text-center shadow">
                    <h1>50% COUPON DISCOUNT</h1>
                        <div>
                            <p className="card-text discount-font">If you have a coupon code, you can buy books at half price!</p>
                            <p className="card-text discount-font">You can find the coupon code in <a href="https://github.com/agyorgy87/book-mania-frontend-reactjs/blob/master/README.md"> my github repository, in CC.md file</a> :)</p>
                        </div>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
            </div>
          
            <div className="cream-bg mt-5">
                <div className="container">
                    <div className="row g-3 justify-content-evenly">
                        <div>
                        <h1 className="ps-5 text-of-recommended-books">Newness</h1> 
                        </div>
                            { newness.map((book, index) => (
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-6 col-md-5">
                                        <img 
                                        src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} 
                                        className="card-img img-fluid rounded-left" 
                                        alt="book"/>
                                    </div>
                                    <div className="col-6 col-md-7">
                                        <div className="card-body d-flex flex-column">
                                            <div className="h-100">
                                                <h6 className="card-title">{book.title}</h6>
                                                <p className="card-text">{book.author_name}</p>
                                                <h6 className="card-text"><strong>{book.price} $</strong></h6>
                                            </div>
                                            <div>
                                                <button type="button" className="btn btn-primary">
                                                < CgShoppingCart className="fs-5 me-2 cart-icon"/>
                                                    Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                ))
                            }
                    </div>
                </div>
            </div>                  
            <div>
                <div className="d-flex flex-row"> 
                    <h1 className="ps-5 text-of-recommended-books">Newness</h1>    
                </div> 
                <div className="row"> 
                {
                            newness.map((book, index) => (       
                <div class="card mb-3" >
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                        </div>
                    </div>
                    </div>
                    ))
                }
                </div>
            </div>
            
            {/*
                    <div className="d-flex justify-content-around ps-5 col-xl-">
                        {
                            newness.map((book, index) => (
                                <div className="card mb-3 border-0">
                                    <div className="row g-0">
                                        <div className="col-md-5">
                                            <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} className="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card-body pt-0">
                                                <h5 className="card-text ">{book.title}</h5>
                                                <p className="card-text">{book.author_name}</p>
                                                <h4 className="card-text">{book.price} $</h4>
                                            </div>
                                            <div className="card-body">
                                            <p><i className="bi bi-heart me-1"></i>Add To Wishlist</p>
                                            {/*<i class="bi bi-heart"></i> -> filled heart icon
                                            <button type="button" className="add-to-cart-buttons">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>  
                        */}
            <div className="row"> 
                <div> 
                    <h1 className="d-flex flex-row ps-5">From Tolkien's Pen</h1>    
                </div> 
                    <div className="d-flex justify-content-around">
                        {
                            onlyTolkien.map((book, index) => (
                                <div className="card mb-3 border-0 w-25" style={{maxWidth: "100vh"}}>
                                    <div className="row g-0">
                                        <div className="col-md-5">
                                            <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} className="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card-body pt-0">
                                                <h5 className="card-text ">{book.title}</h5>
                                                <p className="card-text">{book.author_name}</p>
                                                <h4 className="card-text">{book.price} $</h4>Name
                                            </div>
                                            <div className="card-body">
                                            <p><i className="bi bi-heart me-1"></i>Add To Wishlist</p>
                                            {/*<i class="bi bi-heart"></i> -> filled heart icon*/}
                                            <button type="button" className="add-to-cart-buttons">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            </div>
            <div className="row"> 
                <div> 
                    <h1 className="d-flex flex-row ps-5">From Computer Complex Publisher</h1>    
                </div> 
                    <div className="d-flex justify-content-around ps-5 col-xl-">
                        {
                            onlyComputerComplex.map((book, index) => (
                                <div className="card mb-3 border-0 " style={{maxWidth: "100vh"}}>
                                    <div className="row g-0">
                                        <div className="col-md-5">
                                            <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} className="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card-body pt-0">
                                                <h5 className="card-text ">{book.title}</h5>
                                                <p className="card-text">{book.author_name}</p>
                                                <h4 className="card-text">{book.price} $</h4>
                                            </div>
                                            <div className="card-body">
                                            <p><i className="bi bi-heart me-1"></i>Add To Wishlist</p>
                                            {/*<i class="bi bi-heart"></i> -> filled heart icon*/}
                                            <button type="button" className="add-to-cart-buttons">Add To Cart</button>
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

