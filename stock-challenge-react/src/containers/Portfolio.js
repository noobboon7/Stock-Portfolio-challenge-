import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

const Portfolio = ({login}) => {
  const handleLogout = () => {
    login(false);
  }
  
  useEffect(() => {
	  fetch("https://sandbox.iexapis.com/stable/stock/abt/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_a65cd369988146b9a582fab3ceae6b0d")
		.then(res => res.json())
		.then(data => console.dir(data));
  }, []);

  return (
		<div>
			profile here
			<Button variant='danger' onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export default Portfolio