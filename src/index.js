import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './index.css';
import App from './App';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/auth" component={App} />
			
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
