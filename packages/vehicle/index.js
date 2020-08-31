mp.events.add("OnVehicleDamageEvent", (player, vehicle, damage) => {
	
	if (!vehicle || !damage) return;
	if (damage > 450) damage = 700;
	
	let hp = vehicle.getVariable("HP");
	if(!hp) hp = 1700;
	
	vehicle.setVariable("HP", hp - damage);
	
});