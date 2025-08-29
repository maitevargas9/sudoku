export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
export type Grid = CellValue[][];

const digits: Exclude<CellValue, null>[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const emptyGrid = (): Grid =>
  Array.from({ length: 9 }, () => Array<CellValue>(9).fill(null));

export const inBounds = (r: number, c: number) =>
  r >= 0 && r < 9 && c >= 0 && c < 9;

export const boxIndex = (r: number, c: number) =>
  Math.floor(r / 3) * 3 + Math.floor(c / 3);

export const cloneGrid = (g: Grid): Grid => g.map((row) => row.slice());

export function computeConflicts(grid: Grid): boolean[][] {
  const conflicts: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false)
  );

  for (let r = 0; r < 9; r++) {
    const seen: Record<string, number[]> = {};
    for (let c = 0; c < 9; c++) {
      const v = grid[r][c];
      if (!v) {
        continue;
      }
      const key = String(v);
      if (!seen[key]) {
        seen[key] = [];
      }
      seen[key].push(c);
    }
    Object.values(seen).forEach((cols) => {
      if (cols.length > 1) {
        cols.slice(1).forEach((c) => (conflicts[r][c] = true));
      }
    });
  }

  for (let c = 0; c < 9; c++) {
    const seen: Record<string, number[]> = {};
    for (let r = 0; r < 9; r++) {
      const v = grid[r][c];
      if (!v) {
        continue;
      }
      const key = String(v);
      if (!seen[key]) {
        seen[key] = [];
      }
      seen[key].push(r);
    }
    Object.values(seen).forEach((rows) => {
      if (rows.length > 1) {
        rows.slice(1).forEach((r) => (conflicts[r][c] = true));
      }
    });
  }

  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const seen: Record<string, [number, number][]> = {};
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const r = br * 3 + i;
          const c = bc * 3 + j;
          const v = grid[r][c];
          if (!v) {
            continue;
          }
          const key = String(v);
          if (!seen[key]) {
            seen[key] = [];
          }
          seen[key].push([r, c]);
        }
      }
      Object.values(seen).forEach((cells) => {
        if (cells.length > 1) {
          cells.slice(1).forEach(([r, c]) => (conflicts[r][c] = true));
        }
      });
    }
  }

  return conflicts;
}

export function generateSudoku(): Grid {
  const grid: Grid = emptyGrid();

  function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function fillGrid(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === null) {
          for (const val of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)) {
            if (canPlace(grid, r, c, val)) {
              grid[r][c] = val;
              if (fillGrid()) {
                return true;
              }
              grid[r][c] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  fillGrid();

  const cellsToRemove = 50;
  let removed = 0;
  while (removed < cellsToRemove) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (grid[r][c] !== null) {
      grid[r][c] = null;
      removed++;
    }
  }

  return grid;
}

function canPlace(
  grid: Grid,
  row: number,
  col: number,
  val: Exclude<CellValue, null>
): boolean {
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === val) {
      return false;
    }
  }

  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === val) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (grid[r][c] === val) {
        return false;
      }
    }
  }

  return true;
}

export function solveSudoku(grid: Grid): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === null) {
        for (const val of digits) {
          if (canPlace(grid, r, c, val)) {
            grid[r][c] = val;
            if (solveSudoku(grid)) {
              return true;
            }
            grid[r][c] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}
