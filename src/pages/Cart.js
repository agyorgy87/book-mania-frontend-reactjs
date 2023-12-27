import '../css/Cart.css';
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar.js';
//import { useContext } from 'react';
//import { CartContext } from "../context/CartContext";
import CartBooks from "../components/CartBooks.js";
import OrderSummary from "../components/OrderSummary.js";

const Cart = () => {  

    //const cartData = useContext(CartContext);

    const [allQuantity, setAllQuantity] = useState(0);
    
/*
    useEffect(() => {
        let allData = cartData.value
        let sum = 0;
        for(let book of allData) {
            sum += book.quantity
        }    
        setAllQuantity(sum);
    },[allQuantity]);
*/

    return (       
        <div className="cart-page">  
            <div className="fixed-top">
                <NavigationBar/>
            </div>
            <div className="container">
                <div className="mt-4 mb-3"> 
                    <h1 className="my-cart-text me-2">My Cart</h1>
                    <h4 className="my-cart-items-text">({allQuantity} items)</h4>
                </div>                
                <div>
                    <div className="row">
                        <div className="col-12 col-lg-8"> 
                            <CartBooks/>
                        </div>                                             
                        <div className="col-12 col-lg-4">
                            <OrderSummary/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;