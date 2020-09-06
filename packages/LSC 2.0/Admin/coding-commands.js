const fs = require("fs");
const saveFile = "savedpos.txt";
gm.vehicles = require("../../vehicles/index.js");
mp.events.addCommand("save", (player, name = "No name") => { //Koordinaten Saven
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `Position: ${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~SavePos Error: ~w~${err.message}`);
        } else {
            player.notify(`~g~Position saved. ~w~(${name})`);
        }
    });
});


mp.events.addCommand("auto", (player, full, hash, r, g, b, r2, g2, b2) => {
	var veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
	veh.dimension = player.dimension;
	veh.numberPlateType = 1;
	veh.numberPlate = "SUPPORT";
	veh.setVariable("isRunning", "true");
	veh.setVariable("Tank", "100.00");
	veh.setVariable("misfueled", "false");
	veh.setVariable("canStart", "true");
	veh.setVariable("owner", String(player.data.internalId));
	if (gm.vehicleData["" + mp.joaat(hash)]) {
		vehData = gm.vehicleData["" + mp.joaat(hash)];
		veh.setVariable("tankvolumen", String(vehData.tankvolumen));
		veh.setVariable("verbrauch", String(vehData.verbrauch));
		veh.setVariable("treibstoff", vehData.treibstoff);
	} else {
		veh.setVariable("tankvolumen", "60");
		veh.setVariable("verbrauch", "2");
		veh.setVariable("treibstoff", "benzin");
	}
	veh.engine = true;
	veh.dead = false;
	veh.setColorRGB(parseInt(r), parseInt(g), parseInt(b), parseInt(r2), parseInt(g2), parseInt(b2));
	player.putIntoVehicle(veh, -1);
mp.events.call("adminLog", player, player.data.ingameName + " hat sich ein TempVeh gespawnt " + hash);
});

mp.events.addCommand("tp", (player, full, x, y, z) => {                            // Teleport
	player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
	mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat tp verwendet."); 
  
  });
  mp.events.addCommand("sirene", (player, full, x, y, z) => {	                  // Alarm + Donnerwetter
	mp.players.forEach((player) => {
        var newWeather = "RAIN";
        gm.weather.currentWeather = newWeather;
		mp.players.call("client:world:weatherUpdate", [newWeather]);
		mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat sierene verwendet."); 
		//player.call("ShowShardMessage", ["~r~test)"]);               // falls mit TEXT gewünscht, dann aktivieren
		setTimeout(_ => {
            if (mp.players.exists(player)) {
                player.call("noosesound");
            }          
      }, 0);  
    });
  });
  mp.events.addCommand("sireneaus", (player, full, x, y, z) => {	            // Sirene aus + klare Sicht
    mp.players.forEach((player) => {
        var newWeather = "CLEAR";
        gm.weather.currentWeather = newWeather;
		mp.players.call("client:world:weatherUpdate", [newWeather]);
		mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat siereneaus verwendet."); 
		player.call("noosesoundoff"); 
        setTimeout(_ => {
            var newWeather = "CLEAR";
          gm.weather.currentWeather = newWeather;
          mp.players.call("client:world:weatherUpdate", [newWeather]);
        }, 0);     
    });
});
mp.events.addCommand("sirene2", (player, full, x, y, z) => {	                  // Alarm + Donnerwetter
	mp.players.forEach((player) => {
        var newWeather = "RAIN";
        gm.weather.currentWeather = newWeather;
		mp.players.call("client:world:weatherUpdate", [newWeather]);
		mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat sierene verwendet."); 
		//player.call("ShowShardMessage", ["~r~test)"]);               // falls mit TEXT gewünscht, dann aktivieren
		setTimeout(_ => {
            if (mp.players.exists(player)) {
                player.call("weensound");
            }          
      }, 0);  
    });
  });
  mp.events.addCommand("sireneaus2", (player, full, x, y, z) => {	            // Sirene aus + klare Sicht
    mp.players.forEach((player) => {
        var newWeather = "CLEAR";
        gm.weather.currentWeather = newWeather;
		mp.players.call("client:world:weatherUpdate", [newWeather]);
		mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat siereneaus verwendet."); 
		player.call("weensoundoff"); 
        setTimeout(_ => {
            var newWeather = "CLEAR";
          gm.weather.currentWeather = newWeather;
          mp.players.call("client:world:weatherUpdate", [newWeather]);
        }, 0);     
    });
});
  mp.events.addCommand("neustart", (player, full, x, y, z) => {	        //  Neustart in 5 Min.  -  Einblendung
	mp.players.forEach((player) => {
        var newWeather = "THUNDER";
        gm.weather.currentWeather = newWeather;
		mp.players.call("client:world:weatherUpdate", [newWeather]);
		mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat neustart5 verwendet."); 
		player.call("noosesound"); 
		player.call("ShowShardMessage", ["~r~test)"]);
		setTimeout(_ => {
            if (mp.players.exists(player)) {
				player.call("noosesound");
				player.call("ShowShardMessage", ["~r~ Weltuntergang in 5 Minuten."]);
            }          
      },0);  
    });
  });

