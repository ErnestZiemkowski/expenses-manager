const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true},
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true }
});

module.exports = mongoose.model('Expense', expenseSchema);
