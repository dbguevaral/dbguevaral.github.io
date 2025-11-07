class TiltedMath {

    daysPerPeriod(period) {
        const daysPerMonth = [['January', 1, 31], ['February', 32, 60], ['March', 61, 91], ['April', 92, 121], ['May', 122, 152], ['June', 153, 182], ['July', 183, 213],['August', 214, 244], ['September', 245, 274], ['October', 275, 305], ['November', 306, 335], ['December', 336, 366], ['Year', 1, 366]];
        const targetMonth = daysPerMonth.find(([month]) => month === period);
        const arrOfDays = Array(targetMonth[2] - targetMonth[1] + 1).fill().map((_, i) => targetMonth[1] + i);
        return arrOfDays;
    }

    sunDeclination(arrOfDays) {
        const arrOfSunDec = arrOfDays.map(dn => 23.45 * Math.sin(2 * Math.PI * (284 + dn) / 365));
        const avgSunDec = arrOfSunDec.reduce((sum, val) => sum + val, 0) / arrOfSunDec.length;
        return {arrOfSunDec: arrOfSunDec, avgSunDec: avgSunDec}
    }

    earthEccentricityCorrection(arrOfDays) {
        const arrOfEarthEccCorr = arrOfDays.map(dn => 1 + 0.033 * Math.cos(2 * Math.PI * (dn / 365)));
        const avgEarthEccCorr = arrOfEarthEccCorr.reduce((sum, val) => sum + val, 0) /arrOfEarthEccCorr.length;
        return {arrOfEarthEccCorr: arrOfEarthEccCorr, avgEarthEccCorr: avgEarthEccCorr};
    }

    sunExitAngleHorizontal(arrOfSunDec, lat) {
        const arrOfSunExitHor = arrOfSunDec.map(sd => -Math.acos(-Math.tan(sd * Math.PI / 180) * Math.tan(lat * Math.PI / 180)) * 180 / Math.PI)
        const avgSunExitHor = arrOfSunExitHor.reduce((sum, val) => sum + val, 0) /arrOfSunExitHor.length;
        return {arrOfSunExitHor: arrOfSunExitHor, avgSunExitHor: avgSunExitHor};
    }

    sunExitAngleTilted(avgSunDec, lat) {
        const tiltedRule = [[0, 15, 0], [16, 30, 1], [31, 45, 2], [46, 90, 3]];
        const rule = tiltedRule.find(([start, end]) => Math.abs(lat) > start && Math.abs(lat) <= end);
        const tiltedAngle = 15 + 5 * rule[2];
        const sunExitAngleTilted = -Math.acos(-Math.tan(avgSunDec * Math.PI / 180) * Math.tan((lat - tiltedAngle) * Math.PI / 180)) * 180 / Math.PI;
        return {sunExitAngleTilted: sunExitAngleTilted, tiltedAngle: tiltedAngle};
    }

    dailyExIrr(arrOfEarthEccCorr, arrOfSunDec, arrOfSunExitHor, lat) {
        const t = 24; 
        const b = 1.367;
        const dailyExtraIrr = arrOfEarthEccCorr.map((e, i) => t/Math.PI * b * e * Math.cos(lat*Math.PI/180) * Math.cos(arrOfSunDec[i]*Math.PI/180) * (arrOfSunExitHor[i]*Math.PI/180 * Math.cos(arrOfSunExitHor[i]*Math.PI/180) - Math.sin(arrOfSunExitHor[i]*Math.PI/180)));
        const avgDailyExtraIrr = dailyExtraIrr.reduce((sum, val) => sum + val, 0) /dailyExtraIrr.length;
        return {dailyExtraIrr: dailyExtraIrr, avgDailyExtraIrr: avgDailyExtraIrr};
    }

    /*avgClearIndex(kt) {
        const monthsKt = kt.slice(0, -1).map(e => e[1]);
        const avgKt = monthsKt.reduce((sum, val) => sum + val, 0)/(monthsKt.length);
        return avgKt;
    }*/

    diffuseIrrFraction(avgKt) {
        const diffIrrFr = 1 - 1.13 * avgKt;
        return diffIrrFr;
    }

    globalIrradiation(avgKt, avgDailyExtraIrr) {
        const globalIrradiation = avgKt * avgDailyExtraIrr;
        return globalIrradiation;
    }

    avgDailyDiffuseIrr(globalIrradiation, diffIrrFr) {
        const avgDiffIrr = globalIrradiation * diffIrrFr;
        return avgDiffIrr;
    }

    avgDailyDirectIrr(globalIrradiation, avgDiffIrr) {
        const avgDirIrr = globalIrradiation - avgDiffIrr;
        return avgDirIrr;
    }

    correctionFactor(sunExitAngleTilted, avgSunDec, lat, tiltedAngle, avgSunExitHor) {
        const k = (sunExitAngleTilted*Math.PI/180 * Math.sin(avgSunDec*Math.PI/180) * Math.sin((lat-tiltedAngle)*Math.PI/180) + Math.cos(avgSunDec*Math.PI/180) * Math.cos((lat-tiltedAngle)*Math.PI/180) * Math.sin(sunExitAngleTilted*Math.PI/180)) / (avgSunExitHor*Math.PI/180 * Math.sin(avgSunDec*Math.PI/180) * Math.sin(lat*Math.PI/180) + Math.cos(avgSunDec*Math.PI/180)*Math.cos(lat*Math.PI/180) * Math.sin(avgSunExitHor*Math.PI/180));
        return k;
    }

    avgDailyDirectIrrTilt(avgDirIrr, k) {
        const avgDailyDirIrrTilted = avgDirIrr * k;
        return avgDailyDirIrrTilted;
    }

    avgDailyDiffIrrTilt(avgDiffIrr, tiltedAngle) {
        const avgDailyDiffIrrTilted = avgDiffIrr * (1 + Math.cos(tiltedAngle*Math.PI/180)) / 2;
        return avgDailyDiffIrrTilted;
    }

    avgDailyAlbedoIrrTilt(globalIrradiation, tiltedAngle) {
        const p = 0.2; 
        const albedoIrr = p * globalIrradiation * (1 + Math.cos(tiltedAngle*Math.PI/180)) / 2;
        return albedoIrr;
    }

    totalIrrOnTiltedPlane(avgDailyDirIrrTilted, avgDailyDiffIrrTilted, albedoIrr) {
        const totalIrrTiltPlane = avgDailyDirIrrTilted + avgDailyDiffIrrTilted + albedoIrr;
        return totalIrrTiltPlane;
    }
}

export default TiltedMath;
