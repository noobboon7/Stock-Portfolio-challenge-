import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    fetch(
			"https://sandbox.iexapis.com/stable/stock/abt/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_a65cd369988146b9a582fab3ceae6b0d",
		)
			.then(res => res.json())
			.then(data => console.dir(data));
  },[]);
  return (
    <div className="App">

      <img src={logo} className="App-logo" alt="logo" />
        
    </div>
  );
}

export default App;
