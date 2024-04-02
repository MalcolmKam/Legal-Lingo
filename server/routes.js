const express = require('express');

const router = express.Router();
const controllers = require('./controllers/controllers');

router.get('/legal-terms', controllers.getTermsAndIncorrect);

router.get('/highscores', controllers.getHighscores);

router.put('/highscores', controllers.updateHighscore);

module.exports = router;
