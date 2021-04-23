import React, { Component } from "react";

import pathString from '../../get_php_link.js';
 
class Login extends Component {
  componentDidMount() {
	document.title = document.title + ' - Autentificare';
  }
  constructor(props) {
    super(props);
	this.email = React.createRef();
	this.password = React.createRef();
    // the initial application state
    this.state = {
      status: null,
	  message: null
    }
  }
  
  handleLogIn(e) {
    e.preventDefault();

    const apiUrl = pathString + '/login.php';
	// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md

    let email = this.email.current.value;
    let password = this.password.current.value;
	
	if(password.length > 3)
	{
		var data = new FormData();
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
			console.log(result);
			  this.setState(result);
			},
			(error) => {
			  this.setState({ error });
			}
		  )
	} else this.setState({'status': 0, 'message': 'Parola trebuie să conțină minim 4 caractere.'});
  }
  
  render() {
    return (
		<div className="auth-content">
			<h2 className="title">Autentificare</h2>
			{
				(this.state.status!=null) ?
					<div className={`alert alert-${this.state.status}`}>{this.state.message}</div>
				: null
			}
			
			<div className="space-options"></div>
			<form onSubmit={this.handleLogIn.bind(this)}>
				<input ref={this.email} type="email" className="input" placeholder="exemplu@test.com" required/>
				<input ref={this.password} type="password" className="input" placeholder="Parolă" minLength="4" required/>
				<button type="submit" className="btn">Autentifică-mă!</button>
			</form>
			
			<div className="bottom-text">
				Nu ai cont? <a href="/auth/register">Înregistrează-te!</a>
			</div>
		</div>
    );
  }
}

export default Login;