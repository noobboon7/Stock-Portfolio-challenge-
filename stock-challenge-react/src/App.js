import React, {useState, useEffect} from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Portfolio from './containers/Portfolio';
import Login from './containers/Login';
import Register from './containers/Register';
import Transactions from './containers/Transactions';
import './css/App.css';

const App = () => {
	const [loggedIn, setLogin] = useState(false);
	// const [user, setUser] = useState({});


	// console.log(user)
	// 	useEffect(() => {
	// 		fetch("http://localhost:3000/api/v1/users", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Accept: "application/json",
	// 			},
	// 			body: JSON.stringify(user)
	// 		})
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				if (data.errors) {
	// 					alert(data.errors);
	// 					console.error(data.errors);
	// 				} else {

	// 				}
	// 			});
	// 	}, [setUser]);
  
  return (
		<div className='App'>
			{loggedIn ? <Redirect to='/Portfolio' /> : <Redirect to='/Login' />}
			<Switch>
				<Route
					path='/Register'
					render={routerProps => <Register login={setLogin}  />}
				/>
				<Route
					path='/Login'
					render={routerProps => <Login login={setLogin} />}
				/>
				<Route
					exact
					path='/Portfolio'
					render={routerProps => <Portfolio login={setLogin} />}
				/>
				<Route
					exact
					path='/Transactions'
					render={routerProps => <Transactions />}
				/>
			</Switch>
		</div>
	);
}
// {...routerProps} what is again?
export default App;
