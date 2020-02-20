import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";

import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../css/Login.css';

const Login = ({fetchLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // console.log()
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = event => {
		event.preventDefault();
    fetchLogin({email, password});
  }

  return (
		<div className='Login'>
			<form onSubmit={handleSubmit}>
				<FormGroup controlId='email' bsSize='large'>
					<FormLabel>Email</FormLabel>
					<FormControl
						autoFocus
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId='password' bssize='large'>
					<FormLabel>Password</FormLabel>
					<FormControl
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
					/>
				</FormGroup>
				<Button block bsSize='large' disabled={!validateForm()} type='submit'>
					Login
				</Button>
			</form>
			<div className='register__link'>
				<h5>
					Not a member yet? <NavLink to='/Register'> Register </NavLink>
				</h5>
			</div>
		</div>
	);
}
export default withRouter(Login);