const Expense = require('../models/Expense');

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

function updateExpense(req, res) {
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
