import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
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
        axios.get('http://localhost:8000/delete?id=' + this.state.id)
            .then((response) => {
                this.setState({
                    messageFromState: response.data.message
            });
        });
    }
    render() {
        return (
            <Button
                bsStyle="danger"
                bsSize="small"
                onClick={this.handleSubmit}
            >
                <Link
                    to={{pathname: '/', search: ''}}
                    style={{textDecoration: 'none'}}
                >
                    <span
                        className="glyphicon glyphicon-remove"
                    >
                    </span>
                </Link>
            </Button>
        )
    }
}

export default Delete;
