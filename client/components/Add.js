import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { stat } from 'fs';
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
            modalIsOpen: false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind();
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
}