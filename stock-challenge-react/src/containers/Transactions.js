import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import '../css/Transactions.css'
const Transactions = ({stocks, userData}) => {
	const [stockList, setStockList] = useState();
	const [user, setUser] = useState(null)
	console.log(stockList)
	const { first_name, last_name, email, wallet } = { ...userData };
	// let tkn = localStorage.token
	
	useEffect(() => {

			setStockList(stocks)
			// setUser(userStock)
			console.count()
	},[])
	// useEffect(() => {
	// 	if(tkn) {
	// 		getUserStocks();
	// 	}
	// }, [tkn]);

	// const getUserStocks = () => {
	// 	fetch(`http://localhost:3000/api/v1/getStocks`, {
	// 		method: "GET",
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json',
	// 			'Authorization': localStorage.token
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => setUserStocks(data));
	// };

  return (
		<div className='container'>
			<Header />
			<div className='transactions'>
				<div className="purchases">
					<h1>Transactions</h1>
					<ol>
						{stockList
							? stockList.map((stock, idx) => {
								return (
									<li key={idx} className='list__item'>
											BUY {stock.symbol} - {stock.latestPrice} Shares @{" "}
											{stock.price}
										</li>
									);
								})
								: "You have no transactions"}
					</ol>
				</div>

				<div className='user__info'>
					<h2>User</h2>
					<ul>
						<li>Name: {first_name + ' ' + last_name}</li>
						<li>Email: {email}</li>
						<li>Wallet: {wallet}</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Transactions