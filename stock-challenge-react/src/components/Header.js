import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";


const Header = ({logout}) => {

  const handleLogout = () => {
    logout(false);
    localStorage.removeItem("token");
  };
  // history.location.pathname
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