import React from 'react'
import Header from '../components/Header'
import '../css/Transactions.css'
const Transactions = ({stocks, user}) => {
	const { first_name, last_name, email, wallet } = { ...user};
	console.log(stocks)
  return (
		<div className='container'>
			<Header />
			<div className='transactions'>
				<div className="purchases">
					<h1>Transactions</h1>
					<ol>
						{stocks
							? stocks.map((stock, idx) => {
								return (
									<li key={idx} className='list__item'>
											BUY {stock.symbol} - {stock.quantity} Shares @
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