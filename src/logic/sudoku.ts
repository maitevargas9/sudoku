export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
export type Grid = CellValue[][];

export const emptyGrid = (): Grid =>
  Array.from({ length: 9 }, () => Array<CellValue>(9).fill(null));

export const inBounds = (r: number, c: number) =>
  r >= 0 && r < 9 && c >= 0 && c < 9;

export const boxIndex = (r: number, c: number) =>
  Math.floor(r / 3) * 3 + Math.floor(c / 3);

export const cloneGrid = (g: Grid): Grid => g.map((row) => row.slice());
