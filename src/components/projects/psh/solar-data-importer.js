export default async function horizontalPlaneDataImporter(lat, lng) {
    const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lng}&latitude=${lat}&start=2024&end=2024&format=JSON`

    try {
        const rawData = await fetch(url);
        if (!rawData.ok) throw new Error('Response Status: ', rawData.status);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const data = await rawData.json();
        const entries = Object.entries(data.properties.parameter.ALLSKY_SFC_SW_DWN);
        const last = entries[entries.length-1];
        const annualAvg = last[1];
        const minValue = Math.min(...entries.map(([_, v]) => v));
        const results = document.getElementById('results');

        results.innerHTML = 
        `<div class="row border">
            ${entries.filter(([m]) => !m.endsWith('13')).map(([month, value]) => `<div class="col-sm-2">${months[Number(month.slice(-2)) - 1]}: ${value}h</div>`).join('')}
        </div>`

        const annual = `<div class="border mt-2">Average Annual Peak Solar Hours: ${annualAvg}h</div>`;
        const worstCase =  `<div class="border mt-2">Worst Case Scenario Average Peak Solar Hours: ${minValue}h</div>`;


    } catch (err) {
        console.error(err.message);
    }
}

