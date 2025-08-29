export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
export type Grid = CellValue[][];

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
        cols.forEach((c) => (conflicts[r][c] = true));
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
        rows.forEach((r) => (conflicts[r][c] = true));
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
            continue;
          }
          seen[key].push([r, c]);
        }
      }
      Object.values(seen).forEach((cells) => {
        if (cells.length > 1) {
          cells.forEach(([r, c]) => (conflicts[r][c] = true));
        }
      });
    }
  }

  return conflicts;
}
