import { useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

function App() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [level, setLevel] = useState(1);

  return (
    <div>
      <TitleBar />
      <ScoreBoard />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;
