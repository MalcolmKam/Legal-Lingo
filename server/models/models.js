const connection = require('../db/db');



exports.getTermsAndIncorrect = (sort, limit) => new Promise((resolve, reject) => {
  let query = `
    SELECT terms.terms, incorrect.definitions
    FROM terms
    LEFT JOIN incorrect ON terms.id = incorrect.term_id
    ORDER BY ${sort};
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

exports.getHighscores = () => new Promise((resolve, reject) => {
  const query = `
    SELECT *
    FROM highscores;
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
  connection.query(query, [difficulty, score], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results.rowCount);
    }
  });
});
