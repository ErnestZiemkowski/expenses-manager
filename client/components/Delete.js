import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            id: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            id: this.props.expense._id
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.delete('http://localhost:8000/expense/' + this.state.id)
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
                to={{pathname: '/', search: ''}}
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
