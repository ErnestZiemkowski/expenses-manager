const { check } = require('express-validator/check');

const getExpenseValidation = [
    check('id')
        .not()
        .isEmpty()
        .trim()
];

module.exports = {
    getExpenseValidation
};
