import React, { useEffect, useState } from "react";
import Stock from '../components/Stock';
import Ticker from '../components/Ticker';
import Header from '../components/Header';
import '../css/Portfolio.css';

const Portfolio = ({logout, userData}) => {

  // useEffect(() => {
  //   // in demo mode 
	//   fetch("https://sandbox.iexapis.com/stable/stock/abt/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_a65cd369988146b9a582fab3ceae6b0d")
	// 	.then(res => res.json())
	// 	.then(data => console.dir(data));
  // }, []);

  return (
		<div className='container'>
      <Header logout={logout}/>
		<div>
			<h1>Portfolio({userData.wallet})</h1>
		</div>
			<main className='portfolio'>
				<Stock />
				<Ticker />
			</main>
		</div>
	);
}

export default Portfolio