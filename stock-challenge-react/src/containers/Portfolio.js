import React from "react";
import Stock from "../components/Stock";
import Ticker from "../components/Ticker";
import Header from "../components/Header";
import "../css/Portfolio.css";

const Portfolio = ({ logout, user ,stocks, shares, refreshStks, refreshUser }) => {
	const { wallet, email } = { ...user };
	const API_KEY = process.env.REACT_APP_IEX_API_KEY;
	const SERVER_URL = `https://stock-portfolio-api-v1.herokuapp.com/`;

	// this can go in ticker
	const fetchStockIEX = (symbol, quantity) => {
		fetch(
			`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=quote,news&range=1m&last=10&token=${API_KEY}`,
		)
			.then(res => res.json())
			.then(data => {
				if (data) {
					let setStock = data.quote,
					numStocks = parseInt(quantity),
					{ symbol, latestPrice } = { ...setStock };
					// set loading
					buyStockFetch({ numStocks, symbol, latestPrice, email });
				} 
			})
			.catch(function() {
				alert("Ticker symbol Not found?");
			});
	};
	// can use token instead of email
	const buyStockFetch = stock => {
		fetch(`${SERVER_URL}api/v1/buyStock`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(stock),
		})
			.then(res => res.json())
			.then(data => {
				if(!data.errors){
					console.log(data)
					let user = data.userData.user;
					// remove loading
					refreshUser(user);
					refreshStks();
				} else {
					alert(data.errors)
				}
			})
	};


	return (
		<div className='container'>
			<Header logout={logout} />

			<main className='portfolio__container'>

			<div className="portfolio">
				{stocks.length > 0 ?  <Stock stocks={stocks} shares={shares}/> : "No stocks yet "}
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
