// import React from 'react'
// import classes from './Checkout.module.css';


// const Checkout = (props) => {
//     const confirmHandler = (event)=>{
//         event.preventDefault();
//     };

//   return (
//     <form>
//         <div className={classes.control}>
//             <label htmlFor='name'>Your Name</label>
//             <input type="text" id='name' />
//         </div>
//         <div className={classes.control}>
//             <label htmlFor='address'>Address</label>
//             <input type="text" id='address' />
//         </div>
//         <div className={classes.control}>
//             <label htmlFor='post'>Post Code</label>
//             <input type="text" id='post' />
//         </div>
//         <div className={classes.control}>
//             <label htmlFor='city'>City</label>
//             <input type="text" id='city' />
//         </div>
//         <button type='button' onClick={props.onCancel}>Cancel</button>
//         <button>Confirm</button>
//     </form>
//   )
// }

// export default Checkout

import {useRef, useState} from 'react'
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length >4;


const Checkout = (props) => {
    const  [formInputsValidity, setFormInputsValidity] = useState({name: true,
        street: true,
        city: true,
        postal: true})

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value; 

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityyIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal );


    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityyIsValid,
        postal: enteredPostalIsValid
    })

    const formIsValid = enteredNameIsValid && enteredCityyIsValid && enteredPostalIsValid &enteredStreetIsValid;
     
    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postal: enteredPostal
    });
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '': classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '': classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '': classes.invalid}`;
  const postalControlClasses = `${classes.control} ${formInputsValidity.postal ? '': classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please entered a valid Name!</p> }
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please entered a valid Street!</p> }

      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please entered a valid Postal Code!</p> }

      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please entered a valid City!</p> }

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;