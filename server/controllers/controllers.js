const models = require('../models/models');

exports.getTermsAndIncorrect = async (req, res) => {
  const { limit } = req.query;
  let { sort } = req.query;
  if (!sort) {
    sort = 'random()';
  }
  models.getTermsAndIncorrect(sort, limit)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Failed to fetch terms and incorrect definitions ', err);
    });
};

exports.getHighscores = (req, res) => {
  models.getHighscores()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Failed to fetch highscores ', err);
    });
};

exports.updateHighscore = (req, res) => {
  const { difficulty, score } = req.body;
  models.updateHighscore(difficulty, score)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error('Failed to update highscore ', err);
    });
};
