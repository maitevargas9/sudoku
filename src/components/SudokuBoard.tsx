import { useState, useEffect, useCallback, useMemo } from "react";
import type { CellValue, Grid } from "../logic/sudoku";
import {
    inBounds,
    cloneGrid,
    computeConflicts
} from "../logic/sudoku";

interface SudokuBoardProps {
    grid: Grid;
    onChange: (g: Grid) => void;
    onSelect?: (r: number, c: number) => void;
}

export default function SudokuBoard({ grid, onChange, onSelect }: SudokuBoardProps) {
    const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);

    const conflicts = useMemo(() => computeConflicts(grid), [grid]);

    const selectCell = (r: number, c: number) => {
        setSelected({ r, c });
        if (onSelect) {
            onSelect(r, c);
        }
    };

    const setCell = useCallback(
        (r: number, c: number, val: CellValue) => {
            const next = cloneGrid(grid);
            next[r][c] = val;
            onChange(next);
        },
        [grid, onChange]
    );

    const onKey = useCallback(
        (e: KeyboardEvent) => {
            if (!selected) {
                return;
            }
            const { r, c } = selected;

            if (/^[1-9]$/.test(e.key)) {
                setCell(r, c, Number(e.key) as CellValue);
                e.preventDefault();
                return;
            }

            if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
                setCell(r, c, null);
                e.preventDefault();
                return;
            }

            let nr = r;
            let nc = c;
            if (e.key === "ArrowUp") {
                nr = r - 1;
            }
            if (e.key === "ArrowDown") {
                nr = r + 1;
            }
            if (e.key === "ArrowLeft") {
                nc = c - 1;
            }
            if (e.key === "ArrowRight") {
                nc = c + 1;
            }

            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && inBounds(nr, nc)) {
                setSelected({ r: nr, c: nc });
                if (onSelect) {
                    onSelect(nr, nc);
                }
                e.preventDefault();
            }
        },
        [selected, setCell, onSelect]
    );

    useEffect(() => {
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onKey]);

    return (
        <div className="aspect-square overflow-hidden shadow ring-1 ring-slate-300">
            <div className="grid grid-cols-9 grid-rows-9 w-full h-full">
                {Array.from({ length: 81 }).map((_, idx) => {
                    const r = Math.floor(idx / 9);
                    const c = idx % 9;
                    const isSelected = selected && selected.r === r && selected.c === c;
                    const isConflict = conflicts[r][c];

                    const thickTop = r % 3 === 0 ? "border-t-4" : "border-t";
                    const thickLeft = c % 3 === 0 ? "border-l-4" : "border-l";
                    const thickRight = c === 8 ? "border-r-4" : "border-r";
                    const thickBottom = r === 8 ? "border-b-4" : "border-b";

                    return (
                        <div
                            key={`${r}-${c}`}
                            onClick={() => selectCell(r, c)}
                            className={`flex items-center justify-center cursor-pointer border-slate-700 ${thickTop} ${thickLeft} ${thickRight} ${thickBottom} ${isSelected ? "bg-yellow-100" : "bg-white"
                                } ${isConflict ? "text-red-600 font-bold" : ""} aspect-square`}
                        >
                            {grid[r][c] ?? ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}