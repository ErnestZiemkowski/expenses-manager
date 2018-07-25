import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const queryString = require('querystring');

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            description: '',
            amount: '',
            month: '',
            year: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this); 
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            id: this.props.expense._id,
            description: this.props.expense.description,
            amount: this.props.expense.amount,
            month: this.props.expense.month,
            year: this.props.expense.year,
        });
    }
    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    handleTextChange(e) {
        e.preventDefault();
        if(e.target.name == 'amount') {
            this.setState({
                amount: e.target.value
            });
        }
        if(e.target.name == 'description') {
            this.setState({
                description: e.target.value
            });
        }
    }
    handleSelectChange(e) {
        e.preventDefault();
        if (e.target.name == 'month') {
            this.setState({
                month: e.target.value
            });
        }
        if (e.target.name == 'year') {
            this.setState({
                year: e.target.value
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.put('http://localhost:8000/expense/' + this.state.id, 
            queryString.stringify({ 
                _id: this.state.id,
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
    render() {
        if(this.state.messageFromServer == '') {
            return (
                <div>
                    <Button
                        bsStyle="warning"
                        bsSize="small"
                        onClick={this.openModal}
                    >
                        <span
                            className="glyphicon glyphicon-edit"
                        >
                        </span>
                    </Button>
                    <Modal
                        className="Modal"
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Expense"
                    >
                        <Link
                            to={{pathname: '/', search: ''}}
                            style={{textDecoration: 'none'}}
                        >
                            <Button
                                bsStyle="danger"
                                bsSize="small"
                                onClick={this.closeModal}
                            >
                                <span
                                    className="closebtn glyphicon glyphicon-remove"
                                >
                                </span>
                            </Button>
                        </Link>
                        <br/>
                        <form onSubmit={this.handleSubmit}>
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
                            >
                            </input>
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
                            >
                            </input>
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
                                value={this.state.month}
                                onChange={this.handleSelectChange}
                            >
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
                                value={this.state.year}
                                onChange={this.handleSelectChange}
                            >
                                <option value="2016" id="16">2016</option>
                                <option value="2017" id="17">2017</option>
                                <option value="2018" id="18">2018</option>
                                <option value="2019" id="19">2019</option>
                                <option value="2020" id="20">2020</option>
                            </select>
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
        } else {
            return (
                <div>
                    <Button 
                        bsStyle="warning"
                        bsSize="small"
                        onClick={this.openModal}
                    >
                        <span 
                            className="glyphicon glyphicon-plus"
                        >
                        </span>
                    </Button>
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
                                to={{pathname: '/', search: '' }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button 
                                    bsStyle="success" 
                                    bsSize="small" 
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

export default Update;
