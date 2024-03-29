const router = require('express').Router();
const user = require('../models/User');
const log = require('../models/Log');
const workout = require('../models/Workout');


router.get('/', async (req, res) => {
  try {
    res.render('homepage', { loggedIn: req.session.loggedIn });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.render('homepage')
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  if (!req.session.loggedIn) {
    console.log('not loggin')
    res.redirect('/login');
  } else {
    try {
      const userdata = await user.findAll({ where: { id: req.session.user_id } });
      const datas = userdata.map((data) => data.get({ plain: true }));
      const logdata = await log.findAll({ where: { user_id: req.session.user_id } });
      const logdatas = logdata.map((data) => data.get({plain: true}));
      res.render('profile',{
        loggedIn: req.session.loggedIn,
        datas,
        logdatas
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get('/log', async (req, res) => {
  try {
    res.render('log',{
      loggedIn: req.session.loggedIn
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;