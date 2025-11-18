import {useState} from 'react';
import LayoutDrawer from "./LayoutDrawer";

function LayoutMaker() {
    /* inputs to use on logic */
    const [psh, setPsh] = useState('');
    const [totalSystemEnergy, setTotalSystemEnergy] = useState('');
    const [lat, setLat] = useState('');
    const [planeLength, setPlaneLength] = useState('');
    const [planeWidth, setPlaneWidth] = useState('');
    const [maxPlaneVolt, setMaxPlaneVolt] = useState('');
    const [maxPlaneCurr, setMaxPlaneCurr] = useState('');
    const [planePower, setPlanePower] = useState('');
    const [maxInvVolt, setMaxInvVolt] = useState('');
    const [minInvVolt, setMinInvVolt] = useState('');
    const [maxInvCurr, setMaxInvCurr] = useState('');
    const [invPower, setInvPower] = useState('');

    /* to show drawer only after submit */
    const [showDrawer, setShowDrawer] = useState('false');
    const [calculatorProps, setCalculatorProps] = useState(null);

    /* form submit handler */
    const handleSubmit = (e) => {
        e.preventDefault();
        const required = { psh, totalSystemEnergy, lat, planeLength, planeWidth, maxPlaneVolt, maxPlaneCurr, planePower, maxInvVolt, minInvVolt, maxInvCurr, invPower };
        if (Object.values(required).some(v => v === '' || v === null)) { alert('Please fill every field before submitting'); return; };
        const props = Object.fromEntries(Object.entries(required).map(([key, value]) => [key, Number(value)]));
        setCalculatorProps(props);
        setShowDrawer(true);
    }

    const planeEra340 = () => {
        setPlanePower(340);
        setMaxPlaneVolt(38.50);
        setMaxPlaneCurr(8.84);
        setPlaneLength(1.956);
        setPlaneWidth(.992);
    };

    const mustSolar10kW = () => {
        setInvPower(10000);
        setMaxInvVolt(147);
        setMinInvVolt(64);
        setMaxInvCurr(120);
    }

    const exampleCase = () => {
        setPsh(4.49);
        setTotalSystemEnergy(134000);
        setLat(-4.654);
    }

    return (
        <div>
            <h1>Solar Layout Maker</h1>
            <p class="justifying-text">To meet electrical demand needs, it's required to know the amount of solar panels that can accomplish it. For this, a grid of Planes is needed, taking in consideration the number of panels arranged in parallel rows and series strings, while matching each panel's voltage, current and power. This application goal is to simplify this task by building automatically the grid of solar panels by entering the total system power plus Plane specs.</p>
            <p class="fw-semibold">Fill the following inputs to design the system's grid: </p>
            <form onSubmit={handleSubmit}>
                <div class="row border border-2 g-0 p-2 gx-2">
                    <h4>System's General</h4>
                    <div class="col-sm-4 col-6">
                        <label for="psh" class="form-label">Peak Sun Hours (h)</label>
                        <input type="number" class="form-control" id="psh" value={psh} onChange={(e) => setPsh(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="total-power" class="form-label">Total Grid Power (W)</label>
                        <input type="number" class="form-control" id="total-power" value={totalSystemEnergy} onChange={(e) => setTotalSystemEnergy(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="latitude" class="form-label">Latitude (°)</label>
                        <input type="number" class="form-control" id="latitude" value={lat} onChange={(e) => setLat(e.target.value)}/>
                    </div>
                </div> 
                <div class="row border border-2 g-0 p-2 gx-2 mt-2">
                    <h4>Panel Specs</h4>
                    <div class="col-sm-4 col-6">
                        <label for="plane-power" class="form-label">Panel's Power (W)</label>
                        <input type="number" class="form-control" id="plane-power" value={planePower} onChange={(e) => setPlanePower(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="plane-voltage" class="form-label">Panel's voltage MPP (V)</label>
                        <input type="number" class="form-control" id="plane-voltage" value={maxPlaneVolt} onChange={(e) => setMaxPlaneVolt(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="plane-current" class="form-label">Panel's current MPP (A)</label>
                        <input type="number" class="form-control" id="plane-current" value={maxPlaneCurr} onChange={(e) => setMaxPlaneCurr(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="plane-width" class="form-label">Panel's width (m)</label>
                        <input type="number" class="form-control" id="plane-width" value={planeWidth} onChange={(e) => setPlaneWidth(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="plane-length" class="form-label">Panel's length (m)</label>
                        <input type="number" class="form-control" id="plane-length" value={planeLength} onChange={(e) => setPlaneLength(e.target.value)}/>
                    </div>
                </div>
                <div class="row border border-2 g-0 p-2 gx-2 mt-2">
                    <h4>Inverter Specs</h4>
                    <div class="col-sm-4 col-6">
                        <label for="inv-power" class="form-label">Inverter Power (W)</label>
                        <input type="number" class="form-control" id="inv-power" value={invPower} onChange={(e) => setInvPower(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="inv-max-volt" class="form-label">Inverter max. voltage (V)</label>
                        <input type="number" class="form-control" id="inv-max-volt" value={maxInvVolt} onChange={(e) => setMaxInvVolt(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="inv-min-volt" class="form-label">Inverter min. voltage (V)</label>
                        <input type="number" class="form-control" id="inv-min-volt" value={minInvVolt} onChange={(e) => setMinInvVolt(e.target.value)}/>
                    </div>
                    <div class="col-sm-4 col-6">
                        <label for="inv-max-curr" class="form-label">Inverter max. current (A)</label>
                        <input type="number" class="form-control" id="inv-max-curr" value={maxInvCurr} onChange={(e) => setMaxInvCurr(e.target.value)}/>
                    </div>
                </div>
                <div class="col-sm-4 col-6 d-flex align-items-end mb-2">
                    <button type="submit" class="btn btn-primary mt-2">Submit</button>
                </div>      
            </form>
            <button class="me-2 btn btn-secondary"onClick={planeEra340}>Plane #1 (Era 340W)</button>
            <button class="me-2 btn btn-secondary" onClick={mustSolar10kW}>Inverter #1 (Must Solar 10kW)</button>
            <button class="btn btn-secondary" onClick={exampleCase}>System's General #1</button>
            <div id="results-layoutmaker" class="mt-2">
                {showDrawer && calculatorProps && (<LayoutDrawer {...calculatorProps} />)}
            </div> 
        </div>
    )
}

export default LayoutMaker;