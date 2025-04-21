import React from "react";

import "../styles/index.css";

const Puzzle = () => {
  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "0",
  ];

  const shuffledNumbers = numbers.sort((a, b) => 0.5 - Math.random());
  console.log("shuffledNumbers : ", shuffledNumbers);

  const [playNumbers, setPlayNumbers] = React.useState([
    [
      shuffledNumbers[0],
      shuffledNumbers[1],
      shuffledNumbers[2],
      shuffledNumbers[3],
    ],
    [
      shuffledNumbers[4],
      shuffledNumbers[5],
      shuffledNumbers[6],
      shuffledNumbers[7],
    ],
    [
      shuffledNumbers[8],
      shuffledNumbers[9],
      shuffledNumbers[10],
      shuffledNumbers[11],
    ],
    [
      shuffledNumbers[12],
      shuffledNumbers[13],
      shuffledNumbers[14],
      shuffledNumbers[15],
    ],
  ]);

  const FindZeroIndices = () => {
    for (let i = 0; i < playNumbers.length; i++) {
      for (let j = 0; j < playNumbers[i].length; j++) {
        if (playNumbers[i][j] === "0") {
          return [i, j];
        }
      }
    }
  };

  let [zeroRowIndex, zeroColumnIndex] = FindZeroIndices();
  console.log("indices : ", [zeroRowIndex, zeroColumnIndex]);

  const findClickAllowedIndices = (zeroRowIndex, zeroColumnIndex) => {
    let allowedIndices = [];
    let topRowIndex = zeroRowIndex - 1;
    let topColumnIndex = zeroColumnIndex;
    if (topRowIndex >= 0) {
      allowedIndices.push([topRowIndex, topColumnIndex]);
    }
    let bottomRowIndex = zeroRowIndex + 1;
    let bottomColumnIndex = zeroColumnIndex;
    if (bottomRowIndex <= 3) {
      allowedIndices.push([bottomRowIndex, bottomColumnIndex]);
    }
    let leftRowIndex = zeroRowIndex;
    let leftColumnIndex = zeroColumnIndex - 1;
    if (leftColumnIndex >= 0) {
      allowedIndices.push([leftRowIndex, leftColumnIndex]);
    }
    let rightRowIndex = zeroRowIndex;
    let rightColumnIndex = zeroColumnIndex + 1;
    if (rightColumnIndex <= 3) {
      allowedIndices.push([rightRowIndex, rightColumnIndex]);
    }
    console.log("AllowedIndices : ", allowedIndices);
    return allowedIndices;
  };

  let clickableIndices = findClickAllowedIndices(zeroRowIndex, zeroColumnIndex);

  const numberClicked = (rowIndex, columnIndex) => {
    console.log("number clicked");
    let localPlayNumbers = playNumbers.splice(0);
    console.log("local Play numbers : ", localPlayNumbers);
    let temp = localPlayNumbers[rowIndex][columnIndex];
    localPlayNumbers[rowIndex][columnIndex] = "0";
    localPlayNumbers[zeroRowIndex][zeroColumnIndex] = temp;
    setPlayNumbers(localPlayNumbers);
  };

  return (
    <div className="puzzlegame">
      <div className="puzzlegame__wrapper">
        <div className="test">
          {playNumbers.map((items, rowIndex) => {
            return (
              <div>
                {items.map((subItems, columnIndex) => {
                  for (let i = 0; i < clickableIndices.length; i++) {
                    if (
                      clickableIndices[i][0] === rowIndex &&
                      clickableIndices[i][1] === columnIndex
                    ) {
                      console.log("allowed");
                      return (
                        <button
                          className="tile"
                          id="clickable"
                          onClick={() => numberClicked(rowIndex, columnIndex)}
                        >
                          {subItems}
                        </button>
                      );
                    }
                  }

                  return <button className="tile">{subItems}</button>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
