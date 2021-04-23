import React from 'react';
import pathString from '../get_php_link.js';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      accounts: 0
    }
  }

  componentDidMount() {
    const apiUrl = pathString + '/total_accounts.php';
	
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            accounts: result.accounts
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, accounts} = this.state;
	
    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(accounts)
    }
  }
}

export default Stats;