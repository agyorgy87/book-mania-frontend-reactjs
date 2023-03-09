export default function Validate (values) {

    let errors = {error: false};

    if(!values.firstName) {
        errors.firstName = "Please enter your First Name"
        errors.error = true
    }

    if(!values.lastName) {
        errors.lastName = "Please enter your Last Name"
        errors.error = true
    }

    if(values.gender === "None") {
        errors.gender = "Please select your gender"
        errors.error = true
    } 

    if(!values.address) {
        errors.address = "Please enter your Address"
        errors.error = true
    }

    if(!values.city) {
        errors.city = "Please enter your City"
        errors.error = true
    }

    if(values.zip.length !== 4) {
        errors.zip = "Please enter your Zip Code"
        errors.error = true
    }
    
    if(!values.email){
        errors.email = "Please enter the Email Address"
        errors.error = true
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Invalid format"
        errors.error = true
    }

    /*
    if(!values.password1) {
        errors.password1 = 'Password is required'
    } else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i.test(values.password1)) {
        errors.password1 = 'The password must contain 8 characters and 1 number'
    }
    
    if(!values.password2) {
        errors.password2 = 'Password is required'
    } else if(values.password2 !== values.password1) {
        errors.password2 = 'Passwords do not match'
    }
    */

   

    return errors;
}