import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Leaderboard = () => {
    const navigate = useNavigate();
    const startQuiz = () => {
        navigate('/');
      };
    const[leaderboard,setLeaderboard]= useState([]);

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('leaderboard'))|| [];
    storedData.sort((a,b)=>b.score-a.score);
    setLeaderboard(storedData)
  },[]);
  
    return (
    
    <div className='leaderboard'>
        <h2>Leaderboard</h2>
        <table>
            <tbody>
                {leaderboard.map((user,index)=>(
                    <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <button onClick={startQuiz}>Start Quiz</button>
      
    </div>
  )
}

export default Leaderboard
