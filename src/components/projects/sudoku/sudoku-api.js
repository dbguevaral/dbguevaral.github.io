import SudokuSolver from './sudoku-solver.js';

const solver = new SudokuSolver();

export function fillPuzzle(data, setGrid) {
  const len = data.length < 81 ? data.length : 81;
  const newGrid = Array(81).fill('');
  for (let i = 0; i < len; i++) {
    newGrid[i] = data[i] === '.' ? '' : data[i];
  }
  return setGrid(newGrid);
}

export function checkPlacement(puzzle, coordinate, value, setError) {
  
  if (!puzzle || !coordinate || !value) {
    setError('Required field(s) missing');
    return false;
  }

  const regex = /^[1-9.]*$/;
  if (!regex.test(puzzle)) {
    setError('Invalid characters in puzzle');
    return false;
  }

  const validPuzzle = solver.validate(puzzle);
  if (!validPuzzle) {
    setError('Expected puzzle to be 81 characters long');
    return false;
  }

  const regexCoor = /^[A-I][1-9]$/;
  if (!regexCoor.test(coordinate)) {
    setError('Invalid coordinate');
    return false;
  }

  if (!/^[1-9]$/.test(value)) {
    setError('Invalid value');
    return false;
  }

  const row = coordinate.slice(0, 1);
  const column = coordinate.slice(1, 2);

  const checkRow = solver.checkRowPlacement(puzzle, row, column, value) ? '' : 'row';
  const checkCol = solver.checkColPlacement(puzzle, row, column, value) ? '' : 'column';
  const checkRegion = solver.checkRegionPlacement(puzzle, row, column, value) ? '' : 'region';
  const conflicts = [checkRow, checkCol, checkRegion].filter(conflict => conflict !== '');

  if (conflicts.length > 0) {
    setError(`Invalid placement: conflicts in ${conflicts.join(', ')}`);
    return false;
  }

  setError('');
  return true;
}   

export function solvePuzzle(puzzle, setError, setGrid, setPuzzle) {
  
  if (!puzzle) {
    setError('Required field missing');
    return false;
  }

  const regex = /^[1-9.]*$/
  if (!regex.test(puzzle)) {
    setError('Invalid characters in puzzle');
    return false;
  }

  const validPuzzle = solver.validate(puzzle);
  if (!validPuzzle) {
    setError('Expected puzzle to be 81 characters long');
  } 

  const solved = solver.solve(puzzle);
  if(!solved) {
    setError("Puzzle cannot be solved");
    return false;
  }

  fillPuzzle(solved, setGrid);
  setPuzzle(solved);
  setError('');
  return true;
}

