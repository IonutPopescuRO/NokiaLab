import React, { Component } from "react";
import {Line, Pie} from 'react-chartjs-2';
import pathString from '../../../get_php_link.js';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0]
    }
  ]
};

const data_pie = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class TestGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      error: null,
      data: []
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
		data.datasets[0].data=this.state.data;
		this.chart1.chartInstance.update();
	}
  }
  componentDidMount() {
	document.title = document.title + ' - Grafice';
	const apiUrl = pathString + '/test_graph.php';
	
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            data: result.data
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }
  
  render() {
    const { startDate } = this.state;
    const { endDate } = this.state;
	
    return (
		<div className="sub-page">
			<h2>Test grafic</h2>
			<div className="box-mod">
				<Line ref={(reference) => this.chart1 = reference} data={data} width={400} height={400} options={{ maintainAspectRatio: false }}/>
			</div>
			<h2>Test datepicker</h2>
			<div className="box-mod">
				<DatePicker selected={startDate} onChange={(date)=>this.handleChange(date, 'startDate')} />
				<DatePicker selected={endDate} onChange={(date)=>this.handleChange(date, 'endDate')} />
			</div>
			<h2>Test grafic 2</h2>
			<div className="box-mod">
				<Pie data={data_pie} width={400} height={400} options={{ maintainAspectRatio: false }} />
			</div>
		</div>
    );
  }
}

export default TestGraphs;