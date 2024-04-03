import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('Normal');
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [limit, setLimit] = useState(null);
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (limit && review) {
      axios.get(`/law-quiz/legal-terms?sort=${review}&limit=${limit}`)
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
      axios.get(`/law-quiz/legal-terms?sort=${review}`)
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

  const updateScore = (event) => {
    event.preventDefault();
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > highscore) {
      axios.put('/law-quiz/highscores', { difficulty, score: newScore })
        .then(() => axios.get('/law-quiz/highscores'))
        .then((response) => {
          if (difficulty === 'Normal') {
            setHighscore(response.data[0].score);
          } else {
            setHighscore(response.data[1].score);
          }
          console.log('Highscore updated successfully');
        })
        .catch((err) => {
          console.error('Failed to update highscore ', err);
        });
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
      <div>
        <h1>Legal Lingo</h1>
      </div>
      <div>
        <h2>
          Difficulty:
          {' '}
          {difficulty}
        </h2>
      </div>
      <div>
        <button onClick={changeDifficulty}>Change Difficulty</button>
        <button onClick={changeReview}>
          {review ? 'Review' : 'Standard Mode'}
        </button>
        <select onChange={handleLimitChange}>
          <option value="none">No Limit</option>
          <option value="5">5 terms</option>
          <option value="10">10 terms</option>
          <option value="20">20 terms</option>
          <option value="30">30 terms</option>
          <option value="40">40 terms</option>
          <option value="50">50 terms</option>
        </select>
      </div>
      <div>
        <h2>
          Score:
          {' '}
          {score}
        </h2>
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <h2>
          High Score:
          {' '}
          {highscore}
        </h2>
      </div>
      <div>
        <h1>{questions[0].id}</h1>
      </div>
      <div>
        <ul>
          {questions.map((item) => (
            <li key={item.id}>{item.id}</li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div>
        <h1>Legal Lingo</h1>
      </div>
      <div>
        <h2>
          Difficulty:
          {' '}
          {difficulty}
        </h2>
      </div>
      <div>
        <button onClick={changeDifficulty}>Change Difficulty</button>
        <button onClick={changeReview}>
          {review ? 'Review' : 'Standard Mode'}
        </button>
      </div>
      <div>
        <h2>
          Score:
          {' '}
          {score}
        </h2>
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <h2>
          High Score:
          {' '}
          {highscore}
        </h2>
      </div>
      <div>
        <h1>{questions[0].id}</h1>
      </div>
      <div>
        <ul>
          {questions.map((item) => (
            <li key={item.id}>{item.id}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
