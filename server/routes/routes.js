const express = require('express');
const router = express.Router();
const { getExpense, getExpenses, insertExpense, updateExpense, deleteExpense  } = require('../services/expenseServices');

router.get('/', (req, res) => {
    res.render('index')
});

router.route('/expense/:id')
    .get((req, res) => {getExpense(req,res)})
    .delete((req, res) => {deleteExpense(req, res)})
    // .put((res, req) => {updateExpense(res, req)});

router.route('/expense')
    .post((req, res) => {insertExpense(req, res)})
    .put((res, req) => {updateExpense(res, req)});

router.route('/expenses/:month/:year')
    .get((req, res) => {getExpenses(req, res)});

module.exports = router;
