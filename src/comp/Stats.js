import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      accounts: 0
    }
  }

  componentDidMount() {
    const apiUrl = './php/total_accounts.php';
	
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