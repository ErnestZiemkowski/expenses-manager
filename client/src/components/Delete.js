import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            month: '',
            year: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            id: this.props.expense._id,
            month: this.props.expense.month,
            year: this.props.expense.year
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.expense._id,
            month: nextProps.expense.month,
            year: nextProps.expense.year
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.delete('expense/' + this.state.id)
            .then((response) => {
                this.setState({
                    messageFromState: response.data.message
                });
            })
            .then(() => {
                this.props.updateExpenses(this.state.id);
        });
    }
    render() {
        return (
            <Link
                to={{pathname: '/', search: '/' + this.state.month + '/' + this.state.year }}
                style={{textDecoration: 'none'}}
                onClick={this.handleSubmit}
            >
                <span
                    className="glyphicon glyphicon-trash"
                >
                </span>
            </Link>
        )
    }
}

export default Delete;
