import { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';
import LoadingIcon from './components/LoadingIcon';
import GameOverModal from './components/GameOverModal';
import InfoModal from './InfoModal';

function App() {
  const [best, setBest] = useState(localStorage.getItem('best') || '0');
  const [level, setLevel] = useState(1);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [getBurger, setBurger] = useState(null);
  const [getCommonCharacterIndex, setCommonCharacterIndex] = useState(0);
  const [commonCharacters, setCommonCharacters] = useState(
    [
      48, 276, 281, 171, 477, 230, 231, 468, 323, 506, 60, 394, 313, 170, 441,
      233, 187, 207, 467, 50, 411, 296, 110, 421, 159, 142, 315, 45, 98, 192,
      148, 189,
    ].sort(() => Math.random() - 0.5)
  );

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
    if (getBurger === null) getBurgerOfTheDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedCards]);

  const checkBestLevel = () => {
    if (level > parseInt(best) + 1) setBest(level - 1);
    localStorage.setItem('best', `${level - 1}`);
  };

  const fetchCharacters = async () => {
    if (currentCharacters.length >= level * 5) return;
    const newCharacters = [];
    const newIndices = generateIndices();
    for (let i = 0; i < 5; i++) {
      let newCharacterData = await fetch(
        `https://bobsburgers-api.herokuapp.com/characters/${newIndices[i]}`
      );
      newCharacterData = await newCharacterData.json();
      const newCharacterObj = {
        id: newCharacterData.id,
        name: newCharacterData.name,
        img: newCharacterData.image,
      };
      newCharacters.push(newCharacterObj);
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

  const generateIndices = () => {
    // FIXME: might have a duplication error at level 7
    const currentCharacterIndices = currentCharacters.map((character) => {
      return parseInt(character.id);
    });
    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (commonCharacters.length - 2 > getCommonCharacterIndex) {
        arr.push(commonCharacters[getCommonCharacterIndex + i]);
      } else {
        const index = Math.floor(Math.random() * 502) + 1;
        if (
          arr.indexOf(index) === -1 &&
          currentCharacterIndices.indexOf(index) === -1
        )
          arr.push(index);
      }
    }
    setCommonCharacterIndex(getCommonCharacterIndex + 5);
    return arr;
  };

  const restart = () => {
    setCurrentCharacters([]);
    setLevel(0);
    setClickedCards([]);
    setIsGameOver(false);
    setBurger(null);
    setCommonCharacterIndex(0);
    setCommonCharacters(
      [
        48, 276, 281, 171, 477, 230, 231, 468, 323, 506, 60, 394, 313, 170, 441,
        233, 187, 207, 467, 50, 411, 296, 110, 421, 159, 142, 315, 45, 98, 192,
        148, 189,
      ].sort(() => Math.random() - 0.5)
    );
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
    let i = parseInt(Math.random() * 333 + 1);
    if (i === 173) i++;
    const botdData = await fetch(
      `https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${i}`
    );
    const botdJSON = await botdData.json();
    setBurger(botdJSON.name);
  };

  const openInfoModal = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <div>
      <TitleBar info={openInfoModal} />
      <ScoreBoard
        restart={restart}
        level={level}
        best={best}
        streak={calculateStreak(level - 1) + clickedCards.length}
      />
      <GameBoard
        cards={currentCharacters}
        click={handleCardClick}
        display={
          !isLoading && !isGameOver && !isInfoOpen ? 'visible' : 'hidden'
        }
      />
      <LoadingIcon loading={isLoading} />
      {isGameOver ? <GameOverModal restart={restart} botd={getBurger} /> : null}
      {isInfoOpen ? <InfoModal info={openInfoModal} /> : null}
      <Footer />
    </div>
  );
}

export default App;
