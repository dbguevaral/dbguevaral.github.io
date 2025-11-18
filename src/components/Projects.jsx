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
                <div id="project1" class="col border border-dark border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('sudoku')}>
                    <div class="col fw-semibold" >Sudoku Solver</div>
                    <img class="col-md-3 col-5" src="https://i.imgur.com/idO5Xsj.jpeg"/>
                </div>
                <div id="project2" class="col border border-dark border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('peaksolarhours')}>
                    <div class="col fw-semibold" >Peak Sun Hours Getter</div>
                    <img class="col-md-3 col-6" src="https://i.imgur.com/egdmNZM.jpeg"/>
                </div>
            </div>
            <div class="row g-0 my-2 gap-3">
                <div id="project3" class="col border border-dark border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('solarlayoutmaker')}>
                    <div class="col fw-semibold" >Solar Layout Maker</div>
                    <img class="col-md-3 col-6" src="https://i.imgur.com/SIBoIPN.jpeg"/>
                </div>
                <div id="project4" class="col border border-dark border-2 rounded-end-4 d-flex align-items-center banner-container ps-2 hovering" onClick={() => setProject('tobedefined')}>
                    <div class="col fw-semibold" >On progress</div>
                    <img class="col-md-3 col-6" src="https://i.imgur.com/bq4ckz7.jpeg"/>
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