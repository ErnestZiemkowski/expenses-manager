import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedMonth: 'Jan',
      selectedYear: 2018,
      data: [],
      activeTab: 2018
    };
    this.getData = this.getData.bind(this);
    
  }
  componentDidMount() {
    this.getData(this, 2018);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search) {
      let search = nextProps.history.location.search;
      search = search.substring(1);
      let searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      this.setState({ activeTab: parseInt(searchObj.year) });
      this.setState({ selectedYear: searchObj.year });
      this.setState({ selectedMonth: searchObj.month });
      this.getData(this, searchObj.year, searchObj.month);
    } else {
        this.getData(this, 2018);
    }
    // this.getData(this, '2018');
  }
  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab,
      selectedYear: selectedTab
    });
  }
  getData(ev, year) {
    console.log(year);
    axios.get('http://localhost:8000/expenses/All/' + year)
      .then((response) => {
        ev.setState({ data: response.data });
        ev.setState({ selectedYear: parseInt(year) });
        ev.setState({ selectedMonth: month });
      }).catch((error) => {
        console.log(error);
      });
  }
  onDelete(id) {
    let expenses = this.state.data;
    for(let i = 0; i < expenses.length; i++) {
      if(expenses[i]._id == id) {
        expenses.splice(i,1);
      }
    }
    this.setState({
      data: expenses
    });
  }

  render() {
    return (
      <div>
        <Tabs id="TabsMenu" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2016} title={<YearTabsRouter year='2016' />}></Tab>
          <Tab eventKey={2017} title={<YearTabsRouter year='2017' />}></Tab>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}></Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}></Tab>
        </Tabs>
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
              <th
                className="button-col"
              >
                Update
              </th>
              <th
                className="button-col"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((exp, _id) =>               
                <tr key={_id} >
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
                  <td
                    className='button-col'
                  >
                  <Update expense={exp} />
                  </td>
                  <td
                    className='button-col'
                  >
                  <Delete 
                    id={exp._id}
                    expense={exp}
                    updateExpenses={this.onDelete.bind(this)}/>
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
