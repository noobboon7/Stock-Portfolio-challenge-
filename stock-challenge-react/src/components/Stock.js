import React from 'react';

const Stock = ({stocks, shares}) => {
	///////////// delete after implementing shares/////////////////
  const stockAmounts = stocks.reduce((acc, stk) => {
		acc[stk.symbol] = acc[stk.symbol] + stk.quantity || 1;
		return acc;
	}, {}); 
	////////////////////////////////////////////////////////



	const parseStocks = () => {
		let arr = [], stk ;

		for (let i in shares) {
			stk = shares[i]

			arr.push(<li key={i}> {i} - {stk.quantity} Shares -- Current Price: {stk.latestPrice} -- value: {(stk.quantity * stk.latestPrice).toFixed(2)}</li>)
		}
		return arr
	};

  return (
		<div>
			<ul>
				{parseStocks()}
				<li>
				Display red when the current price is less than the day’s open price. 
				</li> 
				<li>
				Display grey when the current price is equal to the day’s open price. •
				</li> 
				<li>
				Display green when the current price is greater than the day’s open price.
				</li>
			</ul>
		</div>
	);
}

export default Stock 