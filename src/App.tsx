import { useState } from "react";
import type { Grid } from "./logic/sudoku";
import { emptyGrid, generateSudoku, cloneGrid, solveSudoku } from "./logic/sudoku";
import Header from "./components/Header";
import SudokuBoard from "./components/SudokuBoard";

export default function App() {
  const [grid, setGrid] = useState<Grid>(generateSudoku());
  const [solvedGrid, setSolvedGrid] = useState<Grid | undefined>();
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);

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

  const handleHint = () => {
    if (!selected) {
      alert("Please select a cell to get a hint.");
      return;
    }

    const r = selected.r;
    const c = selected.c;

    if (grid[r][c] !== null) {
      alert("This cell is already filled!");
      return;
    }

    const clone = cloneGrid(grid);
    if (solveSudoku(clone)) {
      const hintValue = clone[r][c];
      if (hintValue !== null) {
        setGrid((prev) => {
          const next = cloneGrid(prev);
          next[r][c] = hintValue;
          return next;
        });
      }
    } else {
      alert("No solution exists for this Sudoku!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-slate-50">
      <Header
        onReset={handleReset}
        onNewSudoku={handleNewSudoku}
        onSolve={handleSolve}
        onHint={handleHint}
      />
      <div className="w-full max-w-[28rem] mt-16">
        <SudokuBoard
          initialGrid={grid}
          solvedGrid={solvedGrid}
          onSelect={(r, c) => setSelected({ r, c })}
        />
      </div>
    </div>
  );
}
