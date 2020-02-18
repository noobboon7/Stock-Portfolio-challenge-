import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../css/Register.css";

export default function Register({login}){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
     
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login(true);
  }
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
						autoFocus
						type='string'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</FormGroup>

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
					Create Account
				</Button>
			</form>
		</div>
	);

}