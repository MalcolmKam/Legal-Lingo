const express = require('express');

const router = express.Router();
const controllers = require('./controllers/controllers');

router.get('/legal-terms', controllers.getTermsAndIncorrect);

router.get('/highscores', controllers.getHighscores);

router.put('/highscores', controllers.updateHighscore);

router.put('/increment-learning', controllers.incrementLearning);

router.put('/decrement-learning', controllers.decrementLearning);

module.exports = router;
