import React, { useState } from "react";
import Stock from "../components/Stock";
import Ticker from "../components/Ticker";
import Header from "../components/Header";
import "../css/Portfolio.css";

const Portfolio = ({ logout, userData }) => {
	const {wallet, email} = {...userData}
	console.log(wallet, email)
	const [fetchedStock, setFetchedStock] = useState(null);
	const API_KEY = process.env.REACT_APP_IEX_API_KEY;
	const tkn = localStorage.getItem('token');

	// console.log(tkn,fetchedStock);

	const fetchStockIEX = (symbol, quantity)=> {
		fetch(
			`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10&token=${API_KEY}`,
			)
			.then(res => res.json())
			.then(data => {
				// console.dir(data.quote);
				let setStock = data.quote,
				numStocks = parseInt(quantity),
				{symbol, latestPrice} = {...setStock};

				// set loading
				buyStockFetch({numStocks, symbol, latestPrice, email});
			});
		};
		
		const buyStockFetch = (stock) => {
			debugger
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
				console.log(...data)
				setFetchedStock(data); 
				// remove loading 
			})
	};

	return (
		<div className='container'>
			<Header logout={logout} />

			<div>
				<h1>Portfolio(Current stock performance)</h1>
			</div>
			<main className='portfolio'>
				<Stock />
				<Ticker fetchStock={fetchStockIEX} wallet={userData.wallet} />
			</main>
		</div>
	);
};

export default Portfolio;
