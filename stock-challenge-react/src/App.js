import React, {useState, useEffect} from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Portfolio from './containers/Portfolio';
import Login from './containers/Login';
import Register from './containers/Register';
import Transactions from './containers/Transactions';
import './css/App.css';

 
const App = () => {
	const [loggedIn, setLogin] = useState(!true);
	const [user, setUser] = useState(null);
	const [userStocks, setUserStocks] = useState(null);
	const localToken = localStorage.token;
	console.log(userStocks)
	
	useEffect(() => {
		if(user){
			setLogin(true);
			console.log('user useEffect ran');
		}
	},[user]);

	useEffect(() => {
		if(localToken){
			fetchCurrentUser(localToken);
			getUserStocks();
			console.log('token useEffect ran');
		}
	}, [localToken]);


	const getUserStocks = () => {
		fetch(`http://localhost:3000/api/v1/getStocks`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.token,
			},
		})
			.then(res => res.json())
			.then(data => setUserStocks(data));
	};

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
			} else {
				alert(data.errors);
			}
		});
	};
	

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
			if(!data.errors){
				// set user to state and localstorage for auto login
				setUser(data);
				// set stocks for user
				localStorage.setItem("token", data.token);
			}else {
				alert(data.errors);
				console.error(data.errors);
			}
		});
	};
				
	return (
		<div className='App'>
			{loggedIn ? <Redirect to='/Portfolio' /> : <Redirect to='/Login' />}

			<Switch>
				<Route
					path='/Register'
					render={routerProps => <Register login={setUser}/>}
				/>
				<Route
					path='/Login'
					render={routerProps => <Login fetchLogin={fetchUser} />}
				/>
				<Route
					exact
					path='/Portfolio'
					render={routerProps => <Portfolio logout={setLogin} userData={{...user}} />}
				/>
				<Route
					exact
					path='/Transactions'
				render={routerProps => <Transactions stocks={userStocks} userData={user} />}
				/>
			</Switch>
		</div>
	);
}
// {...routerProps} what is again?
export default App;
