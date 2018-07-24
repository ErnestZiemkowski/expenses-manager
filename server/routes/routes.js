const express = require('express');
const router = express.Router();
const expenseService = require('../services/expenseServices');

router.get('/', (req, res) => {
    res.render('index')
});

router.route('/expense/:id')
    .get((req, res) => {expenseService.getExpense(req,res)})
    .delete((req, res) => {expenseService.deleteExpense(req, res)})
    .put((res, req) => {expenseService.updateExpense(res, req)});

router.route('/expense')
    .post((req, res) => {expenseService.insertExpense(req, res)});

router.route('/expenses/:month/:year')
    .get((req, res) => {expenseService.getExpenses(req, res)});

module.exports = router;
