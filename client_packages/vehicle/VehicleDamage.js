let vdMgr = {

    rdr: null,
    tmt: null,
    col: null,
    fh: -1,

    onRdr() {

        const pv = mp.players.local.vehicle;

        if (pv) {
            if (pv.hasCollidedWithAnything()) {
                let s = pv.getSpeed() * 3.6;
                if (s > 20) {
                    if (this.tmt === null) {
                        const vd = parseInt(s / 2);
                        if (vd > 0) {
                            mp.events.callRemote("OnVehicleDamageEvent", pv, vd);
                            this.tmt = setTimeout(() => { vdMgr.tmt = null; }, 4500);
                        }
                    }

                    if (this.col === null) {
                        if (this.fh === -1) this.fh = s;
                        this.col = setTimeout(() => {
                            if (pv) {
                                s = pv.getSpeed() * 3.6;
                                const d = vdMgr.fh - s;
                                if ((vdMgr.fh > 60 && d > 25) || d > 40) mp.events.callRemote("OnVehicleDamageEvent", pv, parseInt(d * 10));
                                vdMgr.fh = -1;
                                vdMgr.col = null;
                            }
                        }, 500);
                    }
                }
            }
        }
    },

    sDam(v, h) {
        v.setEngineHealth(h);
    },

    vEnt() {
        if (this.rdr !== null) return;
        this.rdr = new mp.Event("render", () => { this.onRdr(); });
    },

    vLea() {
        if (this.rdr === null) return;
        this.rdr.destroy();
        this.rdr = null;
    }

};

mp.events.addDataHandler("HP", (e, v) => {
    if (e && e.handle !== 0 && e.type === "vehicle" && v) vdMgr.sDam(e, v);
});

mp.events.add("entityStreamIn", (e) => {
    if (e && e.handle !== 0 && e.type === "vehicle") {
        const v = e.getVariable("HP");
        if (v) vdMgr.sDam(e, v);
    }
});

mp.events.add({
    "playerEnterVehicle"() { vdMgr.vEnt(); },
    "playerLeaveVehicle"() { vdMgr.vLea(); }
});