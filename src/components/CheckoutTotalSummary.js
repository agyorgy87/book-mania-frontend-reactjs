import { useState, useEffect } from 'react';
import "../css/CheckoutTotalSummary.css";
import { Link } from 'react-router-dom'; 
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { TotalPriceContext } from "../context/TotalPriceContext.js"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutTotalSummary = ({shippingAddress, setOpenModal}) => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const userData = useContext(UserContext);

    const totalPriceData = useContext(TotalPriceContext); 

    const [discountPriceState, setDiscountPriceState] = useState(false);

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    useEffect(() => {

        let discountValue = totalPriceData.value.discountKey;

        if(discountValue !== 0){
            setDiscountPriceState(true)
        }else{
            setDiscountPriceState(false); 
        }

    },[])

    const sendOrderDatas = () => {
        
        let bookDatasToTheDatabase = [];
        
        cartData.value.forEach((obj) => {
            bookDatasToTheDatabase.push({
                id: obj.id,
                title: obj.title,
                quantity: obj.quantity,
                price: obj.price
            });
        });

        let request = {};
        request.books = bookDatasToTheDatabase;
        request.userId = userData.value.id;
        request.address = shippingAddress;
        request.totalPrice = totalPriceData.value.totalPriceKey;
        request.discount = totalPriceData.value.discountKey;

        axios.post(envAndLocal + `/send-order`, request)
            .then(response => {
                setOpenModal(true);
                cartData.setValue([]);
                totalPriceData.setValue({});
        })
    }

    return ( 
        <div className="checkout-total-summary-table"> 
            <div className="text-center items-and-prices-top-text">  
                <p>Books & Prices</p>
            </div>
        <div className="checkout-book-img-title-author-price-container">
            { cartData.value.map((book, index) => ( 
                <div className="mb-4" key={"cart-data-div" + index}>
                    <div className="d-flex checkout-book-img-title-author-price-container"> 
                        <div className="checkout-book-img-container">
                            <img 
                            src={envAndLocal + "/books_img/" + book.img_directory + "/" + book.image}
                            className="checkout-book-pics"                                             
                            alt="book"
                            onClick={() => {navigate("/selectedbook/" + book.id)}}
                            /> 
                        </div>
                        <div className="d-flex flex-column checkout-book-title-author-container pt-3">
                            <div>
                                <Link 
                                className="checkout-book-title"
                                to={"/selectedbook/" + book.id}
                                > 
                                {book.title}
                                </Link>
                            </div> 
                            <div>
                                <p className="checkout-book-author-name mt-2">{book.author_name}</p>
                            </div>
                        </div>
                        <div className="checkout-book-price-multiplier pt-5">
                            <p className="checkout-book-multiplier ms-4 mt-1">x{book.quantity}</p>
                        </div>                                                
                    </div>                                                                                                                 
                </div>
            ))}
            <hr className="dividing-line mt-5"/>
            <div className="d-flex justify-content-center mt-4">
                <div className="checkout-total-container ms-5 me-5">
                    <div className="d-flex justify-content-between">              
                        <p className="checkout-total-discount-text">Total:</p>
                        <p className={`checkout-total-discount-price ${discountPriceState ? "checkout-total-text-decoration" : null }`}>{totalPriceData.value.totalPriceKey} $</p>
                    </div>
                        { totalPriceData.value.discountKey === 0 ?
                            null
                            :
                            <div>
                                <div className="d-flex justify-content-between">
                                    <p className="checkout-total-discount-text">Discount:</p>
                                    <p className="checkout-total-discount-price">- {totalPriceData.value.discountKey} %</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="checkout-total-discount-text">Discounted price:</p>
                                    <p className="checkout-total-discount-price">{totalPriceData.value.discountedPriceKey} $</p>
                                </div>
                            </div>
                        }        
                </div> 
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn checkout-payment-button" onClick={sendOrderDatas}>Payment</button>
            </div> 
        </div>  
    </div>     
    )
}

export default CheckoutTotalSummary;