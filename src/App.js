import './App.css';
import {useState} from 'react';

function Square({value, onSquareClick}) {

    return (
        <button className="square" onClick={onSquareClick}>{value} </button>
    )
}


function Board({isXNext, onPlay, squares}) {
    function ClickHandler(i) {
        const nextSquares = squares.slice();
        if (nextSquares[i] !== null || calculateWinner(squares)) {
            return;
        }
        if (isXNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status = null
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (isXNext ? "X" : "O");
    }
    return <div>
        <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => ClickHandler(0)}/>
            <Square value={squares[1]} onSquareClick={() => ClickHandler(1)}/>
            <Square value={squares[2]} onSquareClick={() => ClickHandler(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => ClickHandler(3)}/>
            <Square value={squares[4]} onSquareClick={() => ClickHandler(4)}/>
            <Square value={squares[5]} onSquareClick={() => ClickHandler(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => ClickHandler(6)}/>
            <Square value={squares[7]} onSquareClick={() => ClickHandler(7)}/>
            <Square value={squares[8]} onSquareClick={() => ClickHandler(8)}/>
        </div>
    </div>;
}


function Game() {
    const [isXNext, setIsXNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setIsXNext(!isXNext);
    }

    function JumpTo(move) {
        setCurrentMove(move);
        setIsXNext(move % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to start';
        }
        return (
            <li key={move}>
                <button onClick={() => JumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <div className="game">
            <div className="game-board">
                <Board isXNext={isXNext} onPlay={handlePlay} squares={currentSquares}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

export default Game;


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
