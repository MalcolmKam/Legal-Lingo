\c law

CREATE TABLE IF NOT EXISTS terms (
  id SERIAL PRIMARY KEY,
  term VARCHAR(255) UNIQUE,
  definitions TEXT
);

CREATE TABLE IF NOT EXISTS incorrect (
  id SERIAL PRIMARY KEY,
  definitions TEXT,
  term_id INT REFERENCES terms(id)
);