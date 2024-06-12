require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const app = express();

const port = process.env.PORT || 3000;
const mongoDBUrl = process.env.MONGO_DB_URL;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDB setup
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });


//session setup
const store = new MongoDBStore({
    uri: mongoDBUrl,
    collection: 'sessions',
});

store.on('error', function (error) {
    console.error(error);
});

// Middleware
app.use(
    session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

//routes to views

app.use('/', viewRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`server run on port ${port}`);
});