import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import he from 'he'; 

const Quiz = () => {
  const { state } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const shuffleAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  };

 
  useEffect(() => {
    const cacheKey = `${state.amount}_${state.category}_${state.difficulty}`;
    const cachedQuestions = localStorage.getItem(cacheKey);

    if (cachedQuestions) {
      setQuestions(JSON.parse(cachedQuestions));
      setLoading(false);
    } else {
      axios
        .get('https://opentdb.com/api.php', {
          params: {
            amount: state.amount,
            category: state.category,
            difficulty: state.difficulty,
            type: 'multiple',
          },
        })
        .then((response) => {
          const shuffledQuestions = response.data.results.map((q) => ({
            ...q,
            options: shuffleAnswers(q),
          }));
          setQuestions(shuffledQuestions);
          localStorage.setItem(cacheKey, JSON.stringify(shuffledQuestions));
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [state]);

  
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  
  const nextQuestion = () => {
    setSelectedAnswer('');
    setCurrentQuestion((prev) => prev + 1);
  };

  
  useEffect(() => {
    if (currentQuestion === questions.length && questions.length > 0) {
      const newEntry = { name: state.name, score };
      const existingLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      existingLeaderboard.push(newEntry);
      localStorage.setItem('leaderboard', JSON.stringify(existingLeaderboard));
    }
  }, [currentQuestion, questions.length, score, state.name]);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>Sorry, we couldn’t load the quiz. Please try again later.</p>;
  }

  return (
    <div className="quiz">
      {questions.length > 0 && currentQuestion < questions.length ? (
        <>
          <h2>
            Question {currentQuestion + 1} of {state.amount}
          </h2>
          <p>{he.decode(questions[currentQuestion].question)}</p>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswer(option)}
                />
                {he.decode(option)}
              </label>
            ))}
          </div>
          <button onClick={nextQuestion} disabled={!selectedAnswer}>
            Next
          </button>
        </>
      ) : (
        <p>Quiz Completed! Your Score: {score}</p>
      )}
    </div>
  );
};

export default Quiz;
