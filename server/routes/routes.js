const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Expense = require('../models/Expense');

router.get('/', (req, res) => {
    res.render('index')
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
            res.send('Expense successfully added!');
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
        console.log(doc);
        Expense.update({ _id: body._id }, doc, (err, result) => {
            if(err) {
                res.send(err);
            }
            res.send('Expense successfully updated!');
        });
    });    

router.get('/delete', (req, res) => {
    let id = req.query.id;
    Expense.findById({_id: id}).remove().exec((err, expense) => {
        if(err) {
            res.send(err);
        }
        res.send('Expense successfully deleted!');
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
