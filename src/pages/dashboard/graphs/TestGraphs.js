import React, { Component } from "react";
//import PieChart from "../../../comp/charts/Pie Chart";
import {Line, Pie} from 'react-chartjs-2';


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
      data: [65, 59, 80, 81, 56, 55, 40]
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
  componentDidMount() {
	  document.title = document.title + ' - Grafice';
  }
  
  render() {
    return (
		<div className="sub-page">
			<h2>Test grafic</h2>
			<div className="box-mod">
				<Line data={data} width={400} height={400} options={{ maintainAspectRatio: false }}/>
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