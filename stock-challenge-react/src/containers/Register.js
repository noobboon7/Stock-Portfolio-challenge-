import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../css/Register.css";
import { NavLink } from "react-router-dom";

export default function Register({}){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);


	// console.log(user);
		
		async function createUser(user) {
			debugger
			const res = await fetch("http://localhost:3000/api/v1/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		console.log(data)
	}

	const validateForm = () => {
		return email.length > 0 && password.length > 0;
	};
	
	const handleSubmit = (event) => {
		event.preventDefault();
		setUser({firstName, lastName, email, password});
		console.log(user)
	};	
	
			
		

  return (
		<div className='Register'>
			<form onSubmit={handleSubmit}>
				<FormGroup controlId='firstName' bsSize='large'>
					<FormLabel>First Name</FormLabel>
					<FormControl
						autoFocus
						type='string'
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</FormGroup>

				<FormGroup controlId='lastName' bsSize='large'>
					<FormLabel>Last Name</FormLabel>
					<FormControl
						type='string'
						value={lastName}
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