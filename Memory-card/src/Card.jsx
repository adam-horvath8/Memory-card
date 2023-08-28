import React from "react";

const Card = ({
  picture,
  name,
  setDisplayedCards,
  displayedCards,
  shuffleArray,
  id,
  setCardsPicked,
  setScore,
  setLosing,
}) => {
  const shuffleAndSetCards = () => {
    const shuffledArray = shuffleArray(displayedCards);
    setDisplayedCards(shuffledArray);
  };

  const handlePickedCard = (id) => {
    const pickedCard = displayedCards.find((card) => card.id === id);
    setCardsPicked((prevPickedCards) => {
      if (prevPickedCards.includes(pickedCard)) {
        setLosing(true);
        return [];
      } else {
        return [...prevPickedCards, pickedCard];
      }
    });
  };

  const handleClick = () => {
    handlePickedCard(id);
    shuffleAndSetCards();
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-picture">{picture}</div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default Card;
