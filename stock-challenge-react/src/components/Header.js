import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";


const Header = ({login}) => {
  const handleLogout = () => {
    login(false);
  };
  return(
    <header>
      <Button variant='danger' onClick={handleLogout}>
        Logout
      </Button>
      <span>
        <NavLink to='/Portfolio'> Portfolio </NavLink> |
        <NavLink to='/Transactions'> Transactions </NavLink>
      </span>
		</header>
  )
}

export default withRouter(Header)