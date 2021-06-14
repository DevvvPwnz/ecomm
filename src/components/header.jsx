import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

function Header() {
    
  const [menuToggle,setMenuToggle] = React.useState(false)

  const onClickToggle = () =>{
      setMenuToggle(!menuToggle)
  }
 

  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <NavLink exact={true} to="/" className="header__logo">
            <img src={Logo} alt="logo" />
          </NavLink>
          <div className="header__menu">
            <img src={Avatar} alt="" />
            <div className="header__menu-user">
              
            </div>
            <div className={menuToggle ? "header__menu-btn open" :"header__menu-btn"}>
                <MenuIcon fontSize="large" onClick={onClickToggle} />
              </div>
              <div className={menuToggle ? "header__menu-close open" :"header__menu-close"}>
                <MenuOpenIcon fontSize="large" onClick={onClickToggle} />
              </div>
           
          </div>
        </div>
        <div className="header__nav">
              <div className={menuToggle ? "nav__body active" : "nav__body"}> 
                  <div className="nav__list">
                      <div className="nav__link">
                      <NavLink  exact={true}  to="/"  onClick={onClickToggle} className="nav__link-route" activeClassName="active"><i className='bx bxs-home'></i>Home</NavLink>
                      </div>
                      <div className="nav__link">
                      <NavLink  to="/products" onClick={onClickToggle} className="nav__link-route" activeClassName="active"><i className='bx bxs-receipt' ></i>Products</NavLink>
                      </div>
                      <div className="nav__link">
                      <NavLink  to="/orders" onClick={onClickToggle} className="nav__link-route" activeClassName="active"><i className='bx bxs-badge-dollar'></i>Orders</NavLink>
                      </div>
                  </div>
              </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
