import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Leaderboard from "./Leaderboard";
import Quiz from "./Quiz";
import SetupQuiz from "./SetupQuiz";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={SetupQuiz} />
          <Route path="/quiz" exact Component={Quiz} />
          <Route path="/leaderboard" exact Component={Leaderboard} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
