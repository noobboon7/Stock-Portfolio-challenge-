import React from 'react'
import Header from '../components/Header'
const Transactions = ({userData}) => {
	const { first_name, last_name, email, wallet } = { ...userData };
	// console.log();
	
  return (
		<div className='transactions'>
			<Header />
			<h1>Transactions:</h1>
				All the stock  Bought
			<div className="user__info">
				<h2>User:</h2>
				Name : {first_name + last_name}
				Email: {email}
				Wallet: {wallet}
			</div>
		</div>
	);
}

export default Transactions