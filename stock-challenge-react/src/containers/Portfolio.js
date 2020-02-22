import React, { useState } from "react";
import Stock from "../components/Stock";
import Ticker from "../components/Ticker";
import Header from "../components/Header";
import "../css/Portfolio.css";

const Portfolio = ({ logout, user ,stocks, shares, refreshStks, refreshUser }) => {
	const { wallet, email } = { ...user };
	const API_KEY = process.env.REACT_APP_IEX_API_KEY;
	// const thing = shares.forEach(s => console.log(s))

	// this can go in ticker
	const fetchStockIEX = (symbol, quantity) => {
		fetch(
			`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10&token=${API_KEY}`,
		)
			.then(res => res.json())
			.then(data => {
				// console.dir(data.quote);
				if (!data) {
					let setStock = data.quote,
						numStocks = parseInt(quantity),
						{ symbol, latestPrice } = { ...setStock };
					// set loading
					buyStockFetch({ numStocks, symbol, latestPrice, email });
				} else {
				}
			})
			.catch(function() {
				alert("Tiker symbol Not found?")
			});
	};
	// can use token instead of email
	const buyStockFetch = stock => {
		fetch(`http://localhost:3000/api/v1/buyStock`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(stock),
		})
			.then(res => res.json())
			.then(data => {
				let user = data.userData.user;
				console.log(user);
				console.log(data);
				refreshUser(user);
				refreshStks();
				// remove loading
			});
	};


	return (
		<div className='container'>
			<Header logout={logout} />

			<main className='portfolio__container'>

			<div className="portfolio">
				<h1>Portfolio(Current stock performance)</h1>
				{stocks ?  <Stock stocks={stocks}/> : "No stocks yet "}
			</div>

			<div>
				<h2>Wallet - {wallet}</h2>
				<Ticker fetchStock={fetchStockIEX} />
			</div>
			</main>
		</div>
	);
};

export default Portfolio;
