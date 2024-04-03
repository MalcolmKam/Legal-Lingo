import React, { useEffect, useState } from 'react';
import Questions from './questions';
import axios from 'axios';
import '../public/app.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('Normal');
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [limit, setLimit] = useState(null);
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (limit && review) {
      axios.get(`/law-quiz/legal-terms?sort=learning&limit=${limit}`)
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((err) => {
          console.error('Failed to fetch questions ', err);
        });
    }
    if (limit && !review) {
      axios.get(`/law-quiz/legal-terms?limit=${limit}`)
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((err) => {
          console.error('Failed to fetch questions ', err);
        });
    }
    if (!limit && review) {
      axios.get('/law-quiz/legal-terms?sort=learning')
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((err) => {
          console.error('Failed to fetch questions ', err);
        });
    }
    if (!limit && !review) {
      axios.get('/law-quiz/legal-terms')
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((err) => {
          console.error('Failed to fetch questions ', err);
        });
    }
    axios.get('/law-quiz/highscores')
      .then((response) => {
        if (difficulty === 'Normal') {
          setHighscore(response.data[0].score);
        } else {
          setHighscore(response.data[1].score);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch highscores ', err);
      });

    setScore(0);
  }, [review, limit, difficulty]);

  if (questions.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const changeDifficulty = (event) => {
    event.preventDefault();
    if (difficulty === 'Normal') {
      setDifficulty('Hard');
    } else {
      setDifficulty('Normal');
    }
  };

  const changeReview = (event) => {
    event.preventDefault();
    setReview(!review);
  };

  const changeLimit = (value) => {
    setLimit(value === 'none' ? null : parseInt(value, 10));
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    changeLimit(newLimit);
  };

  return (
    <>
      <div className="banner">
        <h1 className="title">Legal Lingo</h1>
        <div className="score-difficulty">
          <h2>Difficulty: {difficulty}</h2>
          <button className="button" onClick={changeDifficulty}>
            Change Difficulty
          </button>
          <button className="button" onClick={changeReview}>
            {review ? 'Review Mode' : 'Standard Mode'}
          </button>
          <select className="select" onChange={handleLimitChange}>
            <option value="none">No Limit</option>
            <option value="5">5 terms</option>
            <option value="10">10 terms</option>
            <option value="20">20 terms</option>
            <option value="30">30 terms</option>
            <option value="40">40 terms</option>
            <option value="50">50 terms</option>
          </select>
        </div>
      </div>
      <div className="banner">
        <h2>
          Score out of {questions.length}: {score}
        </h2>
        <h2>High Score: {highscore}</h2>
      </div>
      <div>
        <Questions
          questions={questions}
          difficulty={difficulty}
          score={score}
          highscore={highscore}
          setHighscore={setHighscore}
          setScore={setScore}
          limit={limit}
        />
      </div>
    </>
  );
}

export default App;
