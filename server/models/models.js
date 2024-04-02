const connection = require('../db/db');

//for reference
// CREATE TABLE IF NOT EXISTS terms (
//   id SERIAL PRIMARY KEY,
//   terms VARCHAR(255) UNIQUE,
//   definitions TEXT,
//   learning INT DEFAULT 0
// );

// CREATE TABLE IF NOT EXISTS incorrect (
//   id SERIAL PRIMARY KEY,
//   definitions TEXT,
//   term_id INT REFERENCES terms(id)
// );

// CREATE TABLE IF NOT EXISTS highscores (
//   id SERIAL PRIMARY KEY,
//   difficulty VARCHAR(255) UNIQUE,
//   score INT DEFAULT 0
// );

exports.getTermsAndIncorrect = (sort, limit) => new Promise((resolve, reject) => {
  let query = `
    SELECT terms.terms, terms.definitions, ARRAY_AGG(incorrect.definitions) AS incorrect_definitions
    FROM terms
    LEFT JOIN incorrect ON terms.id = incorrect.term_id
    GROUP BY terms.terms, terms.definitions
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
