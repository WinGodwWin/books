const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RouteBooks = require('./src/router/book')
const RouteUsers = require('./src/router/user')
const RouteAuth = require('./src/router/auth')


mongoose.connect('mongodb+srv://winnie:nodejs123@cluster0.zxq1bgc.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log('Connection success');
    }).catch((error) => {
        console.log(error);
        process.exit()
    });

app.use(bodyParser.json());

app.use('/api/books', RouteBooks)
app.use('/api/auth', RouteAuth)
app.use('/api/user', RouteUsers)


module.exports = app;