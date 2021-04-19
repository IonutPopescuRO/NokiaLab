import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { faHome, faChartLine, faUsersCog, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Home from "./pages/dashboard/Home";
import NotFound from "./pages/dashboard/NotFound";

import TestGraphs from "./pages/dashboard/graphs/TestGraphs";

class Dashboard extends Component {
  
  render() {
	document.body.style.backgroundColor = "white";
    return (
		<div className="Dashboard">
			<div className="outer-container">
				<div className="sidebar-left">
					<div className="logo-dash">
						<FontAwesomeIcon icon={faUsersCog} /> Dashboard
					</div>
					<ul className="menu">
						<li><a href="/dashboard"><FontAwesomeIcon icon={faHome} /> Home</a></li>
						<li><a href="/dashboard/graphs"><FontAwesomeIcon icon={faChartLine} /> Grafice</a></li>
					</ul>
				</div>
				<div className="content">
					<div className="header">
						<div className="user-info">
							<FontAwesomeIcon icon={faUserTie} /> Account Name
						</div>
					</div>
					
					<div>
						<BrowserRouter>
							<Switch>
								<Route exact path="/dashboard" component={Home}/>
								<Route path="/dashboard/test" component={Home}/>
								<Route path="/dashboard/graphs" component={TestGraphs}/>
								
								<Route component={NotFound}/>
							</Switch>
						</BrowserRouter>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default Dashboard;