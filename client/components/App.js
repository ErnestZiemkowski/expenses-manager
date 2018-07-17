import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css';
import axios from 'axios';
import Add from './Add';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedMonth: 'Jan',
      selectedYear: 2018,
      data: []
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData(this, '2018');
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, '2018');
  }
  getData(ev, year) {
    axios.get('http://localhost:8000/getAll?year=' + year + '&month=All')
      .then((response) => {
        ev.setState({ data: response.data });
        ev.setState({ selectedYear: parseInt(year) });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Add
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
        />
        <table>
          <thead>
            <tr>
              <th
                className="button-col"
              >
                Lp.
              </th>
              <th
                className="desc-col"
              >
                Description
              </th>
              <th 
                className="button-col"
              >
                Amount
              </th>
              <th 
                className="button-col"
              >
                Month
              </th>
              <th 
                className="button-col"
              >
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((exp, _id) =>               
                <tr key={_id}>
                  <td
                    className='counterCell'
                  >
                  </td>
                  <td 
                    className='desc-col'
                  >
                    {exp.description}
                  </td>
                  <td 
                    className='button-col'
                  >
                    {exp.amount}
                  </td>
                  <td
                    className='button-col'
                  >
                    {exp.month}
                  </td>
                  <td
                    className='button-col'
                  >
                    {exp.year}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
