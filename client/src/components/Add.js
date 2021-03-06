import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const queryString = require('querystring');

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            description: '',
            amount: '',
            month: '',
            year: '',
            messageFromServer: '',
            modalIsOpen: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if(this.props.selectedMonth === 'All') {
            this.setState({
                month: 'Jan'
            });
        } else {
            this.setState({
                month: this.props.selectedMonth
            });    
        }
        this.setState({
            year: this.props.selectedYear
        });
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.selectedMonth === 'All') {
            this.setState({
                month: 'Jan'
            });
        } else {
            this.setState({
                month: this.props.selectedMonth
            });    
        }
        this.setState({
            year: nextProps.selectedYear
        });
    }
    componentWillMount() {
        Modal.setAppElement('body');
    }
    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }
    closeModal() {
        this.setState({
            description: '',
            amount: '',
            month: 'Jan',
            year: 2018,
            messageFromServer: '',
            modalIsOpen: false
        });
    }
    handleTextChange(e) {
        e.preventDefault();
        if(e.target.name === 'amount') {
            this.setState({
                amount: e.target.value
            });
        }
        if(e.target.name === 'description') {
            this.setState({
                description: e.target.value
            });
        }
    }
    handleSelectChange(e) {
        e.preventDefault();
        if (e.target.name === 'month') {
            this.setState({
                month: e.target.value
            });
        }
        if (e.target.name === 'year') {
            this.setState({
                year: e.target.value
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const formEl = this.formEl;
        const formLength = formEl.length;
        if(formEl.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                let elem = formEl[i];
                if(!elem.checkValidity()) {
                    elem.nextSibling.innerHTML = 'invalid input';
                }
            }
        } else {
            axios.post('expense',
                queryString.stringify({
                    description: this.state.description,
                    amount: this.state.amount,
                    month: this.state.month,
                    year: this.state.year
                }), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }
            ).then((response) => {
                this.setState({
                    messageFromServer: response.data.message
                });
            });    
        }
    }
    render() {
        if(this.state.messageFromServer === ''){
            return (
                <div>
                    <div className="add-field">
                        <Button
                            onClick={this.openModal}
                        >
                            <span
                                className="glyphicon glyphicon-plus"
                            >
                            {'  '}New Expense
                            </span>
                        </Button>
                    </div>
                    <Modal
                        className="Modal"
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Expense"
                    >
                        <Link
                            to={{ pathname: '/', search: '/' + this.state.month + '/' + this.state.year }}
                            style={{ textDecoration: 'none' }}
                        >
                            <span 
                                onClick={this.closeModal}
                                className="glyphicon glyphicon-remove"
                            >
                            </span>
                        </Link>
                        <br/>
                        <form onSubmit={this.handleSubmit} noValidate ref={form => (this.formEl = form)}>
                            <label 
                                htmlFor="description"
                            >
                                Description:
                            </label>
                            <input 
                                id="description"
                                className="select"
                                name="description"
                                type="text"
                                value={this.state.description}
                                onChange={this.handleTextChange}
                                required
                            >
                            </input>
                            <p id='description-error'></p>
                            <br/>
                            <label 
                                htmlFor="amount"
                            >
                                Amount:
                            </label>
                            <input
                                id="amount"
                                className="select"
                                name="amount"
                                type="number"
                                value={this.state.amount}
                                onChange={this.handleTextChange}
                                required
                            >
                            </input>
                            <p id='amount-error'></p>
                            <br/>
                            <label
                                htmlFor="month"
                            >
                                Month:
                            </label>
                            <select 
                                id="month"
                                className="select"
                                name="month"
                                type="text"
                                value={this.state.month}
                                onChange={this.handleSelectChange}
                                required
                            >
                                <option></option>
                                <option value="January" id="Jan">January</option>
                                <option value="February" id="Feb">February</option>
                                <option value="March" id="Mar">March</option>
                                <option value="April" id="Apr">April</option>
                                <option value="May" id="May">May</option>
                                <option value="June" id="Jun">June</option>
                                <option value="July" id="Jul">July</option>
                                <option value="August" id="Aug">August</option>
                                <option value="September" id="Sep">September</option>
                                <option value="October" id="Oct">October</option>
                                <option value="November" id="Nov">November</option>
                                <option value="December" id="Dec">December</option>
                            </select>
                            <p id='month-error'></p>
                            <br/>
                            <label 
                                htmlFor="year"
                            >
                                Year:
                            </label>
                            <select 
                                id="year"
                                className="select"
                                name="year"
                                type="number"
                                value={this.state.year}
                                onChange={this.handleSelectChange}
                                required
                            >
                                <option></option>
                                <option value="2016" id="16">2016</option>
                                <option value="2017" id="17">2017</option>
                                <option value="2018" id="18">2018</option>
                                <option value="2019" id="19">2019</option>
                                <option value="2020" id="20">2020</option>
                            </select>
                            <p id='year-error'></p>
                            <br/>
                            <input 
                                className="add-expense-button"
                                type="submit"
                                value="Add Expense"
                            />
                        </form>
                    </Modal>
                </div>
            );
        }
        else{
            return (
                <div>
                    <div className="add-field">
                        <Button
                            onClick={this.openModal}
                        >
                            <span
                                className="glyphicon glyphicon-plus"
                            >
                            {'  '}New Expense
                            </span>
                        </Button>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Expense"
                        className="Modal"
                    >
                        <div 
                            className='button-center'
                        >
                            <h3>{this.state.messageFromServer}</h3>
                            <Link 
                                to={{pathname: '/', search: 'expenses/' + this.state.month + '/' + this.state.year }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button 
                                    onClick={this.closeModal}
                                >
                                    Close the Dialog
                                </Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

export default Add;
