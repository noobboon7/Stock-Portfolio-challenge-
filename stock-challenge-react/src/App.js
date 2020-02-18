import React, {useState} from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Portfolio from './containers/Portfolio';
import Login from './containers/Login';
import Register from './containers/Register';
import './App.css';

const App = () => {
  const [loggedIn, setLogin] = useState(true);
  
  return (
		<div className='App'>
			{loggedIn ? <Redirect to='/Portfolio' /> : <Redirect to='/Login' />}
			<Switch>
				<Route
					path='/Register'
					render={routerProps => <Register login={setLogin} />}
				/>
				<Route
					path='/Login'
					render={routerProps => <Login login={setLogin} />}
				/>
				<Route
					exact
					path='/Portfolio'
					render={routerProps => <Portfolio login={setLogin}/>}
				/>
				<Route exact path='/Register' render={routerProps => <Register />} />
			</Switch>
		</div>
	);
}
// {...routerProps} what is again?
export default App;
