import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel, Spinner } from "react-bootstrap";
import '../css/Login.css';

const Login = ({fetchLogin}) => {
	const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = event => {
		event.preventDefault();
		setLoading(true);
    fetchLogin({email, password});
  }

  return (
		<div className='Login'>
			<form onSubmit={handleSubmit}>
				<FormGroup controlId='email' bssize='large'>
					<FormLabel>Email</FormLabel>
					<FormControl
						autoFocus
						type='email'
						value={email}
						placeholder='email@example.com'
						onChange={e => setEmail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId='password' bssize='large'>
					<FormLabel>Password</FormLabel>
					<FormControl
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
					/>
				</FormGroup>

				{isLoading ? 
				<Button variant="primary" disabled>
					<Spinner
						as="span"
						animation="grow"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					Loading...
				</Button>
						:
				<Button block bssize='large' disabled={!validateForm()} type='submit'>
					Login
				</Button>
			}
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