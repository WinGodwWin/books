const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const RouteBooks = require('./src/router/book')
const RouteUsers = require('./src/router/user')
const RouteAuth = require('./src/router/auth')
const cors = require('cors');
const app = express();

let corsOptions = {
    origin: "http://localhost:4200"
}

app.use(cors(corsOptions))

app.use(express.json());

mongoose.connect('mongodb+srv://winnie:nodejs123@cluster0.zxq1bgc.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log('Connection success');
    }).catch((error) => {
        console.log(error);
        process.exit()
    });

// app.use(bodyParser.json());

app.use('/api/books', RouteBooks)
app.use('/api/auth', RouteAuth)
app.use('/api/user', RouteUsers)


module.exports = app;