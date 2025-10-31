import {useState, useEffect} from 'react';
import {fillPuzzle, checkPlacement, solvePuzzle} from './sudoku-api.js';

function Sudoku() {
    const [puzzle, setPuzzle] = useState('');
    const [coordinate, setCoordinate] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [valid, setValid] = useState('');
    const [grid, setGrid] = useState(Array(81).fill(''));

    useEffect(() => {
        if (puzzle.length <= 81) {
            fillPuzzle(puzzle, setGrid);
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
                            onChange={e => handleGridChange(index, e.target.value)}/>
                        </td>
                    );
                })}
            </tr>
        ));
    };

    return (
        <div>
            <div class="row">
                <div class="col-md">
                    <h1>Sudoku Solver</h1>
                    <form id="solve-form" onSubmit={e => e.preventDefault()}>
                        <textarea 
                        rows="3" 
                        cols="20" 
                        id="text-input" 
                        name="puzzle"
                        value={puzzle}
                        onChange={e => setPuzzle(e.target.value)}/>
                        <br/>
                        <input 
                        type="button" 
                        value="Solve" 
                        id="solve-button"
                        onClick={() => { setValid(''); if (solvePuzzle(puzzle, setError, setGrid, setPuzzle)) return setValid('Solved')}}/>
                        <input 
                        type="button"
                        value="Puzzle #1"
                        id="puzzle-1"
                        onClick={() => setPuzzle('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')}/>
                        <input 
                        type="button"
                        value="Puzzle #2"
                        id="puzzle-1"
                        onClick={() => setPuzzle('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3')}/>
                        <input 
                        type="button"
                        value="Puzzle #3"
                        id="puzzle-1"
                        onClick={() => setPuzzle('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1')}/>
                        <div id="error-msg">{error}</div>
                        <div id="valid-msg">{valid}</div>
                    </form>
                    <form id="check-form" class="mt-2 row g-0 gap-2">
                        <div class="col">
                            <div>Coordinate (A1): </div>
                            <input class="w-100" id="coord" type="text" name="coordinate" value={coordinate} onChange={e => setCoordinate(e.target.value)}/>
                        </div>
                        <div class="col">
                            <div>Value (1-9): </div>
                            <input class="w-100" type="text" id="val" name="value" value={value} onChange={e => setValue(e.target.value)}/>
                        </div>
                        <input 
                        class="d-block mt-2"
                        type="button" 
                        id="check-button" 
                        value="Check Placement"
                        onClick={() => {setValid(''); if (checkPlacement(puzzle, coordinate, value, setError)) return setValid('Valid')}}/>                        
                    </form>
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
        </div>
    );
};

export default Sudoku;