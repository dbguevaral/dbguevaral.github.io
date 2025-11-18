import {useState, useEffect, useRef} from 'react';
import {setOptions, importLibrary} from "@googlemaps/js-api-loader";
import {parameterGetter} from './solar-data-importer';
import {horizontalPeakSunHours} from './solar-data-importer';
import {tiltedPeakSunHours} from './solar-data-importer';

setOptions({
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly'
})

function PeakSolarHours() {
    const [locationForm, setLocationForm] = useState('');
    const [orientationForm, setOrientationForm] = useState('');
    const [dirText, setDirText] = useState('');
    const [latValue, setLatValue] = useState('');
    const [lngValue, setLngValue] = useState('');
    const prev = useRef({lat: '', lng: ''});
    const results = useRef({irradiance: [], kt: []})
    const ktTest = [["202401", 0.27], ["202402", 0.32], ["202403", 0.45], ["202404", 0.42], ["202405", 0.58], ["202406", 0.51], ["202407", 0.49], ["202408", 0.55], ["202409", 0.55], ["202410", 0.41], ["202411", 0.27], ["202412", 0.27], ["202413", 0.48]];

    useEffect(() => {
        importLibrary('places').then(() => {
            const input = document.getElementById('autocomplete');
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                setDirText(place.formatted_address)
                setLatValue(place.geometry.location.lat().toFixed(2)) 
                setLngValue(place.geometry.location.lng().toFixed(2))
            });
        });
    });

    //añadir loading icon (buscar algo en modal o por ahí)

    const handleSubmit = async (e) => {
        e.preventDefault();   
        console.log({
            Location: locationForm === 'dir-box' ? dirText : "Check following coordinates", 
            Coordinates: {Latitude: latValue, Longitude: lngValue}, 
            Orientation: orientationForm === 'horizontal' ? 'Horizontal' : 'Tilted'
        });
        if (latValue !== prev.current.lat || lngValue !== prev.current.lng) {
            const data = await parameterGetter(latValue, lngValue);
            if (data) {
                results.current = data;
                console.log('Saved data', results.current);
            }
            prev.current = {lat: latValue, lng: lngValue};
        };
        console.log('Data fetching has been skiped because you just used the same lat. and long. values or is the first time submitting');
        if (orientationForm === 'horizontal') {
            horizontalPeakSunHours(results.current.irradiance);
            console.log('Average PSH horizontal values has been displayed');
        }
        if (orientationForm === 'tilted') {
            tiltedPeakSunHours(results.current.irradiance, results.current.kt, prev.current.lat);
            console.log('Average PSH tilted values has been displayed');
        }
    };

    return (
        <div class="container-fluid g-0">
            <h1>Peak Sun Hours Getter</h1>
            <p class="justifying-text">Peak sun hours is a parameter that measures the effective solar radiation absorbed by photovoltaic panels. It indicates how many hours sunlight will hit a specific area with a load of 1 kW/m².</p>
            <p class="justifying-text">If you want to know how many peak sun hours a location has, check the options bellow and fill 'em.</p>
            <p class="fw-semibold">Select one option from each row</p>
            <form onSubmit={handleSubmit}>
                <div class="row border border-2 g-0 p-2 gx-2">
                    <div class="col">
                        <div class="form-check">
                            <label class="form-check-label" for="dir-box">Using address</label>
                            <input type="radio" id="dir-box" class="form-check-input" name="data-coord" onChange={() => setLocationForm('dir-box')} required/>
                        </div>
                        <input id="autocomplete" class="form-control" type="text" disabled={locationForm !== 'dir-box'} placeholder="Your address" value={dirText} onChange={e => setDirText(e.target.value)} required></input>
                        <div class="form-text">You must select an option when looking for you address</div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="coord-box" class="form-check-input" name="data-coord" onChange={() => setLocationForm('coord-box')} required/>
                            <label class="form-check-label" for="coord-box">Using coordinates</label>
                        </div>
                        <div class="input-group gap-2">
                            <input class="form-control" type="text" disabled={locationForm !== 'coord-box'} value={latValue} onChange={e => setLatValue(e.target.value)} placeholder="Lat." required/>
                            <input class="form-control" type="text" disabled={locationForm !== 'coord-box'} value={lngValue} onChange={e => setLngValue(e.target.value)} placeholder="Long." required/>   
                        </div>
                        <div class="form-text">Only plain number is allowed</div>
                    </div>
                </div>
                <div class="row mt-2 border border-2 g-0 p-2">
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="horizontal" class="form-check-input" name="plane" onChange={() => setOrientationForm('horizontal')} required/>
                            <label class="form-check-label" for="horizontal">Horizontal Plane</label>
                        </div>
                        <div class="form-text">For panels flat on roof, facing straight to the top - 0° tilt</div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="tilted" class="form-check-input" name="plane" onChange={() => setOrientationForm('tilted')} required/>
                            <label class="form-check-label" for="tilted">Tilted Plane</label>
                        </div>
                        <div class="form-text">For panels tilted at optimal latitude angle</div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Submit</button>
            </form>
            <section id="results-psh" class="mt-2">
            </section>
        </div>
    )
}

export default PeakSolarHours;