import React, { useEffect, useState } from 'react';

import '../public/question.css';

function Question({
  question, difficulty, score, highscore, setScore
}) {
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);

  useEffect(() => {
    const allDefinitions = [question.definitions, ...question.incorrect_definitions];
    const shuffled = shuffleArray(allDefinitions);
    setShuffledDefinitions(shuffled);
  }, [question]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
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

  return (
    <div>
      <h2>{question.terms}</h2>
      {shuffledDefinitions.map((definition, index) => (
        <button key={index} className="definition-button">{definition}</button>
      ))}
    </div>
  );
}
export default Question;
