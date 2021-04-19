import React, { Component } from "react";
 
class NotFound extends Component {
  componentDidMount() {
	document.title = document.title + ' - 404';
  }
  
  render() {
    return (
		<div>
			<center><img style={{"padding-top": "20px"}} src={process.env.PUBLIC_URL + '/404.png'} alt="404" /></center>
		</div>
    );
  }
}

export default NotFound;