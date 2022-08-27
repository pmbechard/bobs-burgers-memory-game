import { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';
import LoadingIcon from './components/LoadingIcon';
import GameOverModal from './components/GameOverModal';

// FIXME: Doubles appearing in character cards
// TODO: Add common characters for first 30 levels
// TODO: Add Info modal component
// TODO: Add GameOver modal component with random burger coupon
// FIXME: GitHub logo not appearing in Footer component

function App() {
  const [best, setBest] = useState(localStorage.getItem('best') || '0');
  const [level, setLevel] = useState(1);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [getBOTD, setBOTD] = useState(null);
  let characterIndexList = [];

  useEffect(() => {
    if (level < 1) setLevel(1);
    const loadCards = async () => {
      setIsLoading(true);
      await fetchCharacters();
      setIsLoading(false);
    };
    loadCards();
    checkBestLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    shuffleList();
    if (clickedCards.length === level * 5) {
      setClickedCards([]);
      setLevel(level + 1);
    }
    if (getBOTD === null) {
      getBurgerOfTheDay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedCards]);

  const checkBestLevel = () => {
    if (level > parseInt(best) + 1) {
      setBest(level - 1);
    }
    localStorage.setItem('best', `${level - 1}`);
  };

  const fetchCharacters = async () => {
    const newCharacters = [];
    if (currentCharacters.length === 0) {
      const defaultCharacters = [48, 276, 281, 171, 477];
      for (const i of defaultCharacters) {
        let newCharacterData = await fetch(
          `https://bobsburgers-api.herokuapp.com/characters/${i}`
        );
        newCharacterData = await newCharacterData.json();
        const newCharacterObj = {
          id: newCharacterData.id,
          name: newCharacterData.name,
          img: newCharacterData.image,
        };
        newCharacters.push(newCharacterObj);
        characterIndexList.push(newCharacterObj.id);
      }
    } else if (currentCharacters.length < level * 5) {
      while (newCharacters.length < 5) {
        let i = Math.round(Math.random() * 500 + 1);
        if (!characterIndexList.includes(`${i}`)) {
          let newCharacterData = await fetch(
            `https://bobsburgers-api.herokuapp.com/characters/${i}`
          );
          newCharacterData = await newCharacterData.json();
          const newCharacterObj = {
            id: newCharacterData.id,
            name: newCharacterData.name,
            img: newCharacterData.image,
          };
          newCharacters.push(newCharacterObj);
          characterIndexList.push(newCharacterObj.id);
        }
      }
    } else {
      return;
    }
    shuffleList(currentCharacters.concat(newCharacters));
  };

  const shuffleList = (characterList = currentCharacters) => {
    for (let i = characterList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = characterList[i];
      characterList[i] = characterList[j];
      characterList[j] = temp;
    }
    setCurrentCharacters(characterList);
  };

  const restart = () => {
    characterIndexList = [];
    setCurrentCharacters([]);
    setLevel(0);
    setClickedCards([]);
    setIsGameOver(false);
    setBOTD(null);
  };

  const handleCardClick = (e) => {
    if (clickedCards.includes(e.target.id)) {
      gameOver();
    } else {
      shuffleList();
      setClickedCards(clickedCards.concat(e.target.id));
    }
  };

  const gameOver = () => {
    setIsGameOver(true);
  };

  const calculateStreak = (lvl) => {
    if (lvl < 1) return 0;
    if (lvl === 1) return 5;
    return lvl * 5 + calculateStreak(lvl - 1);
  };

  const getBurgerOfTheDay = async () => {
    const i = parseInt(Math.random() * 333 + 1);
    const botdData = await fetch(
      `https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${i}`
    );
    const botdJSON = await botdData.json();
    setBOTD(botdJSON.name);
  };

  return (
    <div>
      <TitleBar />
      <ScoreBoard
        restart={restart}
        level={level}
        best={best}
        streak={calculateStreak(level - 1) + clickedCards.length}
      />
      <GameBoard
        cards={currentCharacters}
        click={handleCardClick}
        display={!isLoading ? 'visible' : 'hidden'}
      />
      <LoadingIcon loading={isLoading} />
      {isGameOver ? <GameOverModal restart={restart} botd={getBOTD} /> : null}
      <Footer />
    </div>
  );
}

export default App;
