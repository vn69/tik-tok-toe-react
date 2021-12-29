import { useState, useRef, useEffect } from "react";
import Square from "./components/Square";
var classNames = require("classnames");

const checkWin = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // effect;
    if (checkWin(squares)) setIsWin(true);
    return () => {
      // cleanup
    };
  }, [isX, squares]);

  const handleClickSquare = (i) => {
    if (squares[i]) return;

    if (isX) {
      setSquares((prev) => {
        prev[i] = "x";
        return prev;
      });
    } else {
      setSquares((prev) => {
        prev[i] = "o";
        return prev;
      });
    }
    setIsX((prev) => !prev);
    setStep((prev) => prev + 1);
    setHistory((prev) => {
      const newHistory = JSON.parse(JSON.stringify(prev));
      // console.log(111, step, newHistory);
      newHistory.splice(step + 1);
      return [...newHistory, [...squares]];
    });
  };

  const handleReset = () => {
    setSquares(new Array(9).fill(null));
    setIsWin(false);
    setIsX(true);
    setHistory([new Array(9).fill(null)]);
    setStep(0);
  };

  const handleBack = () => {
    if (step === 0) return;
    // console.log(75, step, history);
    setSquares([...history[step - 1]]);
    setIsX((prev) => !prev);
    setStep((prev) => prev - 1);
    setIsWin(false);
  };
  const handleNext = () => {
    if (isWin) return;
    if (step < history.length - 1) {
      setSquares([...history[step + 1]]);
      setIsX((prev) => !prev);
      setStep((prev) => prev + 1);
    }
  };

  console.log("App re-render");

  return (
    <div className="container">
      <h1>Tic Tac Toe Game</h1>
      <div className={classNames("board", { "board-win": isWin })}>
        {squares.map((item, index) => (
          <Square
            key={index}
            isX={isX}
            isWin={isWin}
            squareItem={squares[index]}
            onClick={() => handleClickSquare(index)}
          ></Square>
        ))}
      </div>
      <div className="player">
        {isWin && (
          <span className="win-player">{isX ? "O win " : "X win "}</span>
        )}
        <button onClick={handleReset} className="btn">
          reset
        </button>
      </div>
      <div>
        <span>Time stone:</span>
        <button className="btn" disabled={!step} onClick={handleBack}>
          back
        </button>
        <button
          className="btn"
          disabled={!(step < history.length - 1)}
          onClick={handleNext}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;
