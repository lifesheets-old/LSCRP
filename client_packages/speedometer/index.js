let Speedo = {
	
    enabled: false,
    browser: null,
    t1: null,
    t2: null,
    n: [0, 0, 0],
	metric: false,

    InitVehicle(vehicle, seat) {

	
        if (this.browser) this.browser.destroy();

        this.browser = mp.browsers.new('package://speedometer/CEF/vehicle.html');
        if (this.browser) {

			this.metric = mp.game.gameplay.getProfileSetting(227) == 1;
            this.enabled = true;

            if (this.t1 !== null) clearInterval(this.t1);
            if (this.t2 !== null) clearInterval(this.t2);

            this.t1 = setInterval(() => { this.Tick(); }, 10000);
            this.t2 = setInterval(() => { this.Update(); }, 60);
			

			this.updateMetric();
            this.updateMaxFuel(vehicle.getVariable('TankMax') ? vehicle.getVariable('TankMax').toFixed(1) : 100);
            this.updateMilage(vehicle.getVariable('Kilometer').toFixed(1));
			
        }

    },

    OnLeave() {

        if (this.t1 !== null) clearInterval(this.t1);
        this.t1 = null;

        if (this.t2 !== null) clearInterval(this.t2);
        this.t2 = null;

        if (this.browser) {
            this.enabled = false;
            this.browser.destroy();
            this.browser = null;
        }

    },

    Update() {

        if (player.vehicle) {

            // SPEED
            if (this.n[0] !== player.vehicle.getSpeed()) {
                this.n[0] = player.vehicle.getSpeed();
                this.updateSpeed(this.n[0] * (this.metric ? 3.6 : 2.236936));
            }

            // RPM
            if (this.n[1] !== player.vehicle.rpm) {
                this.n[1] = player.vehicle.rpm;
                this.updateRPM(this.n[1]);
            }

            // GEAR
            if (this.n[2] !== player.vehicle.gear) {
                this.n[2] = player.vehicle.gear;
                this.updateGear(this.n[2]);
            }

        }

    },

    Tick() {
		
        if (player.vehicle) {
			this.updateFuel(player.vehicle.getVariable("fuel"));
			this.updateMilage(player.vehicle.getVariable("Kilometer").toFixed(1));			
		}

    },

    updateSpeed(speed) {
        if (this.enabled) this.browser.execute(`Vehicle.updateSpeed(${speed});`);
    },
    updateRPM(rpm) {
        if (this.enabled) this.browser.execute(`Vehicle.updateRPM('${rpm}');`);
    },
    updateFuel(fuel) {
        if (this.enabled) this.browser.execute(`Vehicle.updateFuel('${fuel}');`);
    },
    updateMaxFuel(maxfuel) {
        if (this.enabled) this.browser.execute(`Vehicle.updateMaxFuel('${maxfuel}');`);
    },
    updateGear(gear) {
        if (this.enabled) this.browser.execute(`Vehicle.updateGear('${gear}');`);
    },
    updateBrake(toggle) {
        if (this.enabled) this.browser.execute(`Vehicle.updateBrake(${toggle});`);
    },
    updateIndicators(side, toggle) {
        if (this.enabled) this.browser.execute(`Vehicle.updateIndicators(${side}, ${toggle});`);
    },
    updateBurnoff(burnoff) {
        if (this.enabled) this.browser.execute(`Vehicle.updateBurnoff(${burnoff});`);
    },
	updateMetric() {
        if (this.enabled) this.browser.execute(`Vehicle.updateMetric(${(this.metric ? 1 : 0)});`);		
	},
	updateMilage(milage) {
        if (this.enabled) this.browser.execute(`Vehicle.updateMilage(${milage});`);			
	}

};

mp.events.add({
    "playerEnterVehicle"() { Speedo.InitVehicle(...arguments); },
    "playerLeaveVehicle"() { Speedo.OnLeave(); },

    "DASH_SYNC": function() {
        switch (arguments[0]) {
            case "brake": Speedo.updateBrake(arguments[1]); break;
            case "indicator": Speedo.updateIndicators(arguments[1], arguments[2]); break;
        }
    },

});