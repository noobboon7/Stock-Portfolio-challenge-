import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../css/Register.css";
import { NavLink } from "react-router-dom";

const SERVER_URL = `https://stock-portfolio-api-v1.herokuapp.com/`;

export default function Register({login}){
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
		
	const createUser = async (newUser) => {

		const res = await fetch(`${SERVER_URL}/api/v1/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(newUser),
		});
		const data = await res.json();
		if(!data.errors){
			login(data.user)
			localStorage.setItem('token',data.token)
		} else {
			alert(data.errors)
			console.error(data.errors)
		}
	}

	const validateForm = () => {
		return email.length > 0 && password.length > 0;
	};
	
	const handleSubmit = (event) => {
		event.preventDefault();
		createUser({first_name, last_name, email, password});
	};	
	
			
		

  return (
		<div className='Register'>
			<form onSubmit={handleSubmit}>
				<FormGroup controlId='first_name' bsSize='large'>
					<FormLabel>First Name</FormLabel>
					<FormControl
						autoFocus
						type='string'
						value={first_name}
						onChange={e => setFirstName(e.target.value)}
					/>
				</FormGroup>

				<FormGroup controlId='last_name' bsSize='large'>
					<FormLabel>Last Name</FormLabel>
					<FormControl
						type='string'
						value={last_name}
						onChange={e => setLastName(e.target.value)}
					/>
				</FormGroup>

				<FormGroup controlId='email' bsSize='large'>
					<FormLabel>Email</FormLabel>
					<FormControl
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
					Create Account
				</Button>
			</form>
			<div className="login__link"> 
			<h5>

			</h5>
				Have an account?  <NavLink to="/Login">Login</NavLink>
			</div>
		</div>
	);
}