import { useEffect, useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

function App() {
  const [best, setBest] = useState(0);
  const [level, setLevel] = useState(0);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const characterIndexList = [];

  useEffect(() => {
    const loadCards = async () => {
      await fetchCharacters();
    };

    loadCards();
    if (level > best) {
      setBest(level);
    }
    setLevel(level + 1);
  }, []);

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
        }
      }
    }
    setCurrentCharacters(currentCharacters.concat(shuffleList(newCharacters)));
  };

  const shuffleList = (characterList) => {
    for (let i = characterList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = characterList[i];
      characterList[i] = characterList[j];
      characterList[j] = temp;
    }
    return characterList;
  };

  return (
    <div>
      <TitleBar />
      <ScoreBoard />
      <GameBoard cards={currentCharacters} />
      <Footer />
    </div>
  );
}

export default App;
