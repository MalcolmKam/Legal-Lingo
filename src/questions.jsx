import React, { useEffect, useState } from 'react';
import Question from './question';

function Questions({
  questions, difficulty, score, highscore, setScore
}) {
  return (
    <div>
      <h2>
        Choose the best answer for each term
      </h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          difficulty={difficulty}
          score={score}
          highscore={highscore}
          setScore={setScore}
        />
      ))}
    </div>
  );
}
export default Questions;