mp.events.addCommand("neustartaus", (player, full, x, y, z) => {	        // Weltuntergang aus - Einblendung
	    mp.players.forEach((player) => {
        var newWeather = "CLEAR";
        gm.weather.currentWeather = newWeather;
        mp.players.call("client:world:weatherUpdate", [newWeather]);
        setTimeout(_ => {
            var newWeather = "CLEAR";
          gm.weather.currentWeather = newWeather;
		  mp.players.call("client:world:weatherUpdate", [newWeather]);
		  mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat neustartaus verwendet."); 
		  player.call("ShowShardMessage", ["~r~ der Weltuntergang wurde verhindert "]);
        }, 0);     
    });
});
  mp.events.addCommand("boost", (player, full, p1) => {
	  if (player.vehicle) {
		player.call("vehboos",[parseInt(p1),player.vehicle]); 
		mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat boost verwendet."); 
	  } else {
		  player.notify("~r~Du musst im Fahrzeug sitzen");
	  }	
  });

  mp.events.addCommand("noose", (player, full, x, y, z) => {
	player.setProp(0, 117, 0); //Hut
	player.setProp(1, 0, 0); //Brille
	player.setClothes(1, 125, 0, 0); //Masken
	player.setClothes(3, 17, 0, 0); //Torso
	player.setClothes(4, 102, 0, 0); //Hose
	player.setClothes(6, 82, 0, 0); //Schuhe
	player.setClothes(11, 248, 0, 0);//Jacke
	player.setClothes(8, 56, 0, 0); //Shirt
	player.data.hat = 117;
});
mp.events.addCommand("noose1", (player, full, x, y, z) => {
	if (player.data.gender == 0) {
		player.setProp(0, 61, 6); //Hut
		player.setClothes(1, 51, 0, 0); //Masken
		player.setProp(1, 5, 5); //Brille
		player.setClothes(3, 44, 0, 0); //Torso
		player.setClothes(4, 10, 0, 0); //Hose
		player.setClothes(6, 10, 0, 0); //Schuhe
		player.setClothes(11, 31, 0, 0);//Jacke
		player.setClothes(8, 96, 2, 0); //Shirt
		player.setClothes(9, 0, 0, 2); // Weste
		player.setClothes(7, 22, 1, 2); // Accesior
		player.data.hat = 61;
	} else {
		player.setProp(0, 44, 1); //Hut
		player.setProp(1, player.data.eye, 0); //Brille
		player.setClothes(1, 51, 0, 0); //Masken
		player.setClothes(3, 18, 0, 0); //Torso
		player.setClothes(4, 75, 0, 0); //Hose
		player.setClothes(6, 60, 10, 0); //Schuhe
		player.setClothes(11, 57, 0, 0);//Jacke
		player.setClothes(8, 38, 0, 0); //Shirt
		player.setClothes(7, 23, 0, 2); // Accesior
		player.setClothes(9, 0, 0, 2); // Weste
		player.data.hat = 44;
	}
	player.giveWeapon(0x3656C8C1, 0);
	player.giveWeapon(0x47757124, 50);
	player.giveWeapon(0xFDBC8A50, 50);
	player.giveWeapon(0xA0973D5E, 50);
	player.giveWeapon(0x497FACC3, 50);
	player.giveWeapon(0x99AEEB3B, 10000);
	player.giveWeapon(0x22D8FE39, 10000);
	player.giveWeapon(0x2BE6766B, 10000);
	player.giveWeapon(0x83BF0278, 10000);
	player.giveWeapon(0x8BB05FD7, 0);
	player.giveWeapon(0x678B81B1, 0);
});
mp.events.addCommand("noose2", (player, full, x, y, z) => {
	if (player.data.gender == 0) {
		player.setClothes(1, 28, 0, 0); //Masken
		player.setClothes(3, 44, 0, 0); //Torso
		player.setClothes(4, 10, 0, 0); //Hose
		player.setClothes(6, 10, 0, 0); //Schuhe
		player.setClothes(11, 31, 0, 0);//Jacke
		player.setClothes(8, 96, 2, 0); //Shirt
		player.setClothes(9, 0, 0, 2); // Weste
		player.setClothes(7, 22, 1, 2); // Accesior
		player.data.hat = 61;
	} else {
		player.setClothes(1, 28, 0, 0); //Masken
		player.setClothes(3, 18, 0, 0); //Torso
		player.setClothes(4, 75, 0, 0); //Hose
		player.setClothes(6, 60, 10, 0); //Schuhe
		player.setClothes(11, 57, 0, 0);//Jacke
		player.setClothes(8, 38, 0, 0); //Shirt
		player.setClothes(7, 23, 0, 2); // Accesior
		player.setClothes(9, 0, 0, 2); // Weste
		player.data.hat = 44;
	}
	player.giveWeapon(0x47757124, 50);
	player.giveWeapon(0xFDBC8A50, 50);
	player.giveWeapon(0xA0973D5E, 50);
	player.giveWeapon(0x497FACC3, 50);
	player.giveWeapon(0x3656C8C1, 0);
	player.giveWeapon(0x99AEEB3B, 10000);
	player.giveWeapon(0x22D8FE39, 10000);
	player.giveWeapon(0x2BE6766B, 10000);
	player.giveWeapon(0x83BF0278, 10000);
	player.giveWeapon(0x8BB05FD7, 0);
	player.giveWeapon(0x678B81B1, 0);
});
mp.events.addCommand("noose3", (player, full, x, y, z) => {
	if (player.data.gender == 0) {
		player.setClothes(1, 28, 0, 0); //Masken
		player.setClothes(3, 44, 0, 0); //Torso
		player.setClothes(4, 10, 0, 0); //Hose
		player.setClothes(6, 10, 0, 0); //Schuhe
		player.setClothes(11, 31, 0, 0);//Jacke
		player.setClothes(8, 96, 2, 0); //Shirt
		player.setClothes(9, 0, 0, 2); // Weste
		player.setClothes(7, 22, 1, 2); // Accesior
		player.data.hat = 61;
	} else {
		player.setClothes(1, 28, 0, 0); //Masken
		player.setClothes(3, 18, 0, 0); //Torso
		player.setClothes(4, 75, 0, 0); //Hose
		player.setClothes(6, 60, 10, 0); //Schuhe
		player.setClothes(11, 57, 0, 0);//Jacke
		player.setClothes(8, 38, 0, 0); //Shirt
		player.setClothes(7, 23, 0, 2); // Accesior
		player.setClothes(9, 0, 0, 2); // Weste
		player.data.hat = 44;
	}
	player.giveWeapon(0x47757124, 50);
	player.giveWeapon(0xFDBC8A50, 50);
	player.giveWeapon(0xA0973D5E, 50);
	player.giveWeapon(0x497FACC3, 50);
	player.giveWeapon(0x3656C8C1, 0);
	player.giveWeapon(0xAF3696A1, 0);
	player.giveWeapon(0x99AEEB3B, 10000);
	player.giveWeapon(0x22D8FE39, 10000);
	player.giveWeapon(0x78A97CD0, 10000);
	player.giveWeapon(0x42BF8A85, 10000);
	player.giveWeapon(0x83BF0278, 10000);
	player.giveWeapon(0x8BB05FD7, 0);
	player.giveWeapon(0x678B81B1, 0);
});
mp.events.addCommand("waffen", (player, full, x, y, z) => {
	player.giveWeapon(0x47757124, 50);
	player.giveWeapon(0xFDBC8A50, 50);
	player.giveWeapon(0xA0973D5E, 50);
	player.giveWeapon(0x497FACC3, 50);
	player.giveWeapon(0x3656C8C1, 0);
	player.giveWeapon(0xAF3696A1, 0);
	player.giveWeapon(0x99AEEB3B, 10000);
	player.giveWeapon(0x22D8FE39, 10000);
	player.giveWeapon(0x78A97CD0, 10000);
	player.giveWeapon(0x42BF8A85, 10000);
	player.giveWeapon(0x83BF0278, 10000);
	player.giveWeapon(0x8BB05FD7, 0);
	player.giveWeapon(0x678B81B1, 0);
});
  
  mp.events.addCommand("leben", (player, full, x, y, z) => {	                  // Wiederbelebung 
		mp.players.forEach((player) => {
			var dead = player.getVariable("isDead");
			if (dead == "true") {
				player.spawn(player.position);
				player.health = 100;  
				clearTimeout(player.respawnTimer);
				player.respawnTimer = null;
				clearTimeout(player.spawnTimer);
				player.spawnTimer = null;
				player.call("closeDeathscreen");
				player.call("progress:end");
				player.setVariable("isDead", false);
				mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat revive verwendet."); 
				gm.mysql.handle.query("UPDATE characters SET dead = '0', health = '100' WHERE id = ?",[player.data.charId],function(err,res) {
					if (err) console.log(err);
				});
			}			
		});
  });
  mp.events.addCommand('waffe', (player, fullText, weapon, ammo) => {              // Waffe Spawn
		var weaponHash = mp.joaat(weapon);
        player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
});
mp.events.addCommand('pos', (player, fullText) => {                            // Position bestimmen 
	player.outputChatBox(""+player.position);
	mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat pos verwendet."); 
});

