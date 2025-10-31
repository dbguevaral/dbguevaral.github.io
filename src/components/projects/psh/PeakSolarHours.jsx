import {useState, useEffect} from 'react';
import {setOptions, importLibrary} from "@googlemaps/js-api-loader";
import horizontalPlaneDataImporter from './solar-data-importer';

setOptions({
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly'
})

function PeakSolarHours() {
    const [pair1, setPair1] = useState('');
    const [pair2, setPair2] = useState('');
    const [pair3, setPair3] = useState('');
    const [dirText, setDirText] = useState('');
    const [latText, setLatText] = useState('');
    const [lngText, setLngText] = useState('');
    const [coordinates, setCoordinates] = useState({lat: null, lng: null})
    const [annual, setAnnual] = useState('');
    const [worstCase, setWorstCase] = useState('');

    useEffect(() => {
        importLibrary('places').then(() => {
            const input = document.getElementById('autocomplete');
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                setDirText(place.formatted_address)
                setCoordinates({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
            });
        });
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            Location: pair1 === 'dir-box' ? dirText : coordText, 
            Coordinates: pair1 === 'dir-box' ? `lat: ${coordinates.lat}, lng: ${coordinates.lng}` : coordText, 
            Orientation: pair2 === 'horizontal' ? 'Horizontal' : 'Tilted',
            PSHcase: pair3 === 'avg-annual' ? 'Average Annual' : 'Worst Case Scenario'
        });

        if (pair1 === 'dir-box') {
            if (pair2 === 'horizontal') {
                if (pair3 === 'avg-annual') horizontalPlaneDataImporter(coordinates.lat, coordinates.lng).annual;
                else horizontalPlaneDataImporter(coordinates.lat, coordinates.lng).worstCase;
            }
            else {
                if (pair3 === 'avg-annual') console.log('you have selected avg-annual for tilted');
                else console.log('you have selected worst case for tilted');
            }
        }

        else {
            if (pair2 === 'horizontal') {
                if (pair3 === 'avg-annual') horizontalPlaneDataImporter(latText, lngText).annual;
                else horizontalPlaneDataImporter(latText, lngText).worstCase;
            }
            else if (pair2 === 'tilted') {
                if (pair3 === 'avg-annual') console.log('you have selected avg-annual for tilted by using coords');
                else console.log('you have selected worst case for tilted by using coords');
            } 
        }
        
    };

    return (
        <div class="container-fluid g-0">
            <h1>Peak Sun Hours Getter</h1>
            <p class="justifying-text">Peak sun hours is a parameter that measures the effective solar radiation absorbed by photovoltaic panels. It indicates how many hours sunlight will hit a specific area with a load of 1 kW/m².</p>
            <p class="justifying-text">If you want to know how many peak sun hours a location has, check the options bellow and fill 'em.</p>
            <p class="fw-bold">Only "Using address / Horizontal / Avg. Annual Value" are working right now</p>
            <form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="dir-box" class="form-check-input" name="data-coord" onChange={() => setPair1('dir-box')}/>
                            <label class="form-check-label" for="dir-box">Using address</label>
                        </div>
                        <input id="autocomplete" class="form-control" type="text" disabled={pair1 !== 'dir-box'} placeholder="Your address" value={dirText} onChange={e => setDirText(e.target.value)} required></input>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="coord-box" class="form-check-input" name="data-coord" onChange={() => setPair1('coord-box')}/>
                            <label class="form-check-label" for="coord-box">Using coordinates</label>
                        </div>
                        <div class="input-group gap-2">
                            <input class="form-control" type="text" disabled={pair1 !== 'coord-box'} value={latText} onChange={e => setLatText(e.target.value)} placeholder="Lat." required/>
                            <input class="form-control" type="text" disabled={pair1 !== 'coord-box'} value={lngText} onChange={e => setLngText(e.target.value)} placeholder="Long." required/>   
                        </div>
                        
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="horizontal" class="form-check-input" name="plane" onChange={() => setPair2('horizontal')} required/>
                            <label class="form-check-label" for="horizontal">Horizontal Plane</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="tilted" class="form-check-input" name="plane" onChange={() => setPair2('tilted')} required/>
                            <label class="form-check-label" for="tilted">Tilted Plane</label>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="avg-annual" class="form-check-input" name="psh-value" onChange={() => setPair3('avg-annual')} required/>
                            <label class="form-check-label" for="avg-annual">Average Annual Value</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="worst-case" class="form-check-input" name="psh-value" onChange={() => setPair3('worst-case')} required/>
                            <label class="form-check-label" for="worst-case">Worst Case Scenario Value</label>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Submit</button>
            </form>
            <section id="results" class="mt-2">
            </section>
        </div>
    )
}

export default PeakSolarHours;