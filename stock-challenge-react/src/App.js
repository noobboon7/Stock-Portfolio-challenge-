import React, {useState, useEffect} from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Portfolio from './containers/Portfolio';
import Login from './containers/Login';
import Register from './containers/Register';
import Transactions from './containers/Transactions';
import './css/App.css';

const BASE_URL = `https://sandbox.iexapis.com/stable/stock/`;
const API_KEY = process.env.REACT_APP_IEX_API_KEY;


const App = () => {
	const [loggedIn, setLogin] = useState(!true);
	const [user, setUser] = useState(null);
	const [userStocks, setUserStocks] = useState(null);
	const [userShares, setUserShares] = useState(null);

	const localToken = localStorage.token;
	
	// fix on login 
	useEffect(() => {
		if(localToken){
			// set loading
			fetchCurrentUser(localToken);
			console.log('token useEffect ran');
		}
	}, [localToken]);
	
	useEffect(() => {
		if(user ){
			setLogin(true);
			// getUserStocks(); 
			// remove loading
			console.log('user useEffect ran');
		}
	},[user]);
	
	// auto login in session user
	const fetchCurrentUser = () => {
		fetch(`http://localhost:3000/api/v1/auto_login`, {
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
			} else {
				alert(data.errors);
			}
		});
	};
	
	// login returning user
	const fetchUser = (userParams) => {
		fetch(`http://localhost:3000/api/v1/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(userParams)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(!data.errors){
				// set user to state and localstorage for auto login
				setUser(data.user);
				localStorage.setItem("token", data.token);
				getUserStocks();
			}else {
				alert(data.errors);
				console.error(data.errors);
			}
		});
	};

		const getUserStocks = () => {
			let shares;
			fetch(`http://localhost:3000/api/v1/getStocks`, {
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
					// console.log(Object.keys(shares).join(','))
					setUserShares(shares)
					// Parameter values must be comma-delimited when requesting multiple.
					getStockInfo(Object.keys(shares).join(","));
				});
			}; 

		const getStockInfo = (symbols) => {
			fetch(
				`${BASE_URL}/market/batch?filter=companyName,open,latestPrice&symbols=${symbols}&types=quote&token=${API_KEY}`,
			)
			.then(res => res.json())
			.then(data => {userFormatShares({ ...data });});
		};

		const userFormatShares = (shares) => {
			
			console.log(shares);
		}
		
		
				console.log(userShares);

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
							refreshStks={getUserStocks}
							refreshUser={setUser}
						/>
					)}
				/>

				<Route
					exact
					path='/Transactions'
					render={routerProps => (
						<Transactions user={user} stocks={userStocks} />
					)}
				/>
			</Switch>
		</div>
	);
}
export default App;
