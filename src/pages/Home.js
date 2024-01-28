import '../css/Home.css';
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from '../components/NavigationBar.js';
import RecommendedBooks from "../components/RecommendedBooks.js";

const Home = () => { 

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

    },[])

    return (
        <div className="home-page">
            <div className="fixed-top">  
                <NavigationBar/>
            </div>  
            <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
                <div className="coupon-card w-75 p-5 text-center shadow-sm">
                    <h1>-20%, -30%, -50% COUPON DISCOUNTS</h1>
                        <div className="mt-4">
                            <p className="card-text discount-font">If you have a coupon code, you can buy books at discount price!</p>
                            <p className="card-text discount-font">You can find the coupon codes in<a href="https://github.com/agyorgy87/book-mania-frontend-reactjs/blob/master/README.md"> my github repository, in CouponCodes.md file</a> :)</p>
                        </div>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
            </div>
            <div className="container">                
                <RecommendedBooks text="Newness" list={newness}/>                 
            </div>
            <div className="container">
                    <RecommendedBooks text="Tolkien's Pen" list={onlyTolkien}/> 
            </div>               
            <div className="container">
                <RecommendedBooks text="Computer Complex Publisher" list={onlyComputerComplex}/>
            </div>
        </div>
    );
}

export default Home;

//style={{ backgroundImage: `url('${"http://localhost:4000/books_img/" + books.img_directory + "/" + books.image}')`}}
