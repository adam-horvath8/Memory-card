import Card from "./Card";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Tilt from "react-parallax-tilt";

import Message from "./Message";
import blackHotel from "./assets/black-hotel.jpg";
import blackSign from "./assets/black-sign.jpg";
import greenLamb from "./assets/green-lamb.jpg";
import grey from "./assets/grey.jpg";
import orange from "./assets/orange.jpg";
import redCity from "./assets/red-city.jpg";
import red from "./assets/red.jpg";
import white from "./assets/white.jpg";
import yellowLamb from "./assets/yellow-lamb.jpg";
import yellow from "./assets/yellow.jpg";

function App() {
  const cards = [
    { pic: blackHotel, name: "Black Jack", id: uuidv4() },
    { pic: blackSign, name: "Knigth Rider", id: uuidv4() },
    { pic: greenLamb, name: "Green Lambo", id: uuidv4() },
    { pic: grey, name: "Grey Lambo", id: uuidv4() },
    { pic: orange, name: "Orange Lambo", id: uuidv4() },
    { pic: redCity, name: "Red Devil", id: uuidv4() },
    { pic: red, name: "Ferrari", id: uuidv4() },
    { pic: white, name: "White Lambo", id: uuidv4() },
    { pic: yellowLamb, name: "Yellow Lambo", id: uuidv4() },
    { pic: yellow, name: "Yellow Ferrari", id: uuidv4() },
  ];

  const [displayedCards, setDisplayedCards] = useState(cards);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [cardsPicked, setCardsPicked] = useState([]);
  const [losing, setLosing] = useState(false);
  const [winning, setWinning] = useState(false);

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
        <div className="score-div">
          <span className="score">Score: {score}</span>
          <span className="highest:score">Highest Score: {highestScore}</span>
        </div>
      </header>
      <hr />

      <div className="main-div">
        {displayedCards.map((card) => (
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.75}
            glareColor="#ffffff"
            glarePosition="all"
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
          >
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
          </Tilt>
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
