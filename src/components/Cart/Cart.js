import React,{useContext, useState} from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext);

    const totalAmount = `Rs:${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;

    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) =>{
        cartCtx.addItem(item);
    };

    const orderHandler=()=>{
         setIsCheckout(true);
    };

    const submitOrderHandler=async (userData)=>{
        setIsSubmitting(true);
         await fetch('https://foodorderapp-6fcee-default-rtdb.firebaseio.com/order.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);   
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItem = ( 
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item)=>(
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
            ))}
        </ul>  
    )

    const cartModalContent= <React.Fragment>
        {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        { isCheckout &&  <Checkout onConfirm={submitOrderHandler} onCancel={props.onClick} />}
        {!isCheckout &&            
        <div className={classes.actions}>
            <button onClick={props.onClick} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order Data...</p>;

    const didSubmitModalContent = <React.Fragment><p>Successfully sent the order!</p>
    <div className={classes.actions}> 
    <button className={classes.actions} onClick={props.onClick}>
        Close
    </button>
    </div>
</React.Fragment>
  return (
    <Modal onClick={props.onClick}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart