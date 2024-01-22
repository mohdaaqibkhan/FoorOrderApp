import React from 'react'
import MealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>FoodOrder</h1>
            <HeaderCartButton onClick={props.action} nameButton="Cart"/>
        </header>
        <div className={classes['main-image']}>
            <img src={MealsImage} alt="Image" />
        </div>
    </React.Fragment>
  )
}

export default Header