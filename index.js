
const express = require('express');
const bodyParser = require('body-parser');
const env = require('./src/environments/environment');
const routes = require('./routes');
const path = require('path');
const atob = require('atob');

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || env.PORT, () => {
    console.log('Server is up and running on port numner ' + env.PORT);
});

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

app.use('/api', routes);
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/orsave/${req.url}`));
    } else {
        res.sendFile(path.resolve('dist/orsave/index.html'));
    }
});

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect(env.mongoDBUrl, { useNewUrlParser: true, user: env.user, pass: atob(env.pass) });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
