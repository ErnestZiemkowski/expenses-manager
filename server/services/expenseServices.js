const Expense = require('../models/Expense');
const { validationResult } = require('express-validator/check');

function getExpense(req, res) {
    Expense
        .findOne({'_id': req.params.id})
        .lean()
        .exec(function(err, expense) {
            if(err) {
                res.send(err);
            }
            res.json(expense);
        });
};
    
function getExpenses(req, res) {
    let monthRec = req.params.month;
    let yearRec = req.params.year;
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
}

function insertExpense(req, res) {

    req.check('description', 'Description value is empty').notEmpty();
    req.check('amount', 'Amount value is empty').notEmpty();
    req.check('amount', 'Non numeric amount').isNumeric();
    req.check('month', 'Month value is empty').notEmpty();
    req.check('month', 'Non alpha amount').isAlpha();
    req.check('year', 'Year value is empty').notEmpty();
    req.check('year', 'Non numeric amount').isNumeric();

    let errors = req.validationErrors();
    
    if (errors) {
        return res.status(422).json({ errors: errors });
    } else {
        let expense = new Expense({
            description: req.body.description,
            amount: req.body.amount,
            month: req.body.month,
            year: req.body.year
        });
        expense.save((err) => {
            if(err) {
                res.send(err);
            }
            res.json({
                message: 'Expense successfully added!',
                body: expense
            });
        });
    }
}

function updateExpense(req, res) {

    req.check('_id', 'ID value is empty').notEmpty();
    req.check('_id', 'Non alphamumeric ID').isAlphanumeric();
    req.check('description', 'Description value is empty').notEmpty();
    req.check('amount', 'Amount value is empty').notEmpty();
    req.check('amount', 'Non numeric amount').isNumeric();
    req.check('month', 'Month value is empty').notEmpty();
    req.check('month', 'Non alpha amount').isAlpha();
    req.check('year', 'Year value is empty').notEmpty();
    req.check('year', 'Non numeric amount').isNumeric();

    let errors = req.validationErrors();

    if(errors) {
        return res.status(422).json({ errors: errors });
    } else {
        let dataToUpdate = {
            _id: req.body._id,
            description: req.body.description,
            amount: req.body.amount,
            month: req.body.month,
            year: req.body.year    
        };
        Expense
            .updateOne(
                { _id: dataToUpdate._id },
                dataToUpdate,
                (err, result) => {
                    if(err) {
                        res.send(err);
                    }
            res.json({
                message: 'Expense successfully updated!',
                body: dataToUpdate,
                result
            });
        });
       
    }
}

function deleteExpense(req, res) {
    Expense
        .remove(
            {_id: req.params.id},
            (err, result) => {
                if(err) {
                    res.send(err);
                }
        res.json({
            message: 'Expense successfully deleted!'
        });
    });    
}

module.exports = {
    getExpense,
    getExpenses,
    insertExpense,
    updateExpense,
    deleteExpense,
};
