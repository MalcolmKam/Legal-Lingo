import React, { useEffect, useState } from 'react';
import Question from './question';
import '../public/questions.css';

function Questions({
  questions, difficulty, score, highscore, setScore, setHighscore, limit
}) {
  return (
    <div className={difficulty === 'Hard' && 'bad'}>
      {difficulty === 'Normal' ? (
        <h2>
          Choose the best answer
        </h2>
      ) : (
        <h2 className="oh-no">
          Type the correct definition
        </h2>
      )}
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
            limit={limit}
          />
        ))}
      </div>
    </div>
  );
}
export default Questions;
