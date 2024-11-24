import '../css/Cart.css';
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import CartBooks from "../components/CartBooks.js";
import OrderSummary from "../components/OrderSummary.js";

const Cart = () => {  

    const [allQuantity, setAllQuantity] = useState(0); 

    return (       
        <div className="cart-page">  
            <div className="fixed-top"> 
                <NavigationBar/>
            </div>
            <div className="container ps-5 pe-5"> 
                <div className="mt-4 mb-3"> 
                    <h1 className="my-cart-text me-2">My Cart</h1>
                    <h4 className="my-cart-items-text">({allQuantity} items)</h4>
                </div>                
                <div>
                    <div className="row">
                        <div className="col-12 col-xl-8"> 
                            <CartBooks setAllQuantity={setAllQuantity}/>
                        </div>                                             
                        <div className="col-12 col-xl-4">
                            <OrderSummary/>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Cart;