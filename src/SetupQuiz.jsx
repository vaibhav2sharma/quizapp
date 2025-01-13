
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetupQuiz = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [amount, setAmount] = useState(10);

  const startQuiz = () => {
    navigate('/quiz', { state: { name, category, difficulty, amount } });
  };

  const openLeaderBoard = ()=>{
    navigate('/leaderboard')
  }

  return (
    <div className="setup-quiz">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="25">Arts</option>
          <option value="27">Animals</option>
        </select>
      </label>

      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <label>
        Number of Questions:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <button onClick={startQuiz}>Start Quiz</button>
      <button onClick={openLeaderBoard}>LeaderBoard</button>
      
    </div>
  );
};

export default SetupQuiz;

