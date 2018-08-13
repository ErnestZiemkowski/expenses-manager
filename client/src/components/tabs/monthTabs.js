import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import MonthTabsRouter from './monthTabsRouter';

class MonthTabs extends React.Component {
    constructor() {
        super();
        this.state = { activeTab: ''};
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            activeTab: this.props.year+'-'+nextProps.monthlyActiveTab
        });
    }
    handleSelect(selectedTab) {
        this.setState({
            activeTab: selectedTab
        });
    }
    render(){
        return (
            <Tabs id="MonthTabsMenu" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                <Tab eventKey={this.props.year+'-All'} title={<MonthTabsRouter tabId='All' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-January'} title={<MonthTabsRouter tabId='January' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-February'} title={<MonthTabsRouter tabId='February' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-March'} title={<MonthTabsRouter tabId='March' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-April'} title={<MonthTabsRouter tabId='April' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-May'} title={<MonthTabsRouter tabId='May' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-June'} title={<MonthTabsRouter tabId='June' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-July'} title={<MonthTabsRouter tabId='July' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-August'} title={<MonthTabsRouter tabId='August' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-September'} title={<MonthTabsRouter tabId='September' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-October'} title={<MonthTabsRouter tabId='October' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-November'} title={<MonthTabsRouter tabId='November' year={this.props.year}/>}></Tab>
                <Tab eventKey={this.props.year+'-December'} title={<MonthTabsRouter tabId='December' year={this.props.year}/>}></Tab>
            </Tabs>
        )
    }
}

export default MonthTabs;
