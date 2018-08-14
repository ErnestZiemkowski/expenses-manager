const express = require('express');
const router = require('./routes/routes.js');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const expensesValidator = require('express-validator');

// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/public'));
app.use(cors());
// app.use(express.static(path.join(__dirname, '../client/public')));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
      });
}









app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(expensesValidator());
app.use('/', router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server listens on port: ' + port);
});

mongoose.connect('mongodb://ernest:dupadupa1@ds135061.mlab.com:35061/expenses-manager', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

module.exports = app;
