const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Invalid credentials');
            }
            req.session.userId = user._id;
            res.send('Login successful');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Login failed');
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, location });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Registration failed');
    }

})

module.exports = router;