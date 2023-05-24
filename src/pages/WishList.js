import {useEffect, useState} from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import NavigationBar from '../components/NavigationBar.js';

const WishList = () => {

  const userData = useContext(UserContext);

  const [userWishList, setUserWishList] = useState([])

  
  useEffect(() => {
    axios.get("http://localhost:4000/user-wishlist/" + userData.value.id)
        .then(response => {
          setUserWishList(response.data);
        })
  }, [])



  return (
    <div>
        <div>
            <NavigationBar/>
        </div>
        <div>
            wishlist:
            {
              userWishList.map((book, index) => (
                <div key={"userwishlist-div" + index}>
                  {book.title}
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default WishList;