import {useState} from 'react';

const useForm = validate => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        gender: 'None',
        address: '',
        city: '',
        zip: '',
        email: '',
        password: '',
        passwordAgain: '',
        dataProtection: "false"
    })
    
    const [errors, setErrors] = useState({});
    
    const handleChange = e => {
        const { name,value } = e.target
        setValues({
            ...values,
            [name]: value 
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
    };

    console.log(values);

    return {handleChange, values, handleSubmit, errors};
};

export default useForm;