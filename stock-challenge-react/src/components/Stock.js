import React from 'react';
// adds all the values of your stocks at current rate
const Stock = ({shares}) => {
	const totalPortfolio = Object.values({ ...shares }).reduce((acc, cur) => (cur.quantity * cur.latestPrice) + acc, 0 );
	
	const parseStocks = () => {
		let arr = [], 
		stk,
		style;

		for (let i in shares) {
			stk = shares[i]
			// Performace styling of stock
			if(shares[i].open < shares[i].latestPrice ){
				 style = {color: 'green'};
			} else if (shares[i].open === shares[i].latestPrice){
				 style = { color: 'grey' };
			} else {
				 style = { color: 'red' };
			}
			// stock information 
			arr.push(
				<li key={i}>
					{i} - {stk.quantity} Shares  
					Current Price: <span style={style}>{stk.latestPrice}</span> 
					-- value: {(stk.quantity * stk.latestPrice).toFixed(2)}
				</li>
			);
		}
		return arr
	};
	// render portfolio
  return (
		<div>
			<h1>Portfolio(${shares ? totalPortfolio.toFixed(2) : 0})</h1>
			<ul>{parseStocks()}</ul>
		</div>
	);
}

export default Stock 