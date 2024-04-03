const connection = require('../db/db');

exports.getTermsAndIncorrect = (sort, limit) => new Promise((resolve, reject) => {
  let query = `
    SELECT terms.id, terms.terms, terms.definitions, ARRAY_AGG(incorrect.definitions) AS incorrect_definitions, terms.learning
    FROM terms
    LEFT JOIN incorrect ON terms.id = incorrect.term_id
    GROUP BY terms.id, terms.terms, terms.definitions, terms.learning
    ORDER BY ${sort}
  `;
  let params;
  if (limit) {
    query += `
      LIMIT $1;
    `;
    params = [limit];
  }
  connection.query(query, params, (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results.rows);
    }
  });
});

exports.incrementLearning = (termId) => new Promise((resolve, reject) => {
  const query = `
    UPDATE terms
    SET learning = learning + 1
    WHERE id = $1;
  `;
  connection.query(query, [termId], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results.rowCount);
    }
  });
});

exports.decrementLearning = (termId) => new Promise((resolve, reject) => {
  const query = `
    UPDATE terms
    SET learning = learning - 1
    WHERE id = $1;
  `;
  connection.query(query, [termId], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results.rowCount);
    }
  });
});

exports.getHighscores = () => new Promise((resolve, reject) => {
  const query = `
    SELECT *
    FROM highscores
    ORDER BY id;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results.rows);
    }
  });
});

exports.updateHighscore = (difficulty, score) => new Promise((resolve, reject) => {
  const query = `
    UPDATE highscores
    SET score = $2
    WHERE difficulty = $1;
  `;
  connection.query(query, [difficulty.toLowerCase(), score], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results.rowCount);
    }
  });
});
