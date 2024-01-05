import { useEffect, useState } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";

const CheckoutShippingAndDelivery = () => {

    const [firstNameInputValue, setFirstNameInputValue] = useState("");
    const [lastNameInputValue, setLastNameInputValue] = useState("");
    const [addressInputValue, setAddressInputValue] = useState("");
    const [cityInputValue, setCityInputValue] = useState("");
    const [zipCodeInputValue, setZipCodeInputValue] = useState("");

    const userData = useContext(UserContext);
    let userDataId = userData.value.id;

    //console.log(userAllData);

    useEffect(() => {
        axios.get(`http://localhost:4000/get-registered-user/${userDataId}`)
            .then(response => {
                const userData = response.data[0];
                if(userData) {
                    setFirstNameInputValue(userData.first_name);
                    setLastNameInputValue(userData.last_name);
                    setAddressInputValue(userData.address);
                    setCityInputValue(userData.city);
                    setZipCodeInputValue(userData.zip_code);
                }
            })
            .catch(error => {
                console.log("Error message:", error);
            })
    },[]);

    const firstNameInputChange = (e) => {
        setFirstNameInputValue(e.target.value);
    }

    const lastNameInputChange = (e) => {
        setLastNameInputValue(e.target.value);
    }

    const addressInputChange = (e) => {
        setAddressInputValue(e.target.value);
    }

    const cityInputChange = (e) => {
        setCityInputValue(e.target.value);
    }

    const zipCodeInputChange = (e) => {
        setZipCodeInputValue(e.target.value);
    }


    return ( 
        <div>
            <form>
                <div>
                    <label>First Name</label>
                        <div>
                            <input
                            value={firstNameInputValue}
                            onChange={firstNameInputChange}
                            />
                        </div>
                </div>
                <div>
                    <label>Last Name</label>
                        <div>
                            <input
                            value={lastNameInputValue}
                            onChange={lastNameInputChange}
                            />
                        </div>
                </div>
                <div>
                    <label>Address</label>
                        <div>
                            <input
                            value={addressInputValue}
                            onChange={addressInputChange}
                            />
                        </div>
                </div>
                <div>
                    <label>City</label>
                        <div>
                            <input
                            value={cityInputValue}
                            onChange={cityInputChange}
                            />
                        </div>
                </div>
                <div>
                    <label>Zip Code</label>
                        <div>
                            <input
                            value={zipCodeInputValue}
                            onChange={zipCodeInputChange}
                            />
                        </div>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutShippingAndDelivery;
