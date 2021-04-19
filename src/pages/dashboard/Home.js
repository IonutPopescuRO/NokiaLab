import React, { Component } from "react";
 
class Home extends Component {
  componentDidMount() {
	document.title = document.title + ' - Home';
  }
  
  render() {
    return (
		<div>
			<h1>Hello world!</h1>
		</div>
    );
  }
}

export default Home;