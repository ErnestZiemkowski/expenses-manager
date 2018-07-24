const chai = require('chai');
const chaiHttp = require('chai-http');
const routes = require('../server/routes/routes');
const Expense = require('../server/models/Expense');
const request = require('request');
const should = chai.should();
const baseUrl = 'http://localhost:8000';
const server = require('../server/server');
const assert = require('assert');

chai.use(chaiHttp);

describe('Test API endpoints', function() {
    this.timeout(5000);
    beforeEach(function(done) {
        Expense.remove({}, function(err) {
            done();
        });
    });

    it('Endpoint GET Expense /get should return already created expense by its ID', function(done) {
        let expense = new Expense({
            description: "Test description",
            amount: 3,
            month: "May",
            year: 2018
        });
        expense.save()
            .then(function() {
                // console.log(expense._id);
                chai.request(baseUrl)
                    .get('/get?id=' + expense._id)
                    .send(expense)
                    .end(function(err, res) {
                        res.body.should.have.property('_id').equal(expense._id.toString()).be.a('string');
                        res.body.should.have.property('description').equal(expense.description).be.a('string');
                        res.body.should.have.property('amount').equal(expense.amount).be.a('number');
                        res.body.should.have.property('month').equal(expense.month).be.a('string');
                        res.body.should.have.property('year').equal(expense.year).be.a('number');
                        done();
                });
            });
    });
    it('Endpoint POST Expense /insert should save an Expense to database', function(done) {
        let expense = {
            description: 'Test description jwt',
            amount: 15,
            month: 'September',
            year: 2019
        };
        chai.request(baseUrl)
            .post('/insert')
            .send(expense)
            .end(function(err, res) {
                res.should.have.status(200);
                let data = JSON.parse(res.text);
                data.message.should.equal('Expense successfully added!').be.a('string');
                data.body.should.have.property('description').equal(expense.description).be.a('string');
                data.body.should.have.property('amount').equal(expense.amount).be.a('number');
                data.body.should.have.property('month').equal(expense.month).be.a('string');
                data.body.should.have.property('year').equal(expense.year).be.a('number');
                done();
            });
    });
    it('Endpoint DELETE Expense /delete should remove an Expenese from database', function(done) {
        let expense = new Expense({
            description: "Test expense description to delete",
            amount: 60,
            month: "March",
            year: 2018
        });
        expense.save()
            .then(function() {
                chai.request(baseUrl)
                    .delete('/delete?id=' + expense._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        let data = JSON.parse(res.text);
                        data.message.should.equal('Expense successfully deleted!').be.a('string');
                        done();
                    });
            });
    });
    it('Endpoint PUT Expense /update should update an Expense in database', function(done) {
        this.timeout(15000);
        let expense = new Expense({
            description: "Test expense description to update",
            amount: 50,
            month: "January",
            year: 2018            
        });
        let updateData = {
            _id: expense._id,
            description: 'Updated data',
            amount: 69,
            month: 'April',
            year: 2016
        };
        expense.save()
            .then(function() {
                chai.request(baseUrl)
                    .post('/update')
                    .send(updateData)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        let data = JSON.parse(res.text);
                        data.message.should.equal('Expense successfully updated!').be.a('string');
                        data.body.should.have.property('description').equal(updateData.description).be.a('string');
                        data.body.should.have.property('amount').equal(updateData.amount).be.a('number');
                        data.body.should.have.property('month').equal(updateData.month).be.a('string');
                        data.body.should.have.property('year').equal(updateData.year).be.a('number');
                        done();
                    });
            });
    });
    it('Endpoint GET Expense /getAll should return list of Expenses filtered by', function(done) {
        this.timeout(15000);
        let expenses = [
            {
                description: "Test expense no 1",
                amount: 169,
                month: "October",
                year: 2020       
            },
            {
                description: "Test expense no 2",
                amount: 169,
                month: "October",
                year: 2020       
            },
            {
                description: "Test expense no 3",
                amount: 169,
                month: "October",
                year: 2020       
            },
            {
                description: "Test expense no 4",
                amount: 169,
                month: "October",
                year: 2020       
            },
            {
                description: "Test expense no 5",
                amount: 169,
                month: "October",
                year: 2020       
            },
            {
                description: "Test expense no 6",
                amount: 169,
                month: "October",
                year: 2020       
            }
        ];
        Expense.insertMany(expenses)
            .then(function() {
                chai.request(baseUrl)
                    .get('/getAll?month=October&year=2020')
                    .end(function(err, res) {
                        console.log(res);
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.equal(expenses.length);
                        done();
                    });
            });
    });
});
