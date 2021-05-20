import React, { Component } from "react";

import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import pathString from '../../../get_php_link.js';
import { data_pie, data_bar, status_order, statuses, data_line, days } from '../../../comp/Constants';

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const apiUrl = pathString + '/graphs.php';


class Graphs extends Component {
  constructor(props) {
    super(props);

    var current_date = new Date();

    this.handleClick = this.handleClick.bind(this);
    this.getTable = this.getTable.bind(this);
    this.updatePieChart = this.updatePieChart.bind(this);
    this.refTable = React.createRef()
    this.state = {
      startDate: new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 1),
      endDate: new Date(),
      error: null,
      btns: [null, true],
      btn_active: 1,
      incidents: [],
      incident_type: null,
      incidents_title: 'nerezolvate'
    }
  }

  handleClick(event) {
    const id = event.target.id;

    var btns = [null, false, false, false];
    btns[id] = true;
    this.setState(state => ({
      btns: btns,
      btn_active: id
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.btn_active !== this.state.btn_active || (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate)) {
      var form_data = new FormData();
      form_data.append('type', 1);
      form_data.append('periodicity', this.state.btn_active);

      form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
      form_data.append('end', this.state.endDate.toJSON().slice(0, 10));

      const requestOptions = {
        method: 'POST',
        body: form_data
      };
      fetch(apiUrl, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
            this.pie_chart.chartInstance.update();

            //Bar
            console.log(result.status_list);
            var x = result.status_list.map(x => (x.X)).filter((v, i, a) => a.indexOf(v) === i);//doar datele distincte
            data_bar.labels = x;
            Object.values(result.status_list).forEach(val => {
              data_bar.datasets[status_order[val.STATUS]].data[x.indexOf(val.X)] = val.COUNT;
            });
            this.bar_chart.chartInstance.update();

            data_line.datasets[0].data = result.quality.map(a => a.Resolved).map(Number);
            data_line.datasets[1].data = result.quality.map(a => a.Unsolved).map(Number);
            //  if (this.state.btn_active == 2)
            //data_line.labels = result.quality.map(a => days[a.X - 1]);
            // else 
            data_line.labels = result.quality.map(a => a.X);

            this.line_chart.chartInstance.update();
          },
          (error) => {
            this.setState({ error });
          }
        )
      this.setState({ incident_type: null, incidents_title: 'nerezolvate' });
    }
  }

  handleChange(date, name) {
    this.setState({
      [name]: date
    });
  }

  componentDidMount() {
    document.title = document.title + ' - Grafice';
    //incidents
    var form_data = new FormData();
    form_data.append('type', 1);
    form_data.append('periodicity', 1);

    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
          this.pie_chart.chartInstance.update();

          //Bar
          var x = result.status_list.map(x => (x.X)).filter((v, i, a) => a.indexOf(v) === i);//doar datele distincte
          data_bar.labels = x;
          Object.values(result.status_list).forEach(val => {
            data_bar.datasets[status_order[val.STATUS]].data[x.indexOf(val.X)] = val.COUNT;
          });
          this.bar_chart.chartInstance.update();

          data_line.datasets[0].data = result.quality.map(a => a.Resolved).map(Number);
          data_line.datasets[1].data = result.quality.map(a => a.Unsolved).map(Number);
          data_line.labels = result.quality.map(a => a.X);
          this.line_chart.chartInstance.update();
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  updatePieChart(id, date, set) {
    this.setState({ incident_type: statuses.indexOf(set), incidents_title: set.toString().toLowerCase() });

    var form_data = new FormData();
    form_data.append('type', 3);
    form_data.append('periodicity', this.state.btn_active);

    form_data.append('status', id);
    form_data.append('per', date);

    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
          this.pie_chart.chartInstance.update();
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  getTable(id) {
    var form_data = new FormData();
    form_data.append('type', 2);

    form_data.append('priority', id);
    if (this.state.incident_type !== null)
      form_data.append('incident_type', this.state.incident_type);
    form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
    form_data.append('end', this.state.endDate.toJSON().slice(0, 10));
    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            incidents: result.data
          });
          document.getElementsByClassName("data-table")[0].style.display = 'block';

          setTimeout(function () {
            this.refTable.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }.bind(this), 300);
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { startDate, endDate, incidents } = this.state;
    const { getTable, updatePieChart } = this

    return (
      <div className="sub-page">
        <div className="box-mod-actions">
          <h3>Perioadă</h3>
          <div className="actions-container">
            <div>
              <DatePicker dateFormat="dd.MM.yyyy" selected={startDate} onChange={(date) => this.handleChange(date, 'startDate')} />
              <div className="calendar-icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
            </div>
            <div>
              <DatePicker dateFormat="dd.MM.yyyy" selected={endDate} onChange={(date) => this.handleChange(date, 'endDate')} />
              <div className="calendar-icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
            </div>
            <div>
              <button id="1" className={`btn-small btn-small-${this.state.btns[1] ? 'on' : 'off'}`} onClick={this.handleClick}>
                Daily
            </button>
              <button id="2" className={`btn-small btn-small-${this.state.btns[2] ? 'on' : 'off'}`} onClick={this.handleClick}>
                Weekly
            </button>
              <button id="3" className={`btn-small btn-small-${this.state.btns[3] ? 'on' : 'off'}`} onClick={this.handleClick}>
                Monthly
            </button>
            </div>
          </div>

        </div>
        <br></br>
        <div className="grid-container">
          <div className="box-mod">
            <h3>Statistica incidentelor</h3>
            <div className="graphContainer" style={{ "maxWidth": "720px" }}>
              <Bar ref={(reference) => this.bar_chart = reference} redraw={true} data={data_bar} width={400} height={400} options={{ maintainAspectRatio: false, legend: { display: false }, plugins: { labels: { render: 'value' } }, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; updatePieChart(ind, element[0]['_model'].label, element[0]['_model'].datasetLabel); } } }} />
            </div>
          </div>
          <div className="box-mod">
            <h3>Incidente {this.state.incidents_title}</h3>
            <div className="graphContainer">
              <Pie ref={(reference) => this.pie_chart = reference} redraw={true} data={data_pie} width={400} height={400} options={{ maintainAspectRatio: false, title: { display: true, text: 'Prioritate:' }, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; getTable(ind); } }, plugins: { labels: { render: 'value', fontColor: '#ffffff', fontSize: 12 } } }} />
            </div>
          </div>
        </div>
        <br></br>
        <div className="box-mod big-graph">
          <h3>Statistica soluționării incidentelor</h3>
          <div className="graphContainer" style={{ "maxWidth": "1200px" }}>
            <Line ref={(reference) => this.line_chart = reference} redraw={true} data={data_line} options={{ maintainAspectRatio: false, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; console.log(data_line.labels[ind]); } } }} width={400} height={400} />
          </div>
        </div>
        <br></br>
        <div ref={this.refTable} className="box-mod data-table" style={{ "display": "none" }}>
          <h3>Listă incidente</h3>
          <div className="big-table">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Status</th>
                  <th>Submit date</th>
                  <th>Cat Tier</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map(incident => (
                  <tr key={incident.INCIDENT_NUMBER}>
                    <td>{incident.INCIDENT_NUMBER}</td>
                    <td>{incident.STATUS}</td>
                    <td>{incident.SUBMIT_DATE}</td>
                    <td>{incident.CAT_TIER_1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Graphs;