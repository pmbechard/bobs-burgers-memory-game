import { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

function App() {
  const [best, setBest] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  let characterIndexList = [];

  useEffect(() => {
    if (level < 1) setLevel(1);
    const loadCards = async () => {
      await fetchCharacters();
    };
    loadCards();
    checkBestLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const checkBestLevel = () => {
    if (level > best + 1) setBest(level);
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
    } else {
      while (newCharacters.length < 5) {
        let i = Math.round(Math.random() * 501);
        if (!characterIndexList.includes(i)) {
          let newCharacterData = await fetch(
            `https://bobsburgers-api.herokuapp.com/characters/${i}`
          );
          newCharacterData = await newCharacterData.json();
          const newCharacterObj = {
            name: newCharacterData.name,
            img: newCharacterData.image,
          };
          newCharacters.push(newCharacterObj);
          characterIndexList.push(newCharacterObj.id);
        }
      }
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
  };

  const handleCardClick = (e) => {
    console.log(`clicked: ${e.target.id}`);
  };

  return (
    <div>
      <TitleBar />
      <ScoreBoard restart={restart} level={level} best={best} />
      <GameBoard cards={currentCharacters} click={handleCardClick} />
      <Footer />
    </div>
  );
}

export default App;
