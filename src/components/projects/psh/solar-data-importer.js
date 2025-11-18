import TiltedMath from './variables-calculator';

export async function parameterGetter(lat, lng) {
    const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN,ALLSKY_KT&community=RE&longitude=${lng}&latitude=${lat}&start=2024&end=2024&format=JSON`;
    try {
        const rawData = await fetch(url);
        if (!rawData.ok) throw new Error('Response Status: ', rawData.status);
        const data = await rawData.json();  
        const irradianceData = Object.entries(data.properties.parameter.ALLSKY_SFC_SW_DWN);
        const clearnessIndexData = Object.entries(data.properties.parameter.ALLSKY_KT)
        return {irradiance: irradianceData, kt: clearnessIndexData};
    } catch (err) {
        console.error(err.message);
    }     
}

export function horizontalPeakSunHours(irradianceData) {
    try {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const last = irradianceData[irradianceData.length-1];
        const annualAvg = last[1];
        const minValue = Math.min(...irradianceData.map(([_, value]) => value));
        const minMonth = months[Number(irradianceData.find(([_, value]) => minValue === value)[0].slice(-2)) - 1];
        const results = document.getElementById('results-psh');

        results.innerHTML = 
        `<div class="results">
        <h2>Results</h2>   
            <p class="fw-semibold">Average Peak Sun Hours Per Month For An Horizontal Plane</p>
            <div class="row border border-end-0 border-bottom-0 g-0">
                ${irradianceData.filter(([month, _]) => !month.endsWith('13')).map(([month, value]) => `<div class="col-sm-2 col-4 border-end border-bottom ps-2">${months[Number(month.slice(-2)) - 1]}: ${value.toFixed(2)}h</div>`).join('')}
            </div>
            <div class="mt-2"><span class="fw-semibold">Annual</span> Average Peak Solar Hours during 2024 is: ${annualAvg.toFixed(2)}h</div>
            <div class="mt-2">Worst Case on <span class="fw-semibold worst-case">${minMonth}</span> where its Peak Solar Hours is: ${minValue.toFixed(2)}h</div>
        </div>`
    } catch (err) {
        console.error(err.message);
    }
}

export function tiltedPeakSunHours(irradianceData, kt, lat) {
    const mathe = new TiltedMath();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Year']
    const ktYear = kt[kt.length-1][1];
    const values = irradianceData.map(([_, value]) => value)
    const minValue = Math.min(...values);
    const worstKtIndex = values.indexOf(minValue);
    const worstKt = kt[worstKtIndex][1];
    const minMonth = months[Number(irradianceData.find(([_, value]) => minValue === value)[0].slice(-2)) - 1];
    const results = document.getElementById('results-psh');

    const arrOfDays = mathe.daysPerPeriod(minMonth);
    const {arrOfSunDec, avgSunDec} = mathe.sunDeclination(arrOfDays);
    const {arrOfEarthEccCorr, avgEarthEccCorr} = mathe.earthEccentricityCorrection(arrOfDays);
    const {arrOfSunExitHor, avgSunExitHor} = mathe.sunExitAngleHorizontal(arrOfSunDec, lat);
    const {sunExitAngleTilted, tiltedAngle} = mathe.sunExitAngleTilted(avgSunDec, lat);
    const {dailyExtraIrr, avgDailyExtraIrr} = mathe.dailyExIrr(arrOfEarthEccCorr, arrOfSunDec, arrOfSunExitHor, lat);
    //const avgKt = mathe.avgClearIndex(ktTest);
    const diffIrrFr = mathe.diffuseIrrFraction(worstKt);
    const globalIrr = mathe.globalIrradiation(worstKt, avgDailyExtraIrr);
    const avgDailyDiffIrr = mathe.avgDailyDiffuseIrr(globalIrr, diffIrrFr);
    const avgDailyDirIrr = mathe.avgDailyDirectIrr(globalIrr, avgDailyDiffIrr);
    const k = mathe.correctionFactor(sunExitAngleTilted, avgSunDec, lat, tiltedAngle, avgSunExitHor);
    const avgDailyDirIrrTilted = mathe.avgDailyDirectIrrTilt(avgDailyDirIrr, k)
    const avgDailyDiffIrrTilted = mathe.avgDailyDiffIrrTilt(avgDailyDiffIrr, tiltedAngle);
    const albedoIrr = mathe.avgDailyAlbedoIrrTilt(globalIrr, tiltedAngle)
    const totalIrrTiltPlane = mathe.totalIrrOnTiltedPlane(avgDailyDirIrrTilted, avgDailyDiffIrrTilted, albedoIrr);

    const year = (kt, lat) => {
        const arrOfDays = mathe.daysPerPeriod('Year');
        const {arrOfSunDec, avgSunDec} = mathe.sunDeclination(arrOfDays);
        const {arrOfEarthEccCorr, avgEarthEccCorr} = mathe.earthEccentricityCorrection(arrOfDays);
        const {arrOfSunExitHor, avgSunExitHor} = mathe.sunExitAngleHorizontal(arrOfSunDec, lat);
        const {sunExitAngleTilted, tiltedAngle} = mathe.sunExitAngleTilted(avgSunDec, lat);
        const {dailyExtraIrr, avgDailyExtraIrr} = mathe.dailyExIrr(arrOfEarthEccCorr, arrOfSunDec, arrOfSunExitHor, lat);
        //const avgKt = mathe.avgClearIndex(ktTest);
        const diffIrrFr = mathe.diffuseIrrFraction(kt);
        const globalIrr = mathe.globalIrradiation(kt, avgDailyExtraIrr);
        const avgDailyDiffIrr = mathe.avgDailyDiffuseIrr(globalIrr, diffIrrFr);
        const avgDailyDirIrr = mathe.avgDailyDirectIrr(globalIrr, avgDailyDiffIrr);
        const k = mathe.correctionFactor(sunExitAngleTilted, avgSunDec, lat, tiltedAngle, avgSunExitHor);
        const avgDailyDirIrrTilted = mathe.avgDailyDirectIrrTilt(avgDailyDirIrr, k)
        const avgDailyDiffIrrTilted = mathe.avgDailyDiffIrrTilt(avgDailyDiffIrr, tiltedAngle);
        const albedoIrr = mathe.avgDailyAlbedoIrrTilt(globalIrr, tiltedAngle)
        const totalIrrTiltPlane = mathe.totalIrrOnTiltedPlane(avgDailyDirIrrTilted, avgDailyDiffIrrTilted, albedoIrr);
        return totalIrrTiltPlane
    }

    const pshYear = year(ktYear, lat);

    console.log('arrOfDays: ', arrOfDays);
    console.log('arrOfSunDec: ', arrOfSunDec);
    console.log('avgSunDec: ', avgSunDec);
    console.log('arrOfEarthEccCorr: ', arrOfEarthEccCorr);
    console.log('avgEarthEccCorr: ', avgEarthEccCorr);
    console.log('arrOfSunExitHor: ', arrOfSunExitHor);
    console.log('avgSunExitHor: ', avgSunExitHor);
    console.log('sunExitAngleTilted: ', sunExitAngleTilted);
    console.log('tiltedAngle: ', tiltedAngle)
    console.log('dailyExtraIrr: ', dailyExtraIrr);
    console.log('avgDailyExtraIrr: ', avgDailyExtraIrr);
    console.log('diffIrrFr :', diffIrrFr);
    console.log('globalIrr: ', globalIrr);
    console.log('avgDailyDiffIrr: ', avgDailyDiffIrr);
    console.log('avgDailyDirIrr : ', avgDailyDirIrr);
    console.log('Correction Factor: ', k);
    console.log('avgDailyDirIrrTilted: ', avgDailyDirIrrTilted);
    console.log('avgDailyDiffIrrTilted: ', avgDailyDiffIrrTilted);
    console.log('albedoIrr: ', albedoIrr);
    console.log('totalIrrTiltPlane: ', totalIrrTiltPlane);

    results.innerHTML = 
        `<p class="fw-semibold">Average Peak Sun Hours Per Month For An Horizontal Plane</p>
        <div class="row border border-end-0 border-bottom-0 g-0">
            ${irradianceData.filter(([month, _]) => !month.endsWith('13')).map(([month, value]) => `<div class="col-sm-2 col-4 border-end border-bottom ps-2">${months[Number(month.slice(-2)) - 1]}: ${value.toFixed(2)}h</div>`).join('')}
        </div>
        <p class="mt-2">The following parameters are needed to calculate the peak sun hours for the worst case period which is the month of <span class="fw-semibold worst-case">${minMonth}</span> with the lowest irradiance.</p>
        <ul>
            <li>Sun Declination: ${avgSunDec.toFixed(2)}°</li>
            <li>Earth's Orbital Eccentricity Correction Factor: ${avgEarthEccCorr.toFixed(2)}</li>
            <li>Sun Exit Horizontal Angle: ${avgSunExitHor.toFixed(2)}°</li>
            <li>Sun Exit Tilted Angle: ${sunExitAngleTilted.toFixed(2)}°</li>
            <li>Tilted Angle for Plane: ${tiltedAngle}°</li>
            <li>Daily Extraterrestrial Irradiation: ${avgDailyExtraIrr.toFixed(2)}kWh/m2</li>
            <li>Clearness Index: ${worstKt}</li>
            <li>Diffuse Irradiation Fraction: ${diffIrrFr.toFixed(2)}kWh/m2</li>
            <li>Global Irradiation: ${globalIrr.toFixed(2)}kWh/m2</div>
            <li>Daily Diffuse Irradiation: ${avgDailyDiffIrr.toFixed(2)}kWh/m2</li>
            <li>Daily Direct Irradiation: ${avgDailyDirIrr.toFixed(2)}kWh/m2</li>
            <li>Correction Factor: ${k.toFixed(2)}</li>
            <li>Daily Direct Irradiation for Tilted Plane: ${avgDailyDirIrrTilted.toFixed(2)}kWh/m2</li>
            <li>Daily Diffuse Irradiation for Tilted Plane: ${avgDailyDiffIrrTilted.toFixed(2)}kWh/m2</li>
            <li>Daily Albedo Irradiation for Tilted Plane: ${albedoIrr.toFixed(2)}Wh/m2</li>
            <li>Total Daily Irradiation for Tilted Plane: ${totalIrrTiltPlane.toFixed(2)}kWh/m2</li>
        </ul>
        <div class="mt-2">Peak Solar Hours on <span class="fw-semibold worst-case">${minMonth}</span> for a plane tilted ${tiltedAngle}° is: ${totalIrrTiltPlane.toFixed(2)}h</div>
        <div class="mt-2"><span class="fw-semibold">Annual</span> Average Peak Solar Hours for a plane tilted ${tiltedAngle}° during 2024 is: ${pshYear.toFixed(2)}h</div>`
}
