const router = require('express').Router();
const { User, Log } = require('../../models');

// find all user 
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Log }],
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//create account
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            req.session.name = userData.firstName 

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
// login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
    
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
  
module.exports = router;
  