import {useState} from 'react';
import Sudoku from './projects/sudoku/Sudoku';
import PeakSolarHours from './projects/psh/PeakSolarHours';
import LayoutMaker from './projects/solar layout maker/LayoutMaker';

function Projects() {
    const [project, setProject] = useState();

    return (
        <div>
            <h1 class="display-3">Projects</h1>
            <p>Here are some of my projects that I've done. Feel free to test them out.</p>
            <div class="row g-0 gap-3">
                <div id="project1" class="col border border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('sudoku')}>
                    <h4 class="col fw-light" >Sudoku Solver</h4>
                </div>
                <div id="project2" class="col border border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('peaksolarhours')}>
                    <h4 class="col fw-light" >Peak Sun Hours Getter</h4>
                </div>
            </div>
            <div class="row g-0 my-2 gap-3">
                <div id="project3" class="col border border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('solarlayoutmaker')}>
                    <h4 class="col fw-light" >Solar Layout Maker</h4>
                </div>
                <div id="project4" class="col border border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('tobedefined')}>
                    <h4 class="col fw-light" >On progress</h4>
                </div>
            </div>
            <div class="mb-2">
                {project === 'sudoku' && <Sudoku/>}
                {project === 'peaksolarhours' && <PeakSolarHours/>}
                {project === 'solarlayoutmaker' && <LayoutMaker/>}
                {project === 'tobedefined' && null}
            </div>
        </div>
    )
}

export default Projects;