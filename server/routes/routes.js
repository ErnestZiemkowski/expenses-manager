const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Expense = require('../models/Expense');
const queryString = require('querystring');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/get', (req, res) => {
    let id = req.query.id;
    Expense.findById(id, (err, expense) => {
        if (err) {
            res.send(err);
        } 
        res.send(expense);  
    });
});

router.route('/insert')
    .post((req, res) => {
        let expense = new Expense();
        let body = req.body;
        expense.description = body.description;
        expense.amount = body.amount;
        expense.month = body.month;
        expense.year = body.year;

        expense.save((err) => {
            if(err) {
                res.send(err);
            }
            res.send(JSON.stringify({message: 'Expense successfully added!', body: expense}));
        });
    });

router.route('/update')
    .post((req, res) => {
        let body = req.body;
        let doc = {
            description: body.description,
            amount: body.amount,
            month: body.month,
            year: body.year    
        };
        Expense.update({ _id: body._id }, doc, (err, result) => {
            if(err) {
                res.send(err);
            }
            res.send(JSON.stringify({message: 'Expense successfully updated!', body: doc, result}));
        });
    });    

router.delete('/delete', (req, res) => {
    let id = req.query.id;
    Expense.remove({_id: id}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(JSON.stringify({message: 'Expense successfully deleted!', result}));
    });
});  

router.get('/getAll', (req, res) => {
    let monthRec = req.query.month;
    let yearRec = req.query.year;
    if(monthRec && monthRec != 'All') {
        Expense.find({$and: [ { month: monthRec }, { year: yearRec }]}, (err, expenses) => {
            if(err) {
                res.send(err);
            }
            res.json(expenses)
        });
    } else {
        Expense.find({ year: yearRec }, (err, expenses) => {
            if(err) {
                res.send(err);
            }
            res.json(expenses);
        });
    }
});

module.exports = router;
