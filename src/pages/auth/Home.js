import React, { Component } from "react";
 
import Stats from '../../comp/Stats';

class Register extends Component {
  render() {
    return (
		<div className="auth-content">
			<div className="space-options"></div>
			<h2 className="title">Opțiuni disponibile:</h2>
			<div className="space-options-reg"></div>
			<center>
				<a href="/auth/login" className="big-btn">Autentificare</a>
				<a href="/auth/register" className="big-btn btn-red">Înregistrare</a>
				<a href="/dashboard" className="big-btn btn-green">Dashboard</a>
			</center>
				
			<div className="bottom-text">
				Numărul total de conturi create: <Stats />
			</div>
		</div>
    );
  }
}
 
export default Register;