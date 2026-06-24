"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown, RotateCcw, Play } from "lucide-react";

type Position = [number, number];

export default function SnakeGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Grid size: 30x30
  const [food, setFood] = useState<Position>([15, 15]);
  const [snake, setSnake] = useState<Position[]>([[5, 10]]);
  const [velocity, setVelocity] = useState<[number, number]>([0, 0]);

  // Keep references to values to avoid closure issues in setInterval
  const snakeRef = useRef<Position[]>([[5, 10]]);
  const velocityRef = useRef<[number, number]>([0, 0]);
  const foodRef = useRef<Position>([15, 15]);
  const gameOverRef = useRef(false);

  useEffect(() => {
    // Load high score from local storage
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("snake-high-score");
      if (savedHighScore) {
        setHighScore(parseInt(savedHighScore));
      }
    }
  }, []);

  const getRandomPosition = (): Position => {
    return [
      Math.floor(Math.random() * 30) + 1,
      Math.floor(Math.random() * 30) + 1,
    ];
  };

  const resetGame = () => {
    const freshSnake: Position[] = [[5, 10]];
    const freshFood = getRandomPosition();
    setSnake(freshSnake);
    setFood(freshFood);
    setVelocity([0, 0]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);

    snakeRef.current = freshSnake;
    velocityRef.current = [0, 0];
    foodRef.current = freshFood;
    gameOverRef.current = false;
  };

  const changeDirection = (key: string) => {
    const [vx, vy] = velocityRef.current;
    if (key === "ArrowUp" && vy !== 1) {
      velocityRef.current = [0, -1];
      setVelocity([0, -1]);
    } else if (key === "ArrowDown" && vy !== -1) {
      velocityRef.current = [0, 1];
      setVelocity([0, 1]);
    } else if (key === "ArrowLeft" && vx !== 1) {
      velocityRef.current = [-1, 0];
      setVelocity([-1, 0]);
    } else if (key === "ArrowRight" && vx !== -1) {
      velocityRef.current = [1, 0];
      setVelocity([1, 0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        changeDirection(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Main game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameInterval = setInterval(() => {
      if (gameOverRef.current) return;

      const currentSnake = [...snakeRef.current];
      const [vx, vy] = velocityRef.current;

      // Do nothing if snake is not moving yet
      if (vx === 0 && vy === 0) return;

      const head = currentSnake[0];
      const newHead: Position = [head[0] + vx, head[1] + vy];

      // Collision checks
      // Boundary check
      if (
        newHead[0] <= 0 ||
        newHead[0] > 30 ||
        newHead[1] <= 0 ||
        newHead[1] > 30
      ) {
        setGameOver(true);
        gameOverRef.current = true;
        setIsPlaying(false);
        return;
      }

      // Self-collision check
      for (let i = 0; i < currentSnake.length; i++) {
        if (currentSnake[i][0] === newHead[0] && currentSnake[i][1] === newHead[1]) {
          setGameOver(true);
          gameOverRef.current = true;
          setIsPlaying(false);
          return;
        }
      }

      // Update snake body
      const nextSnake: Position[] = [newHead];

      // Check if food eaten
      const [fx, fy] = foodRef.current;
      const eaten = newHead[0] === fx && newHead[1] === fy;

      if (eaten) {
        // Grow snake: keep all existing body parts
        nextSnake.push(...currentSnake);
        // Spawn new food
        let newFood = getRandomPosition();
        // Make sure food does not spawn inside the snake
        while (
          nextSnake.some(
            (part) => part[0] === newFood[0] && part[1] === newFood[1]
          )
        ) {
          newFood = getRandomPosition();
        }
        setFood(newFood);
        foodRef.current = newFood;

        // Score
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("snake-high-score", newScore.toString());
        }
      } else {
        // Normal move: remove tail
        nextSnake.push(...currentSnake.slice(0, -1));
      }

      setSnake(nextSnake);
      snakeRef.current = nextSnake;
    }, 120);

    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, score, highScore]);

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-xl mx-auto w-full select-none">
      {/* Game Details */}
      <div className="flex justify-between w-full mb-4 px-2 text-slate-400 text-sm font-semibold tracking-wider uppercase">
        <span>Score: <b className="text-white text-base">{score}</b></span>
        <span>High Score: <b className="text-indigo-400 text-base">{highScore}</b></span>
      </div>

      {/* Board */}
      <div className="relative w-full aspect-square max-w-[380px] bg-slate-950 border-4 border-slate-850 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
        {/* Game grid */}
        <div
          className="absolute inset-0 grid w-full h-full p-0.5"
          style={{
            gridTemplateRows: "repeat(30, 1fr)",
            gridTemplateColumns: "repeat(30, 1fr)",
          }}
        >
          {/* Food */}
          <div
            className="rounded-full bg-pink-500 shadow-md shadow-pink-500/50 scale-110 animate-pulse"
            style={{
              gridRowStart: food[1],
              gridColumnStart: food[0],
            }}
          />

          {/* Snake */}
          {snake.map((part, index) => (
            <div
              key={index}
              className={`rounded-sm ${
                index === 0
                  ? "bg-indigo-400 border border-indigo-350 shadow-md shadow-indigo-400/30 scale-105 z-10"
                  : "bg-indigo-600/90 border border-indigo-650"
              }`}
              style={{
                gridRowStart: part[1],
                gridColumnStart: part[0],
              }}
            />
          ))}
        </div>

        {/* Overlays */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            {gameOver ? (
              <>
                <span className="text-5xl mb-3">💀</span>
                <h4 className="text-2xl font-black text-rose-500 mb-1">Game Over</h4>
                <p className="text-slate-400 text-sm mb-6">You scored {score} points!</p>
                <button
                  onClick={resetGame}
                  className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <RotateCcw size={16} />
                  Play Again
                </button>
              </>
            ) : (
              <>
                <span className="text-5xl mb-3">🐍</span>
                <h4 className="text-2xl font-black text-white mb-2">Snake Game</h4>
                <p className="text-slate-400 text-sm max-w-xs mb-6">
                  Use your keyboard arrow keys or on-screen controls to navigate the snake. Eat food to grow!
                </p>
                <button
                  onClick={resetGame}
                  className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Play size={16} />
                  Start Game
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* On-screen controls for mobile */}
      <div className="grid grid-cols-3 gap-2 w-36 mt-6 justify-center">
        <div />
        <button
          onClick={() => changeDirection("ArrowUp")}
          className="h-10 w-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/50 text-white rounded-xl shadow cursor-pointer justify-self-center"
          aria-label="Up"
        >
          <ArrowUp size={18} />
        </button>
        <div />

        <button
          onClick={() => changeDirection("ArrowLeft")}
          className="h-10 w-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/50 text-white rounded-xl shadow cursor-pointer justify-self-center"
          aria-label="Left"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="h-10 w-10 bg-slate-850 border border-slate-800 rounded-xl justify-self-center flex items-center justify-center text-xs text-slate-500 font-bold">
          🕹️
        </div>
        <button
          onClick={() => changeDirection("ArrowRight")}
          className="h-10 w-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/50 text-white rounded-xl shadow cursor-pointer justify-self-center"
          aria-label="Right"
        >
          <ArrowRight size={18} />
        </button>

        <div />
        <button
          onClick={() => changeDirection("ArrowDown")}
          className="h-10 w-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/50 text-white rounded-xl shadow cursor-pointer justify-self-center"
          aria-label="Down"
        >
          <ArrowDown size={18} />
        </button>
        <div />
      </div>
    </div>
  );
}
