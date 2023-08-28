import Card from "./Card";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Message from "./LosingMessage";

function App() {
  const cards = [
    { pic: "1p", name: "1", id: uuidv4() },
    { pic: "2p", name: "2", id: uuidv4() },
    { pic: "3p", name: "3", id: uuidv4() },
    { pic: "4p", name: "4", id: uuidv4() },
    { pic: "5p", name: "5", id: uuidv4() },
    { pic: "6p", name: "6", id: uuidv4() },
    { pic: "7p", name: "7", id: uuidv4() },
    { pic: "8p", name: "8", id: uuidv4() },
    { pic: "9p", name: "9", id: uuidv4() },
    { pic: "10p", name: "10", id: uuidv4() },
  ];

  const [displayedCards, setDisplayedCards] = useState(cards);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [cardsPicked, setCardsPicked] = useState([]);
  const [losing, setLosing] = useState(false);
  const [winning, setWinning] = useState(false);

  console.log(displayedCards);
  console.log(cardsPicked);
  console.log(losing);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (cardsPicked.length > 0) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [cardsPicked]);

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  }, [score]);

  useEffect(() => {
    if (score === displayedCards.length) {
      setWinning(true);
    }

    return () => setWinning(false);
  }, [score, displayedCards.length]);

  return (
    <>
      <header>
        <h1>Memory Card</h1>
        <span className="score">Score:{score}</span>
        <span className="highest:score">Highest Score:{highestScore}</span>
      </header>
      <hr />

      <div className="main-div">
        {displayedCards.map((card) => (
          <Card
            setDisplayedCards={setDisplayedCards}
            displayedCards={displayedCards}
            shuffleArray={shuffleArray}
            setCardsPicked={setCardsPicked}
            setScore={setScore}
            setLosing={setLosing}
            key={card.id}
            id={card.id}
            picture={card.pic}
            name={card.name}
          />
        ))}
      </div>
      {losing && (
        <Message
          playAgainFunction={setLosing}
          message="You lost!"
          setScore={setScore}
          setCardsPicked={setCardsPicked}
        />
      )}
      {winning && (
        <Message
          playAgainFunction={setWinning}
          message="You won!"
          setScore={setScore}
          setCardsPicked={setCardsPicked}
        />
      )}
    </>
  );
}

export default App;
