class LayoutCalculator {
    constructor(psh, totalSystemEnergy, lat, planeLength, maxPlaneVolt, maxPlaneCurr, planePower, maxInvVolt, minInvVolt, maxInvCurr, invPower) {
        if (psh <= 0) throw new Error('psh must be positive');
        if (totalSystemEnergy < 0) throw new Error('totalSystemEnergy cannot be negative');
        if (planeLength <= 0) throw new Error('planeLength must be positive');
        if (maxPlaneVolt <= 0) throw new Error('maxPlaneVolt must be positive');
        if (maxPlaneCurr <= 0) throw new Error('maxPlaneCurr must be positive');
        if (planePower <= 0) throw new Error('planePower must be positive');
        if (maxInvVolt <= 0 || minInvVolt <= 0) throw new Error('Inverter voltages must be positive');
        if (maxInvCurr <= 0) throw new Error('maxInvCurr must be positive');
        if (invPower <= 0) throw new Error('invPower must be positive');

        this.psh = psh;
        this.lat = lat;
        this.totalSystemEnergy = totalSystemEnergy;
        this.planeLength = planeLength;
        this.maxPlaneVolt = maxPlaneVolt;
        this.maxPlaneCurr = maxPlaneCurr;
        this.planePower = planePower;
        this.maxInvVolt = maxInvVolt;
        this.minInvVolt = minInvVolt;
        this.maxInvCurr = maxInvCurr;
        this.invPower = invPower;
        
        
        if (this.maxPlaneVolt <= 0) {
            throw new Error('maxPlaneVolt must be positive');
        }
    }

    planeNumber() {
        return Math.ceil(this.totalSystemEnergy / (this.maxPlaneVolt * this.maxPlaneCurr * this.psh));
        
    }

    planeStringNumber() {
        const invVolt = (this.maxInvVolt + this.minInvVolt) / 2
        return Math.floor(invVolt / this.maxPlaneVolt);
    }

    planeParallelNumber() {
        return Math.floor(this.maxInvCurr / this.maxPlaneCurr);
    }

    invNumber() {
        return Math.ceil(this.planeNumber() / (this.planeStringNumber() * this.planeParallelNumber()));
    }

    checkingLimits() {
        if (this.invPower * this.invNumber() < this.planePower * this.planeNumber()) 
            throw new Error ("Planes Total Power musn't exceed Inverters Total Power");
    }

    optAngle() {
        const tiltedRule = [[0, 15, 0], [16, 30, 1], [31, 45, 2], [46, 90, 3]];
        const rule = tiltedRule.find(([start, end]) => Math.abs(this.lat) > start && Math.abs(this.lat) <= end);
        return 15 + 5 * rule[2];
    }

    minimumDistance() {
        const angle = this.optAngle() * Math.PI / 180;
        const h = Math.sin(angle) * this.planeLength;
        const b = Math.cos(angle) * this.planeLength;
        const tetha = (90 - this.optAngle()) * Math.PI / 180;
        const a = h / Math.tan(tetha);
        return a + b;
    }

    actualPlaneParalallelNumber() {
        return Math.floor(this.planeNumber() / (this.invNumber() * this.planeStringNumber()))
    }

    excessPlaneNumber() {
        return this.planeNumber() % (this.invNumber() * this.planeStringNumber())
    }
}

export default LayoutCalculator;
