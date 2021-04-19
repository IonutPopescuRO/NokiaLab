import React, { Component } from "react";
 
class Register extends Component {
  render() {
    return (
		<div className="auth-content">
			<h2 className="title">Înregistrare</h2>
			<div className="space-options-reg"></div>
			<form onSubmit="">
				<input ref="name" type="text" className="input" placeholder="Nume" minLength="3" required/>
				<input ref="email" type="email" className="input" placeholder="exemplu@test.com" required/>
				<input ref="password" type="password" className="input" placeholder="Parolă" minLength="4" required/>
				<button type="submit" className="btn btn-red">Înregistrează-mă!</button>
			</form>
			
			<div className="bottom-text">
				Ai deja un cont? <a href="/auth/login">Autentifică-te!</a>
			</div>
		</div>
    );
  }
}
 
export default Register;