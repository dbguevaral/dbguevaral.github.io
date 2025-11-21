import {useState, useEffect} from 'react';
import {fillPuzzle, checkPlacement, solvePuzzle} from './sudoku-api.js';

function Sudoku() {
    const [puzzle, setPuzzle] = useState('');
    const [coordinate, setCoordinate] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [valid, setValid] = useState('');
    const [grid, setGrid] = useState(Array(81).fill(''));
    const [autoCheck, setAutoCheck] = useState('false');

    const puzzle1 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const puzzle2 = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    const puzzle3 = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';

    useEffect(() => {
        if (puzzle.length <= 81) {
            fillPuzzle(puzzle, setGrid);
            //newGridColor
        }
    }, [puzzle]);

    const handleGridChange = (index, val) => {
        if (!val.match(/^[1-9.]?$/) || grid[index] === val) return;
        const newGrid = [...grid];
        newGrid[index] = val;
        setGrid(newGrid);
        setPuzzle(newGrid.map( x => x === '' ? '.' : x).join(''));
        setError('');
    };

    const renderGrid = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        return rows.map((row, rowIndex) => (
            <tr key={row}>
                {Array(9).fill().map((_, colIndex) => {
                    const index = rowIndex * 9 + colIndex;
                    const coord = `${row}${(colIndex + 1)}`;
                    return (
                        <td key={coord} class={`${coord} sudoku-input`} title={coord}>
                            <input 
                            type="text"
                            class="sudoku-numbers"
                            maxLength="1"
                            value={grid[index] || ''}
                            onChange={e => {
                                handleGridChange(index, e.target.value);
                                const rowLetter = String.fromCharCode(Math.floor(index / 9) + 65);
                                const colNumber = index % 9 + 1;
                                const newCoordinate = `${rowLetter}${colNumber}`
                                setValid('');
                                if (autoCheck) {
                                    if (checkPlacement(puzzle, newCoordinate, e.target.value, setError)) return setValid('Valid');    
                                };
                                }}/>
                        </td>
                    );
                })}
            </tr>
        ));
    };

    return (
        <div class="row">
            <h1>Sudoku Solver</h1>
            <div class="col-md">
                <p class="justifying-text">This application enables solving and validation of Sudoku puzzles with real-time conflict detection across the grid. It incorporates an efficient recursive backtracking solver that finds the correct solution by intelligently testing valid possibilities.</p>
                <p class="justifying-text fw-semibold">You can choose from 3 different puzzles from below</p>
                <form id="solve-form">
                    {/* <textarea rows="2" cols="20" id="text-input" class="form-control" name="puzzle" value={puzzle} onChange={e => setPuzzle(e.target.value)}/> */}
                    <div class="row mt-2 gx-0 gap-2">
                        <input type="button" class="col btn btn-secondary" value="Puzzle #1"
                            onClick={() => {setPuzzle(puzzle1); setValid(''); setError('');}}/>
                        <input type="button" class="col btn btn-secondary" value="Puzzle #2"
                            onClick={() => {setPuzzle(puzzle2); setValid(''); setError('');}}/>
                        <input  type="button" class="col btn btn-secondary" value="Puzzle #3"
                            onClick={() => {setPuzzle(puzzle3); setValid(''); setError('');}}/>
                        <input class="col btn btn-primary" type="button" value="Solve" id="solve-button" 
                            onClick={() => { setValid(''); if (solvePuzzle(puzzle, setError, setGrid, setPuzzle)) return setValid('Solved')}}/>
                    </div>
                    <div id="error-msg">{error}</div>
                    <div id="valid-msg">{valid}</div>
                </form>
                <p class="justifying-text fw-semibold mt-2">You can manually check for a valid placement by writting your coordinate and value</p>
                <form id="check-form" class="row mt-3 gx-0 gap-2 align-items-end">
                    <div class="col">
                        <label for="coord" class="form-label">Coordinate (A1): </label>
                        <input class="form-control" id="coord" type="text" name="coordinate" value={coordinate} onChange={e => setCoordinate(e.target.value)}/>
                    </div>
                    <div class="col">
                        <label for="val" class="form-label">Value (1-9): </label>
                        <input class="form-control" type="text" id="val" name="value" value={value} onChange={e => setValue(e.target.value)}/>
                    </div>
                    <input class="col btn btn-primary d-flex align-items-end" type="button" id="check-button" value="Check Placement"
                    onClick={() => {setValid(''); if (checkPlacement(puzzle, coordinate, value, setError)) return setValid('Valid')}}/>                        
                </form>
                <p class="justifying-text fw-semibold mt-2">Or you can check the box below to simply auto check everytime you type a number in the grid</p>
                <div class="form-check mt-2">
                    <input class='form-check-input' type='checkbox' id='autoCheck' checked={autoCheck} onChange={(e) => {
                        setAutoCheck(e.target.checked);
                        console.log(autoCheck);
                    }}/>
                    <label class='form-check-label' for='autoCheck'>Auto Check Placement</label>
                </div>
                <div class="form-text">By pressing Ctr + Z you can go back to your previous input</div>
                <span id="error"></span>
            </div>

            <div class="col-md d-flex justify-content-center">
                <div id="sudoku-grid-container">
                <div>
                    <table class="yAxisLegend">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(letter => 
                            <tr key={letter}>
                                <td>{letter}</td>
                            </tr>
                        )}
                    </table>
                </div>
                <div id="sudoku-grid">
                    <table class="xAxisLegend">
                        <tr>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => <td key={num}>{num}</td>)}
                        </tr>
                    </table>
                    <table class="grid">
                        <tbody>{renderGrid()}</tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Sudoku;