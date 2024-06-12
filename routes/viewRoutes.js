const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

router.get('/', isAuthenticated, (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;