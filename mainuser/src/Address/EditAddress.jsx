import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Address from './address.png'

const EditAddress = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedAddress, setIsFocusedAddress] = useState(false);
    const [isFocusedNumber, setIsFocusedNumber] = useState(false);
    const [isFocusedArea, setIsFocusedArea] = useState(false);
    const [isFocusedLandmark, setIsFocusedLandmark] = useState(false);
    const [isFocusedPincode, setIsFocusedPincode] = useState(false);
    const [isFocusedCity, setIsFocusedCity] = useState(false);
    const [isFocusedState, setIsFocusedState] = useState(false);
    const navigate = useNavigate()
    const [authUser, setAuthUser] = useState()
    const [confirm, setConfirm] = useState('')
    const [formErrors, setFormErrors] = useState({});
    const [email,setEmail] = useState()
    const urlParams = new URLSearchParams(window.location.search);
    
    const addressId = urlParams.get('addressId');
    
    useEffect(() => {
        getAddress()

    }, []);
    const initialValues = {
        fullName: '',
        address: '',
        number: '',
        area: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
    };
    const [formValues, setFormValues] = useState({
        fullName: '',
        address: '',
        number: '',
        area: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
    });

    const getAddress =async()=>{
        const data = new FormData()
        data.append('address_id',addressId)

        const response = await fetch('http://localhost:8000/api/getaddress',{method:"POST",body:data})
        if(response.ok){
            const responseData = await response.json()
            console.log("address",responseData[0]?.id)
            const initialValues = {
                fullName: responseData[0]?.fullName,
                address: responseData[0]?.address,
                number: responseData[0]?.phoneNum,
                area: responseData[0]?.area,
                landmark: responseData[0]?.landmark,
                pincode: responseData[0]?.pincode,
                city: responseData[0]?.city,
                state: responseData[0]?.state,
            };
            
            setFormValues(initialValues)
    
        }
    }


    //initial values 
    
    //const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        checkAuth()

    }, []);


    const checkAuth = async () => {
        const data = new FormData()

        data.append('token', localStorage.getItem('authToken'))
        const response = await fetch('http://localhost:8000/api/verifyuser', { method: "POST", body: data })
        const responseData = await response.json()
        if (responseData.authuser === 'false') {

            navigate('/Login')
            setAuthUser(false)

        }
        else {
            setAuthUser(true)
            setEmail(responseData.userEmail)
            
        }
    }

    useEffect(() => {
        setFormErrors(validate(formValues));

        if(formValues.address !== ''){
          setIsFocusedAddress(true)
        }
        if(formValues.fullName !== ''){
          setIsFocused(true)
        }
        if(formValues.number !== ''){
          setIsFocusedNumber(true)
        }
        if(formValues.area !== ''){
            setIsFocusedArea(true)
          }if(formValues.landmark !== ''){
            setIsFocusedLandmark(true)
          }if(formValues.pincode !== ''){
            setIsFocusedPincode(true)
          }
          if(formValues.area !== ''){
            setIsFocusedArea(true)
          }
          if(formValues.city !== ''){
            setIsFocusedCity(true)
          }
          if(formValues.state !== ''){
            setIsFocusedState(true)
          }
    }, [formValues]);

    useEffect(() => {
        if(formValues.number>0){
            handleNumberBlur()

        }
    }, [formValues.number]);

    useEffect(() => {
        if(formValues.pincode>0 ){
            handlePincodeBlur()

        }
        
        
    }, [formValues.pincode]);

    const validate = (values) => {
        const errors = {};

        if (!values.address) {
            errors.address = 'Address required!';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)
            
        }

        if (!values.fullName) {
            errors.fullName = 'Full Name required!';
            setConfirm(false)
            return errors
        }
        else {
            setConfirm(true)
            
        }

        if (!values.number) {
            errors.number = 'Phone number required';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)

        }

        if (!values.area) {
            errors.area = 'Area required!';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)

        }

        if (!values.landmark) {
            errors.landmark = 'Landmark required';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)

        }

   
        if (!values.pincode) {
            errors.pincode = 'pincode required';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)

        }

        if (!values.city) {
            errors.city = 'city name required';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)

        }

        if (!values.state) {
            errors.state = 'state name required';
            setConfirm(false)
            return errors

        }
        else {
            setConfirm(true)

        }

        setFormErrors(errors)
        return errors;
    };


    //handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Function to sanitize the input and keep only digits
        const sanitizeInput = (input, maxLength) => {
            const numericValue = input.replace(/\D/g, '').slice(0, maxLength);
            return numericValue;
        };
    
        // Object to define character limits for specific fields
        const characterLimits = {
            number: 10,
            pincode: 6,
            address: 100,
            area: 50,
            landmark: 50,
            city: 20,
            state: 20,
        };
    
        if (name === 'number' || name === 'pincode') {
            // Sanitize "number" and "pincode" inputs to allow only digits with specified limits
            const numericValue = sanitizeInput(value, characterLimits[name]);
            setFormValues({ ...formValues, [name]: numericValue });
        } else {
            // For other fields, allow both letters and digits with their respective limits
            const maxLength = characterLimits[name] || 100; // Default limit to 100 if not specified
            const sanitizedValue = value.slice(0, maxLength);
            setFormValues({ ...formValues, [name]: sanitizedValue });
        }
    };
    
    


    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        
        if(Object.keys(formErrors).length === 0){

            const userAddress = new FormData()
            userAddress.append('address_id',addressId)
            userAddress.append('email',email)
            userAddress.append('address',formValues.address)
            userAddress.append('fullName',formValues.fullName)
            userAddress.append('phoneNum',formValues.number)
            userAddress.append('area',formValues.area)
            userAddress.append('landmark',formValues.landmark)
            userAddress.append('pincode',formValues.pincode)
            userAddress.append('city',formValues.city)
            userAddress.append('state',formValues.state)


            const response = await fetch('http://localhost:8000/api/editaddress',{method:"POST",body:userAddress})
            if(response.ok){
                setFormValues(initialValues)
                navigate('/addresselection')

            } 
        }
    }
    // receiver name
    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        if (!formValues.fullName) {
            setIsFocused(false);
        }
    };

    // address
    const handleAddressFocus = () => {
        setIsFocusedAddress(true);
    };

    const handleAddressBlur = () => {
        if (!formValues.address) {
            setIsFocusedAddress(false);
        }
    };
    // phone number
    const handleNumberFocus = () => {
        setIsFocusedNumber(true);
    };

    const handleNumberBlur = () => {
        if (!formValues.number) {
            setIsFocusedNumber(false);
        } else if (formValues.number.length === 10) {
            // Clear the error message when the number is exactly 10 digits
            setFormErrors({ ...formErrors, number: '' });
        } else {
            setFormErrors({ ...formErrors, number: 'Number must be exactly 10 digits.' });
        }
    };

    // focus for area
    const handleAreaFocus = () => {
        setIsFocusedArea(true);
    };

    const handleAreaBlur = () => {
        if (!formValues.area) {
            setIsFocusedArea(false);
        }
    };


    // focus for landmark
    const handleLandmarkFocus = () => {
        setIsFocusedLandmark(true);
    };

    const handleLandmarkBlur = () => {
        if (!formValues.landmark) {
            setIsFocusedLandmark(false);
        }
    };
    // focus for Pincode
    const handlePincodeFocus = () => {
        setIsFocusedPincode(true);
    };

    const handlePincodeBlur = () => {
        if (!formValues.pincode) {
            setIsFocusedPincode(false);
        } else if (formValues.pincode.length === 6) {
            // Clear the error message when the pincode is exactly 6 digits
            setFormErrors({ ...formErrors, pincode: '' });
        } else {
            setFormErrors({ ...formErrors, pincode: 'pincode must be exactly 6 digits.' });
        }
    }
    // focus for city
    const handleCityFocus = () => {
        setIsFocusedCity(true);
    };

    const handleCityBlur = () => {
        if (!formValues.city) {
            setIsFocusedCity(false);
        }
    };
    // focus for state
    const handleStateFocus = () => {
        setIsFocusedState(true);
    };

    const handleStateBlur = () => {
        if (!formValues.state) {
            setIsFocusedState(false);
        }
    };

    return (

        <section className="vh-100">
            
            {authUser ?
                (<div className="container-fluid h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-md-6 col-lg-5 col-xl-4">
                        <img src={Address} alt="" />
                        </div>
                        <div className="col-md-6 col-lg-5 col-xl-4">
                            <div className="text-center">
                                <h4>Edit Delivery Address</h4>
                                <p>Edit your address</p>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className={`input-container ${isFocusedAddress ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedAddress ? 'label-up' : ''}`}>
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedAddress ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleAddressFocus}
                                        onBlur={handleAddressBlur}
                                        required
                                        value={formValues.address}
                                        onChange={handleChange}
                                    />
                                    <p className="text-danger small">{formErrors.address}</p>
                                </div>





                                <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocused ? 'label-up' : ''}`}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"


                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocused ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        required
                                        value={formValues.fullName}
                                        onChange={handleChange}

                                    />
                                    <p class="text-danger small">{formErrors.fullName}</p>

                                </div>

                                <div className={`input-container ${isFocusedNumber ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedNumber ? 'label-up' : ''}`}>
                                        Number
                                    </label>
                                    <input
                                        type="text"
                                        name="number"
                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedNumber ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleNumberFocus}
                                        onBlur={handleNumberBlur}
                                        required
                                        value={formValues.number}
                                        onChange={handleChange}
                                    />
                                    <p className="text-danger small">{formErrors.number}</p>
                                </div>


                                <div className={`input-container ${isFocusedArea ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedArea ? 'label-up' : ''}`}>
                                        Area
                                    </label>
                                    <input
                                        type="text"
                                        name="area"


                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedArea ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleAreaFocus}
                                        onBlur={handleAreaBlur}
                                        required
                                        value={formValues.area}
                                        onChange={handleChange}

                                    />
                                    <p class="text-danger small">{formErrors.area}</p>

                                </div>

                                <div className={`input-container ${isFocusedLandmark ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedLandmark ? 'label-up' : ''}`}>
                                        Landmark
                                    </label>
                                    <input
                                        type="text"
                                        name="landmark"


                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedLandmark ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleLandmarkFocus}
                                        onBlur={handleLandmarkBlur}
                                        required
                                        value={formValues.landmark}
                                        onChange={handleChange}

                                    />
                                    <p class="text-danger small">{formErrors.landmark}</p>

                                </div>
                                <div className={`input-container ${isFocusedPincode ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedPincode ? 'label-up' : ''}`}>
                                        Pincode
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"


                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedPincode ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handlePincodeFocus}
                                        onBlur={handlePincodeBlur}
                                        required
                                        value={formValues.pincode}
                                        onChange={handleChange}

                                    />
                                    <p class="text-danger small">{formErrors.pincode}</p>

                                </div>

                                <div className={`input-container ${isFocusedCity ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedCity ? 'label-up' : ''}`}>
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"

                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedCity ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleCityFocus}
                                        onBlur={handleCityBlur}
                                        required
                                        value={formValues.city}
                                        onChange={handleChange}

                                    />
                                    <p class="text-danger small">{formErrors.city}</p>

                                </div>

                                <div className={`input-container ${isFocusedState ? 'focused' : ''}`}>
                                    <label htmlFor="inputField" className={`input-label ${isFocusedState ? 'label-up' : ''}`}>
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"


                                        className={`input-field form-control custom-input custom-textbox-width no-shadow border ${isFocusedState ? 'border-dark' : 'border-highlight'}`}
                                        onFocus={handleStateFocus}
                                        onBlur={handleStateBlur}
                                        required
                                        value={formValues.state}
                                        onChange={handleChange}

                                    />
                                    <p class="text-danger small">{formErrors.state}</p>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                >
                                    Update
                                </button>

                            </form>
                        </div>
                    </div>
                </div>) : null}
        </section>
    )
}

export default EditAddress
