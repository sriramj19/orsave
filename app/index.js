
const express = require('express');
const bodyParser = require('body-parser');
const env = require('./src/environments/environment');
const routes = require('./routes');

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(env.PORT, () => {
    console.log('Server is up and running on port numner ' + env.PORT);
});

app.use('/', routes);

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect(env.mongoDBUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
