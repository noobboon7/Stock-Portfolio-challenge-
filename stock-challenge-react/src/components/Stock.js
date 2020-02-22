import React from 'react';

const Stock = ({stocks, shares}) => {
	///////////// delete after implementing shares/////////////////
  const stockAmounts = stocks.reduce((acc, stk) => {
		acc[stk.symbol] = acc[stk.symbol] + stk.quantity || 1;
		return acc;
	}, {}); 
	////////////////////////////////////////////////////////


	
	const parseStocks = () => {
		let arr = []
		for (let i in stockAmounts) {
			arr.push(<li key={i}> {i} - {stockAmounts[i]} Shares </li>)
		}
		return arr
	};

  return (
		<div>
			<ul>
				{parseStocks()}
					
					
					logic
				<li>
				Current values should be based on the latest price and quantity owned for a given stock.
				</li> 
					UI 
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