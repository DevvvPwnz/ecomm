import React from "react";
import { NavLink } from "react-router-dom";

function SideBar({fn}) {
 
  return (
    <div className="side__bar">
      <ul className="side__bar-list">
        <li className="side__bar-link">
          <NavLink  onClick={fn} className="side__bar-route" exact={true} to="/" activeClassName="active"><i className='bx bxs-home'></i>Home</NavLink>
        </li>
        <li className="side__bar-link">
          <NavLink onClick={fn} className="side__bar-route" to="/products" activeClassName="active"> <i className='bx bxs-receipt' ></i> Products</NavLink>
        </li>
        <li className="side__bar-link">
          <NavLink  onClick={fn} className="side__bar-route" to="orders" activeClassName="active"> <i className='bx bxs-badge-dollar'></i> Orders</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