mp.events.addCommand("atm",(player) => {
	gm.mysql.handle.query("INSERT INTO atms SET posX = ?, posY = ?, posZ = ?",[player.position.x,player.position.y,player.position.z], function(err,res) {
		if (err) console.log("Error in Create ATM: "+err);
		mp.blips.new(108, new mp.Vector3(player.position.x,player.position.y,player.position.z),
		{
			name: "ATM",
			color: 25,
			scale: 1,
			shortRange: true,
		});
	});
});
mp.events.addCommand("addcloth",(player) => {
	gm.mysql.handle.query("INSERT INTO savedclothes SET posX = ?, posY = ?, posZ = ?, posR = ?",[player.position.x,player.position.y,player.position.z,player.heading], function(err,res) {
		if (err) console.log("Error in Create ATM: "+err);
	});
});

mp.events.addCommand("blip",(player, full, p1,p2,p3, p4) => {
	gm.mysql.handle.query("INSERT INTO blips SET posX = ?, posY = ?, name = ?, color = ?, blipid = ?, scale = ?",[player.position.x,player.position.y, p1, p2, p3, p4], function(err,res) {
		if (err) console.log("Error in Create ATM: "+err);
		mp.blips.new(p3, new mp.Vector3(player.position.x,player.position.y,player.position.z),
		{
			name: ""+p1,
			color: p2,
			scale: p4,
			shortRange: true,
		});
	});
});
mp.events.addCommand("wetter",(player, full) => {                               // Wetter Änderung
	mp.players.forEach((player) => {
		if (mp.players.exists(player)) {
			var newWeather = full;
			gm.weather.currentWeather = newWeather;
			mp.players.call("client:world:weatherUpdate", [newWeather]);
		}        
    });
});


mp.events.addCommand("msgserver", (player, fullText) => {                        // Nachricht Server
		 mp.players.forEach(
		 (player, id) => {
			player.call("ShowShardMessage", ["~r~Serverbenachrichtigung", fullText]);
		}
	);
});
mp.events.addCommand("msg", (player, fullText, p1) => {                   // Nachricht Spieler   MIT ID
    mp.players.forEach(
        (player, id) => {
            var message = fullText.replace(p1+" ", "");
            if(player.id == p1) {
                player.call("ShowShardMessage", ["~r~Adminbenachrichtigung", message]);
            }       
       }
    );
});

mp.events.addCommand("car",(player, full, p1, p2, p3) => {
	gm.mysql.handle.query("INSERT INTO carshops SET posX = ?, posY = ?, posZ = ?, posR = ?, ped = ?, type = ?, name = ?",[player.position.x,player.position.y,player.position.z, player.heading, p1, p2, p3], function(err,res) {
		if (err) console.log("Error in Create ATM: "+err);
	});
});
