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
    const [isLoading, setIsLoading] = useState(false);

    const prev = useRef({lat: '', lng: ''});
    const results = useRef({irradiance: [], kt: []})

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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

        if (orientationForm === 'horizontal') {
            horizontalPeakSunHours(results.current.irradiance);
            console.log('Average PSH horizontal values has been displayed');
        }

        if (orientationForm === 'tilted') {
            tiltedPeakSunHours(results.current.irradiance, results.current.kt, prev.current.lat);
            console.log('Average PSH tilted values has been displayed');
        }

        setIsLoading(false)
    };

    return (
        <div class="container-fluid g-0">
            <h1>Peak Sun Hours Getter</h1>
            <p class="justifying-text">Peak sun hours is a parameter that measures the effective solar radiation absorbed by photovoltaic panels. It indicates how many hours sunlight will hit a specific area with a load of 1 kW/m².</p>
            <p class="justifying-text fw-semibold">If you want to know how many peak sun hours a location has, select one option from each row and fill the required form</p>
            <form onSubmit={handleSubmit} class="row gap-2">
                <div class="row">
                    <div class="col">
                        <div class="form-check">
                            <label class="form-check-label" for="dir-box">Address</label>
                            <input type="radio" id="dir-box" class="form-check-input" name="data-coord" onChange={() => setLocationForm('dir-box')} required/>
                        </div>
                        <input id="autocomplete" class="form-control" type="text" disabled={locationForm !== 'dir-box'} placeholder="Your address" value={dirText} onChange={e => setDirText(e.target.value)} required></input>
                        <div class="form-text">You must select an option when looking for you address</div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="coord-box" class="form-check-input" name="data-coord" onChange={() => setLocationForm('coord-box')} required/>
                            <label class="form-check-label" for="coord-box">Coordinates</label>
                        </div>
                        <div class="input-group gap-2">
                            <input class="form-control" type="text" disabled={locationForm !== 'coord-box'} value={latValue} onChange={e => setLatValue(e.target.value)} placeholder="Lat." required/>
                            <input class="form-control" type="text" disabled={locationForm !== 'coord-box'} value={lngValue} onChange={e => setLngValue(e.target.value)} placeholder="Long." required/>   
                        </div>
                        <div class="form-text">Only plain number is allowed</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="horizontal" class="form-check-input" name="plane" onChange={() => setOrientationForm('horizontal')} required/>
                            <label class="form-check-label" for="horizontal">Horizontal Panel</label>
                        </div>
                        <div class="form-text">For flat panels on roof, facing straight to the top - 0° tilt</div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input type="radio" id="tilted" class="form-check-input" name="plane" onChange={() => setOrientationForm('tilted')} required/>
                            <label class="form-check-label" for="tilted">Tilted Panel</label>
                        </div>
                        <div class="form-text">For tilted panels at optimal latitude angle</div>
                    </div>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary mt-2" disabled={isLoading}>
                        {isLoading ? (
                            <div>
                                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                                Loading...
                            </div>
                        ) : (
                            'Calculate Peak Sun Hours'
                        )}
                    </button>
                </div>
            </form>
            <section id="results-psh" class="mt-2">
            </section>
        </div>
    )
}

// to add details about simplifying things

export default PeakSolarHours;