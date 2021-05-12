import React, { Component } from "react";

import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import pathString from '../../../get_php_link.js';
import { data_pie, data_bar } from '../../../comp/Constants';

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const apiUrl = pathString + '/graphs.php';


class Graphs extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getTable = this.getTable.bind(this);
    this.refTable = React.createRef()
    this.state = {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(),
      error: null,
      btns: [null, false, false, true],
      btn_active: 1,
      incidents: []
    }
  }

  handleClick(event) {
    const id = event.target.id;

    var btns = [null, false, false, false, false];
    btns[id] = true;
    this.setState(state => ({
      btns: btns,
      btn_active: id
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.btn_active !== this.state.btn_active || (this.state.btn_active == 4 && (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate))) {
      var form_data = new FormData();
      form_data.append('type', this.state.btn_active);

      if (this.state.btn_active == 1) {
        form_data.append('start', this.state.startDate.toJSON().slice(0, 10));
        form_data.append('end', this.state.endDate.toJSON().slice(0, 10));
      }
      const requestOptions = {
        method: 'POST',
        body: form_data
      };
      fetch(apiUrl, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
            this.chart2.chartInstance.update();

            data_bar.labels = result.status_list.map(x => (x.STATUS));
            data_bar.datasets[0].data = result.status_list.map(x => (x.COUNT));
            this.chart3.chartInstance.update();
          },
          (error) => {
            this.setState({ error });
          }
        )
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
    const requestOptions = {
      method: 'POST',
      body: form_data
    };
    fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          data_pie.datasets[0].data = result.incidents_stats.map(x => (x.COUNT));
          this.chart2.chartInstance.update();


          data_bar.labels = result.status_list.map(x => (x.STATUS));
          data_bar.datasets[0].data = result.status_list.map(x => (x.COUNT));
          this.chart3.chartInstance.update();
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  getTable(id) {
    var form_data = new FormData();
    form_data.append('type', 5);
    form_data.append('priority', id);
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
    const { getTable } = this

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
                Afișează
            </button>
            </div>
            <div>
              <button id="2" className={`btn-small btn-small-${this.state.btns[2] ? 'on' : 'off'}`} onClick={this.handleClick}>
                Săptămâna curentă
            </button>
              <button id="3" className={`btn-small btn-small-${this.state.btns[3] ? 'on' : 'off'}`} onClick={this.handleClick}>
                Luna curentă
            </button>
              <button id="4" className={`btn-small btn-small-${this.state.btns[4] ? 'on' : 'off'}`} onClick={this.handleClick}>
                Anul curent
            </button>
            </div>
          </div>

        </div>
        <br></br>
        <div className="grid-container">
          <div className="box-mod">
            <h3>Statistica incidentelor</h3>
            <div className="graphContainer" style={{ "maxWidth": "720px" }}>
              <Bar ref={(reference) => this.chart3 = reference} redraw={true} data={data_bar} width={400} height={400} options={{ maintainAspectRatio: false, plugins: { labels: { render: 'value' } }, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; alert(ind); } } }} />
            </div>
          </div>
          <div className="box-mod">
            <h3>Incidente nerezolvate</h3>
            <div className="graphContainer">
              <Pie ref={(reference) => this.chart2 = reference} redraw={true} data={data_pie} width={400} height={400} options={{ maintainAspectRatio: false, title: { display: true, text: 'Prioritate:' }, onClick: function (evt, element) { if (element.length > 0) { var ind = element[0]._index; getTable(ind); } }, plugins: { labels: { render: 'value', fontColor: '#ffffff', fontSize: 12 } } }} />
            </div>
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