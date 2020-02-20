import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import "../css/Ticker.css"; 

const Ticker = ({getStock}) => {
	const [stock, setStock] = useState("");
	const [quantity, setQuantity] = useState("");

	// console.log()

	const handleSubmit = event => {
		event.preventDefault();
    // fetch getStock 
	};

	return (
		<div className='Ticker'>
			<form onSubmit={handleSubmit}>
				<FormGroup controlId='stock' bsSize='large'>
					<FormLabel>Ticker</FormLabel>
					<FormControl
						autoFocus
						type='text'
						value={stock}
						onChange={e => setStock(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId='quantity' bssize='large'>
					<FormLabel>Quantity</FormLabel>
					<FormControl
						value={quantity}
						onChange={e => setQuantity(e.target.value)}
						type='number'
					/>
				</FormGroup>
				<Button variant='success' block bsSize='large' type='submit'>
					BUY!!!
				</Button>
			</form>
		</div>
	);
};

export default Ticker