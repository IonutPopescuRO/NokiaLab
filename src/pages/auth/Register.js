import React, { Component } from "react";

import pathString from '../../get_php_link.js';
 
class Register extends Component {
  componentDidMount() {
	document.title = document.title + ' - Înregistrare';
  }
  constructor(props) {
    super(props);
	this.name = React.createRef();
	this.email = React.createRef();
	this.password = React.createRef();
    // the initial application state
    this.state = {
      status: null,
	  message: null
    }
  }
  
  handleSignIn(e) {
    e.preventDefault();
    const apiUrl = pathString + '/register.php';
	
    let name = this.name.current.value;
    let email = this.email.current.value;
    let password = this.password.current.value;
	
	if(name.length<3)
		this.setState({'status': 0, 'message': 'Numele trebuie să conțină minim 3 caractere.'});
	else if(password.length<4)
		this.setState({'status': 0, 'message': 'Parola trebuie să conțină minim 4 caractere.'});
	else {
		var data = new FormData();
		data.append('name', name);
		data.append('email', email);
		data.append('password', password);

		const requestOptions = {
			method: 'POST',
			body: data
		};
		
		fetch(apiUrl, requestOptions)
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState(result);
			},
			(error) => {
			  this.setState({ error });
			}
		  )
	}
  }
  render() {
    return (
		<div className="auth-content">
			<h2 className="title">Înregistrare</h2>
			{
				(this.state.status!=null) ?
					<div className={`alert alert-${this.state.status}`}>{this.state.message}</div>
				: null
			}
			<div className="space-options-reg"></div>
			<form onSubmit={this.handleSignIn.bind(this)}>
				<input ref={this.name} type="text" className="input" placeholder="Nume" minLength="3" required/>
				<input ref={this.email}type="email" className="input" placeholder="exemplu@test.com" required/>
				<input ref={this.password} type="password" className="input" placeholder="Parolă" minLength="4" required/>
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