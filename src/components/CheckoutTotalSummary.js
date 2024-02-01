import { useState, useEffect } from 'react';
import "../css/CheckoutTotalSummary.css";
import { Link } from 'react-router-dom'; 
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { TotalPriceContext } from "../context/TotalPriceContext.js"; 
import { useNavigate } from "react-router-dom";

const CheckoutTotalSummary = (props) => {

    let navigate = useNavigate();

    const cartData = useContext(CartContext);

    const totalPriceData = useContext(TotalPriceContext); 

    const [discountPriceState, setDiscountPriceState] = useState(false);

    useEffect(() => {
        let discountValue = totalPriceData.value.discountKey;
        if(discountValue !== 0){
            setDiscountPriceState(true)
        }else{
            setDiscountPriceState(false);
        }
    },[])

    

    const sendOrderDatas = () => {
        
        let bookDatasToTheDatabase = {};

        cartData.value.forEach((obj, index) => {
            bookDatasToTheDatabase[index] = {
              title: obj.title,
              quantity: obj.quantity,
              price: obj.price
            };
        });
        console.log(bookDatasToTheDatabase);
        
        console.log(props.userShippingAddress);
    }

    return (
        <div className="checkout-total-summary-container">
            <div className="mt-3 text-center items-and-prices-top-text"> 
                <p>Items & Prices</p>
            </div>
        <div className="pt-3">
            { cartData.value.map((book, index) => ( 
                <div className="mb-4" key={"cart-data-div" + index}>
                    <div className="d-flex checkout-bookimg-title-author-multiplier-contanier"> 
                        <div className="checkout-book-img-container">
                            <img 
                            src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image}
                            className="checkout-book-pics mt-2"                                             
                            alt="book"
                            onClick={() => {navigate("/selectedbook/" + book.id)}}
                            /> 
                        </div>
                        <div className="mt-2 checkout-title-multiplier-author-container">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Link 
                                    className="checkout-book-title"
                                    to={"/selectedbook/" + book.id}
                                    > 
                                    {book.title}
                                    </Link>
                                </div>
                                <div>
                                    <p className="checkout-book-multiplier ms-4 mt-1">x{book.quantity}</p>
                                </div>
                            </div>
                            <p className="checkout-book-author-name mt-2">{book.author_name}</p>
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