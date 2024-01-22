import {useContext, useEffect, useState} from "react";
import cartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(cartContext); 
  const {items } = cartCtx; 
  // const numberOfCartItems = cartCtx.items.length;
  const numberOfCartItems =items.reduce((currNum, item)=>{ return currNum+item.amount;},0);


  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''} `;

  useEffect(()=>{
    if(items.length===0){
      return;  
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(()=>{
      setBtnIsHighlighted(false);
    },300);

    return ()=>{
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>
        {/* Your Cart */}
        {props.nameButton}
      </span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;
