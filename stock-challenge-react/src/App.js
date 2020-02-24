import React, {useState, useEffect} from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Portfolio from './containers/Portfolio';
import Login from './containers/Login';
import Register from './containers/Register';
import Transactions from './containers/Transactions';
import './css/App.css';

const BASE_URL = `https://sandbox.iexapis.com/stable/stock/`;
const API_KEY = process.env.REACT_APP_IEX_API_KEY;
const SERVER_URL = process.env.REACT_APP_DB;

const App = () => {
	const [loggedIn, setLogin] = useState(!true);
	const [user, setUser] = useState(null);
	const [userStocks, setUserStocks] = useState([]);
	const [userShares, setUserShares] = useState([]);

	const localToken = localStorage.token;
	
	useEffect(() => {
		if(localStorage.token){
			// set loading
			fetchCurrentUser();
			console.log('token useEffect ran');
			// return () => {
			// 	console.log("clean up token");
			// }
		}
	}, []);
	
	
	// auto login in session user
	const fetchCurrentUser = () => {
		console.log(!localToken)
		fetch(`${SERVER_URL}/api/v1/auto_login`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.token
        }
    })
		.then(resp => resp.json())
		.then(data => {
			if(!data.errors){
				setUser(data);
				getUserStocks();
				setLogin(true);
			} else {
				alert(data.errors);
			}
		});
	};
	
	// login returning user
	const fetchUser = (userParams) => {
		fetch(`${SERVER_URL}api/v1/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(userParams)
		})
		.then(res => res.json())
		.then(data => {
			if(!data.errors){
				// set user to state and localstorage for auto login
				setUser(data.user);
				localStorage.setItem("token", data.token);
				getUserStocks();
				setLogin(true);
			}else {
				alert(data.errors);
				console.error(data.errors);
			}
		});
	};

	const getUserStocks = () => {
		let shares,
		shareQuantity;
		fetch(`${SERVER_URL}/api/v1/getStocks`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": localStorage.token,
			}
		})
			.then(res => res.json())
			.then(data => {

				setUserStocks(data);
				shares = data.reduce((acc, el) => {
					acc[el.symbol] = acc[el.symbol] + 1 || 1;
					return acc;
				}, {})
				shareQuantity = data.reduce((acc, el) => {
					acc[el.symbol] = acc[el.symbol] + el.quantity || el.quantity;
					return acc;
				}, {});
				// Parameter values must be comma-delimited when requesting multiple.
				getStockInfo(Object.keys(shares).join(","), shareQuantity);
			});
		}; 

	const getStockInfo = (symbols, shares) => {
		fetch(
			`${BASE_URL}/market/batch?filter=companyName,open,latestPrice&symbols=${symbols}&types=quote&token=${API_KEY}`,
			)
			.then(res => res.json())
			.then(data => {userFormatShares({ ...data }, shares);});
		};
		
		const userFormatShares = (sharesInfo, shares) => {
		for(let i in shares){
			sharesInfo[i].quote.quantity =  shares[i];
			sharesInfo[i] = sharesInfo[i].quote;
		}
		setUserShares(sharesInfo)
	};

	return (
		<div className='App'>
			{loggedIn ? <Redirect to='/Portfolio' /> : <Redirect to='/Login' />}

			<Switch>
				<Route
					path='/Register'
					render={routerProps => <Register login={setUser} />}
				/>
				<Route
					path='/Login'
					render={routerProps => <Login fetchLogin={fetchUser} />}
				/>

				<Route
					exact
					path='/Portfolio'
					render={routerProps => (
						<Portfolio
							logout={setLogin}
							user={user}
							stocks={userStocks}
							shares={userShares}
							refreshStks={getUserStocks}
							refreshUser={setUser}
						/>
					)}
				/>

				<Route
					exact
					path='/Transactions'
					render={routerProps => (
						<Transactions user={user} stocks={userStocks} logout={setLogin} />
					)}
				/>
			</Switch>
		</div>
	);
}
export default App;
