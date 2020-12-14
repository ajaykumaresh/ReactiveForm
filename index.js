const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/api');
const mongoose = require('mongoose');
const port = 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));



mongoose.connect('mongodb://localhost:27017/formValidation', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database ');
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});
app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is working on ${port} `)
});