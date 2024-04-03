\c law

CREATE TABLE IF NOT EXISTS terms (
  id SERIAL PRIMARY KEY,
  terms VARCHAR(255) UNIQUE,
  definitions TEXT,
  learning INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS incorrect (
  id SERIAL PRIMARY KEY,
  definitions TEXT,
  term_id INT REFERENCES terms(id)
);

CREATE TABLE IF NOT EXISTS highscores (
  id SERIAL PRIMARY KEY,
  difficulty VARCHAR(255) UNIQUE,
  score INT DEFAULT 0
);