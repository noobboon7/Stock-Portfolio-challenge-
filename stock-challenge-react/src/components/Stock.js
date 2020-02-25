import React, {useState} from 'react';
import '../css/Stock.css';
import  Spinner  from "react-bootstrap/Spinner";


// adds all the values of your stocks at current rate
const Stock = ({shares}) => {
	const [isLoading, setLoading] = useState(false)
	const totalPortfolio = Object.values({ ...shares }).reduce((acc, cur) => (cur.quantity * cur.latestPrice) + acc, 0 );
	// console.log(shares)
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
				<li className='stock' key={i}>
					<b>{i}</b> - {stk.quantity} Shares @ <span style={style}>${stk.latestPrice}</span>  ${(stk.quantity * stk.latestPrice).toFixed(2)}
				</li>
			);
		}
		return arr
	};
	// render portfolio
  return (
			<div className='stock__container'>
				<h1>Portfolio(${shares ? totalPortfolio.toFixed(2) : 0})</h1>
				<div className='labels'>
					<span>Symbol</span>
					<span>Quantity</span>
					<span>Last Price</span>
					<span>Market Value</span>
				</div>
				{isLoading ? 
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
				:
				<ul className='stock__list'>{parseStocks()}</ul>
				}
			</div> 
	);
}

export default Stock 