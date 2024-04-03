import React, { useEffect, useState } from 'react';
import Question from './question';
import '../public/questions.css';

function Questions({
  questions, difficulty, score, highscore, setScore, setHighscore
}) {
  return (
    <div className="container">
      <h2>
        Choose the best answer for each term
      </h2>
      <div className="all-questions">
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            difficulty={difficulty}
            score={score}
            highscore={highscore}
            setScore={setScore}
            setHighscore={setHighscore}
          />
        ))}
      </div>
    </div>
  );
}
export default Questions;
