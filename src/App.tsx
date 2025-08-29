import { useState } from "react";
import type { Grid } from "./logic/sudoku";
import { emptyGrid, generateSudoku, cloneGrid, solveSudoku } from "./logic/sudoku";
import Header from "./components/Header";
import SudokuBoard from "./components/SudokuBoard";

export default function App() {
  const [grid, setGrid] = useState<Grid>(generateSudoku());
  const [solvedGrid, setSolvedGrid] = useState<Grid | undefined>();

  const handleReset = () => {
    setGrid(emptyGrid());
    setSolvedGrid(undefined);
  };

  const handleNewSudoku = () => {
    const newPuzzle = generateSudoku();
    setGrid(newPuzzle);
    setSolvedGrid(undefined);
  };

  const handleSolve = () => {
    const clone = cloneGrid(grid);
    if (solveSudoku(clone)) {
      setSolvedGrid(clone);
    } else {
      alert("This Sudoku has no solution!!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-slate-50">
      <Header
        onReset={handleReset}
        onNewSudoku={handleNewSudoku}
        onSolve={handleSolve}
      />
      <div className="w-full max-w-[28rem] mt-16">
        <SudokuBoard initialGrid={grid} solvedGrid={solvedGrid} />
      </div>
    </div>
  );
}
