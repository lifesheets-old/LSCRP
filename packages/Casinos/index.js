let casinos = [];

casinos[0] = {
	type: "slot",
	colshape: mp.colshapes.newSphere(1115.86, 228.77, -49.84, 4, 0),
	minBet: 200,
	maxBet: 1000
};

casinos[1] = {
	type: "slot",
	colshape: mp.colshapes.newSphere(1119.54, 232.975, 232.97, 4, 0),
	minBet: 500,
	maxBet: 3000
};

casinos[2] = {
	type: "slot1",
	colshape: mp.colshapes.newSphere(1112.89, 235.16, -49.84, 4, 0),
	minBet: 10000,
	maxBet: 50000
};

casinos[3] = {
	type: "slot1",
	colshape: mp.colshapes.newSphere(1108.36, 233.16, -49.84, 4, 0),
	minBet: 10000,
	maxBet: 50000
};

casinos[3] = {
	type: "slot2",
	colshape: mp.colshapes.newSphere(1106.18, 229.71, -49.84, 4, 0),
	minBet: 100000,
	maxBet: 250000
};

mp.events.add("PushE", (player) => {
	
    if (mp.players.exists(player)) {
		for(let i in casinos) {
			if(casinos[i].colshape &&
			casinos[i].colshape.isPointWithin(player.position)) {
				const casinoInstance = { type: casinos[i].type, minBet: casinos[i].minBet, maxBet: casinos[i].maxBet };
				player.call("casino.open", [JSON.stringify(casinoInstance), player.data.money]);
			}
		}
    }
});

mp.events.add("casino.win", (player, moneyWon) =>
{
	
	let money = player.data.money;
	money = money + moneyWon;
	
	gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [money, player.data.charId], function (err4,res4) {
		if (err4) console.log("Error in Update characters on Casinos: "+err4);
		player.data.money = money;
		player.call("updateHudMoney", [money]);       
		player.call("changeValue", ['money', money]); 
	});
	
});

mp.events.add("casino.take", (player, moneyTaken) =>
{
	
	let money = player.data.money;
	money = money - moneyTaken;
	
	gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [money, player.data.charId], function (err4,res4) {
		if (err4) console.log("Error in Update characters on Casinos: "+err4);
		player.data.money = money;
		player.call("updateHudMoney", [money]);       
		player.call("changeValue", ['money', money]); 
	});
	
});