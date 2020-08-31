let duty = mp.colshapes.newSphere(312.22, -597.37, 43.28, 2, 0);
let clothes = mp.colshapes.newSphere(298.71, -598.82, 43.28, 2, 0);
let equip = mp.colshapes.newSphere(310.10, -567.97, 43.28, 2, 0);
let chief = mp.colshapes.newSphere(334.26, -593.61, 43.27, 2, 0);
let pc = mp.colshapes.newSphere(312.78, -594.49, 43.28, 2, 0);
//let vehicle = mp.colshapes.newSphere(332.60, -593.93, 43.28, 1, 0);              // Funktion wird nur für den Rollstuhl benutzt !
//let parkin = mp.colshapes.newSphere(327.21, -603.88, 43.28, 1, 0);                //       ""
//let heli = mp.colshapes.newSphere(339.275,-589.903,74.1655, 1, 0);                     Deaktiviert

mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (player.data.faction == "Medic") {
            if(pc.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:lsmc:createOfficeComputer",[player.data.factionrang]);
                player.data.mainmenu = true;
            //} else if(vehicle.isPointWithin(player.position) && player.data.mainmenu == false) {
              //  player.call("client:lsmc:createVeichleMenu",[player.data.factionrang]);
                //player.data.mainmenu = true;
            }else if(duty.isPointWithin(player.position) && player.data.mainmenu == false) {
                mp.events.call("server:faction:duty", player);
            }else if(equip.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:lsmc:openWeapon",[1]);
                player.data.mainmenu = true;
            }else if(chief.isPointWithin(player.position) && player.data.mainmenu == false && player.data.factionrang > 10) {
                player.call("client:lsmc:createChiefMenu",[player.data.factionrang]);
                player.data.mainmenu = true;
           //}else if(parkin.isPointWithin(player.position) && player.data.mainmenu == false) {
               // mp.events.call("server:lsmc:parkin",(player));
            }else if(clothes.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:lsmc:clothes");
                player.data.mainmenu = true;
//            } else if(heli.isPointWithin(player.position) && player.data.mainmenu == false) {
  //              player.call("client:lsmc:createHeliMenu");
    //            player.data.mainmenu = true;
            }
        }      
    }
  });



  mp.events.add("server:lsmc:clothes", (player,name) => {
        if (name == "Rettungs-Uniform") {
            gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Rettungs-Uniform' WHERE id = ?", [player.data.charId], function(err3,res3) {
                if (err3) console.log("Error in Update Faction Clothes: "+err3);
                if (player.data.gender == 0) {
                    player.setClothes(3,85,0,2); // Torso
                    player.data.torso = 85;
                    player.setClothes(8,129,0,2); // Shirt
                    player.data.shirt = 129;
                    player.data.shirttext = 0;
                    player.setClothes(11,250,0,2); // Jacke
                    player.data.jacket = 250;
                    player.data.jackettext = 0;
                    player.setClothes(4,96,0,2); // Hose
                    player.data.leg = 96;
                    player.data.legtext = 0;
                    player.setClothes(6,10,0,2); // Schuhe
                    player.data.shoe = 10;
                    player.data.shoetext = 0;   
                    player.setClothes(10,58,0,2); // Decal
                    player.data.decal = 58;
                    player.data.decaltext = 0; 
                    player.setClothes(7,126,0,2); // Zubehör
                    player.data.Zubehör = 126;        
                } else {
                    player.setClothes(3,85,0,2); // Torso
                    player.data.torso = 85;
                    player.setClothes(8,2,0,2); // Shirt
                    player.data.shirt = 2;
                    player.data.shirttext = 0;
                    player.setClothes(11,27,0,2); // Jacke
                    player.data.jacket = 27;
                    player.data.jackettext = 0;
                    player.setClothes(4,23,0,2); // Hose
                    player.data.leg = 23;
                    player.data.legtext = 0;
                    player.setClothes(6,1,0,2); // Schuhe
                    player.data.shoe = 1;
                    player.data.shoetext = 0;
                    player.setClothes(10,66,0,2); // Decal
                    player.data.decal = 66;
                    player.data.decaltext = 0;
                    player.setClothes(7,96,0,2); // Zubehör
                    player.data.Zubehör = 96;        
                }                
            });
        } else {
            if (name == "Zivil") {
                gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Zivil' WHERE id = ?", [player.data.charId], function(err4,res4) {
                    if (err4) console.log("Error in Update Faction Clothes: "+err4);
                    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[player.data.charId], function(err5,res5) {
                        if (err5) console.log("Error in Select Character: "+err5);                        
                        res5.forEach(function(modelData) {
                            player.setProp(0,modelData.hat,modelData.hattext); //Hut
                            player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                            player.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                            player.setClothes(3,modelData.torso,0,0); //Torso
                            player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                            player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                            player.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
                            player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                            player.setClothes(9,modelData.body,modelData.bodytext,0); //Body
                            player.setClothes(10,0,0,2); // Decal
                            player.setClothes(7,0,0,2); // Zubehör
                            player.data.hat = modelData.hat;
                            player.data.hattext = modelData.hattext;
                            player.data.eye = modelData.eye;
                            player.data.eyetext = modelData.eyetext;
                            player.data.mask = modelData.mask;
                            player.data.masktext = modelData.masktext;
                            player.data.torso = modelData.torso;
                            player.data.jacket = modelData.jacket;
                            player.data.jackettext = modelData.jackettext;
                            player.data.leg = modelData.leg;
                            player.data.legtext = modelData.legtext;
                            player.data.shoe = modelData.shoe;
                            player.data.shoetext = modelData.shoetext;
                            player.data.shirt = modelData.shirt;
                            player.data.shirttext = modelData.shirttext;
                            player.data.decal = 0;
                            player.data.decaltext = 0;
                        });                          
                   });                                   
               });                
            }
        }
    }
//mp.events.add("server:lsmc:spawnHeli",(player,type) => {
//    const one = new mp.Vector3(351.40,-587.692,74.16);
//    const onehead = 80;     
 //   if (getVehicleFromPosition(one, 3).length > 0) {    
 //       player.notify("~r~Alle Garagenplätze sind Belegt");    
 //       return;    
 //   } else {
 //       var veh = mp.vehicles.new(parseFloat(type), one, {
 //           heading: onehead,
 //           numberPlate: "LSMC",
 //           locked: true,
  //          engine: false,
  //          dimension: 0
 //       });  
 //       player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
 //       veh.setColorRGB(255,0,0,0,0,0);
 //       veh.setVariable("faction", "Medic");
 //       veh.setVariable("fuel",100);
 //       veh.setVariable("fuelart","Diesel");
//        veh.setVariable("isDead","false");
  //      veh.setVariable("tanken","false");
    //    veh.setVariable('Kilometer',0);
//    }                        
);mp.events.add("server:lsmc:mainMenu", (player,slot,name) => {
    getNearestPlayer(player, 2);   
	if(slot == 0)
	{
        // Dienstausweis zeigen
        if (currentTarget !== null) {
            player.notify("Du hast deinen Dienstausweis gezeigt.");
            player.playAnimation('mp_common', 'givetake2_a', 1, 49);
            gm.mysql.handle.query("SELECT rankname FROM payChecks WHERE factionrang = ? AND faction = ?",[player.data.factionrang,player.data.faction], function(err,res) {
                if (err) console.log(err);
                currentTarget.call("client:dokumente:showmedic",[player.data.firstname,player.data.lastname,res[0].rankname,player.data.factiondn]);
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                }, 2500);
            });            
        } else {
            player.notify("~r~Keiner in deiner Nähe!");
        }        
	}
	else if(slot == 1)
	{
        //Heilen
        getNearestPlayer(player, 2); 
        if (currentTarget !== null) {
            player.playAnimation("amb@medic@standing@kneel@base","base",1,33);
            player.call('progress:start', [30, "Heile Person"]);
            setTimeout(_ => {   
                if (mp.players.exists(player)) {
                    if (mp.players.exists(currentTarget)) {
                        player.stopAnimation();
                        player.notify("~g~Der Patient wurde verarztet.");
                        currentTarget.health = 100;
                        currentTarget.data.health = 100;
                        currentTarget.notify("~g~Du wurdest verarztet.");
                    }
                }       
                
            }, 30000);
        }        

	}
	else if(slot == 2)
	{
        //Wiederbeleben
        getNearestPlayer(player, 2); 
        if (currentTarget !== null) {
            if (mp.players.exists(player)) {
                if (mp.players.exists(currentTarget)) {
                    var permadead = currentTarget.getVariable("permaDead");
                    if (permadead == 0) {
                        player.playAnimation("amb@medic@standing@kneel@base","base",1,33);
                        player.call('progress:start', [60, "Belebe Person wieder"]);
                        setTimeout(_ => {     
                            if (mp.players.exists(player)) {
                                if (mp.players.exists(currentTarget)) {
                                    player.stopAnimation();
                                    if (currentTarget.respawnTimer) clearTimeout(currentTarget.respawnTimer);
                                    if (currentTarget.spawnTimer) clearTimeout(currentTarget.spawnTimer);
                                    currentTarget.health = 100;
                                    currentTarget.data.health = 100;
                                    currentTarget.call("closeDeathscreen");
                                    currentTarget.call('moveSkyCamera', [player, 'down']);
                                    currentTarget.call("progress:end");
                                    currentTarget.setVariable("isDead", false);
                                    currentTarget.respawnTimer = null;
                                    currentTarget.spawnTimer = null;
                                    currentTarget.spawn(currentTarget.position);
                                    player.notify("~g~Die Person wurde wiederbelebt");   
                                    gm.mysql.handle.query("UPDATE characters SET dead = '0' WHERE id = ?", [currentTarget.data.charId], function(err,res) {
                                        if (err) console.log("Error in Update Dead: "+err);
                                    });
                                }                       
                            }             
                        }, 60000);
                    } else {
                        player.notify("~r~Die Person ist Perma Tot");
                    }
                }
            }                    
        } else {
            player.notify("~r~Niemand in der Nähe");
        }
	}
	else if (name == "Mitarbeiterverwaltung")
	{
		player.call("client:lsmc:openMemberMenu");
    }
    else if (name == "Handschuhe anziehen") {
        player.setClothes(3,109,0,0);
    }
    else if (name == "Handschuhe ausziehen") {
        player.setClothes(3,1,0,0);
    }
    else if (name == "Leitstellenblatt") {
        player.call("client:tablet:openmedic");
        player.notify("~b~Tablet wird geöffnet mit ~g~F5~b~ kannst du es schließen");
    }
});
mp.events.add("server:lsmc:memberMenu", (player,slot) => {
    getNearestPlayer(player, 2);    
    if(slot == 0)
    {
        if(currentTarget.data.faction == "Civillian")
        {
           // Person Einstellen     
        }else {
            player.notifyWithPicture("Los Santos Medical Center", "Einstellung", "Hat bereits eine Anstellung!","CHAR_CALL911");
        }
    }
    else if (slot == 1)
    {
        if(currentTarget.data.faction == "Medic")
        {
            //Befördern
        }
    }
    else if(slot == 2)
    {
        if(currentTarget.data.faction == "Medic")
        {
            //Dienstnummer zuweisen
        }
    }
    else if(slot == 3)
    {
        if(currentTarget.data.faction == "Medic")
        {
            //Mitarbeiter entlassen
            player.notify("Ist Member");
            player.call("client:lsmc:closeMemberMenu");
            player.call("client:lsmc:askedForDismiss");
        }
    }
});
mp.events.add("server:lsmc:entlassen", (player,itemText) => {
    getNearestPlayer(player, 2);   
    if(currentTarget !== null) {      
        if (currentTarget.data.faction == "Medic") {
            currentTarget.notifyWithPicture("Los Santos Medical Center", "Entlassung", "Deine Anstellung wurde beendet","CHAR_CALL911");
            currentTarget.call("client:faction:delmarkers");
            player.notifyWithPicture("Los Santos Medical Center", "Mitarbeiterverwaltung","Du hast "+currentTarget.data.firstname + " "+ currentTarget.data.lastname + " entlassen.","CHAR_CALL911");
            currentTarget.data.faction = "Civillian";
            currentTarget.data.factionDuty = 0;
            currentTarget.data.factionrang = 0;
            currentTarget.setVariable("factionDuty",0);
            currentTarget.setVariable("faction","Civillian");
            currentTarget.call("client:TS-VoiceChat:removeFromRadio");	
            gm.mysql.handle.query("UPDATE characters SET faction = ?, duty = ?, factionrang = ?, factioncloth = 'Zivil' WHERE id = ?", [currentTarget.data.faction, currentTarget.data.factionDuty,currentTarget.data.factionrang,currentTarget.data.charId], function(err12, ress12) {
                if(err12) console.log("Error in LSMC Dismiss Member");
            });
            gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[currentTarget.data.charId], function(err5,res5) {
                if (err5) console.log("Error in Select Character: "+err5);
                
                res5.forEach(function(modelData) {
                    currentTarget.setProp(0,modelData.hat,modelData.hattext); //Hut
                    currentTarget.setProp(1,modelData.eye,modelData.eyetext); //Brille
                    currentTarget.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                    currentTarget.setClothes(3,modelData.torso,0,0); //Torso
                    currentTarget.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                    currentTarget.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                    currentTarget.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
                    currentTarget.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                    currentTarget.setClothes(9,modelData.body,modelData.bodytext,0); //Body
                });                          
            });
        }  
    }   
});
mp.events.add("server:lsmc:officeComputer", (player, itemText) => {
    if(itemText == "Aktive Mitarbeiter")
    {
        gm.mysql.handle.query("SELECT firstname,lastname,factionrang,onlineId FROM characters WHERE faction = 'Medic' AND duty = '1'",[],function(err,res) {
            if(err) console.log("Error in Select Active LSMC Members: "+err);
            if (res.length > 0) {
                var PlayerList = [];
                var i = 1;
                res.forEach(function(players) {
                    let obj = { "firstname": String(players.firstname), "lastname": String(players.lastname),"factionrang": String(players.factionrang), "onlineid": String(players.onlineId)};
                    PlayerList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if (mp.players.exists(player)) player.call("client:lsmc:activeMemberList", [JSON.stringify(PlayerList)]);
                    }
                    i++;
                });
            } else {
                //Keine Spieler Online
            }
        });    
    } 
    else if(itemText == "Dispatches")
    {
            player.notify("Dispatches");
    }
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "dienstnummerlsmc") {  
        getNearestPlayer(player, 2);  
          if (currentTarget !== null) {
              if (currentTarget.data.faction == "Medic") {
                gm.mysql.handle.query("SELECT factiondn FROM characters WHERE faction = 'Medic' AND factiondn = ?",[output],function(err,res) {
                    if (err) console.log("Error in Select Dienstnummer: "+err);
                    if (res.length > 0) {
                        player.notify("~r~Die Dienstnummer ist schon vergeben");
                    } else {
                        gm.mysql.handle.query("UPDATE characters SET factiondn = ? WHERE id = ?",[output,currentTarget.data.charId],function(err1,res1) {
                            if (err1) console.log("Error in Update Dienstnummer: "+err1);
                            player.notify("~g~Du hast die Dienstnummer "+output+" gegeben");
                            currentTarget.notify("~g~Du hast die Dienstnummer "+output+" bekommen");
                            currentTarget.data.factiondn = output;
                        });
                    }            
                });
              }  else {
                  player.notify("~r~Die Person ist nicht im Medic");
              }          
          } else {
              player.notify("~r~Keiner in deiner Nähe");
          }          
      }
    }
});

mp.events.add("server:lsmc:befördern", (player,rank) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player,2);
        if (currentTarget !== null) {
            if (currentTarget.data.faction == "Medic") {
                gm.mysql.handle.query("UPDATE characters SET factionrang = ? WHERE id = ?", [rank,currentTarget.data.charId], function (err,res) {
                    if (err) console.log("Error in Update Character Factionrank: "+err);
                    player.notify("~g~Die Person wurde auf "+rank+" gesetzt");
                    currentTarget.notify("Du wurdest auf Rang "+rank+" gesetzt");
                    currentTarget.data.factionrang = rank;                    
                });
            } else {
                player.notify("~r~Die Person ist nicht im LSMC");
            }
        } else {
            player.notify("~r~Keiner in deiner Nähe");
        }
    }
});

mp.events.add("server:lsmc:weapons",(player,weapon) => {
    if (weapon == "Taschenlampe") { 
        gm.mysql.handle.query("UPDATE faction_weapons SET taschenlampe = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x8BB05FD7, 0);
            player.notify("~g~Du hast dir eine Taschenlampe genommen");
        });
    }
    if (weapon == "Fallschirm") { 
        gm.mysql.handle.query("UPDATE faction_weapons SET fallschirm = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0xFBAB5776, 0);
            player.notify("~g~Du hast dir einen Fallschirm genommen");
        });
    }
    if (weapon == "Tabletten") {
        gm.mysql.handle.query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Farm Items: "+err);
            if (res.length > 0) {
            var i = 1;
            var weight = 0.00;
            var inv = {};
            res.forEach(function(item) {
            if (i == res.length) {
                inv[""+item.id] = item;
                weight = parseFloat(parseFloat(weight) + (parseInt(item.amount) * parseFloat(item.itemcount))).toFixed(2);
            } else {
                inv[""+item.id] = item;
                weight = parseFloat(parseFloat(weight) + (parseInt(item.amount) * parseFloat(item.itemcount))).toFixed(2);
            }
            i = parseInt(parseInt(i) + 1);
            });
            player.data.weight = weight;
            } else {
                player.data.weight = 0.00;
            }
    
            if(parseFloat(player.data.weight) >= parseFloat(player.data.inventory)) {
                player.notify("Du kannst nicht soviel tragen!");
                return;
            }            
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '96'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select Weapon: "+err);
            if (res.length > 0) {
                var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '96' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                    if (err2) console.log(err2);
                });
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,96,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert Weapon: "+err1);
                });
            }
        });
    });
    }
});

mp.events.add("server:lsmc:mitarbeiter",(player) => {
    gm.mysql.handle.query("SELECT firstname,lastname,factionrang,id FROM characters WHERE faction = 'Medic'",[],function(err,res) {
        if (err) console.log("Error in Select LSMC Characters: "+err);
        if (res.length > 0) {
            var LSMCList = [];
            var i = 1;
            res.forEach(function(lsmc) {
                let obj = { "firstname": String(lsmc.firstname), "lastname": String(lsmc.lastname),"factionrang": String(lsmc.factionrang), "id": String(lsmc.id)};
                LSMCList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:lsmc:Memberlist", [JSON.stringify(LSMCList)]);
                }
                i++;
            });
        } else {   
            player.notify("Es gibt keine Medic Beamten");
        }
     });
});

mp.events.add("server:lsmc:mitarbeiter",(player,id) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[id],function(err,res) {
        if (err) console.log("Error in Select Kündigen Char: "+err);
        res.forEach(function(lsmc) {
            if (lsmc.isOnline == 1) {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.id == lsmc.onlineId) {                
                                playerToSearch.data.faction = 'Civillian';
                                playerToSearch.data.factionDuty = 0;
                                playerToSearch.data.factionrang = 0;
                                playerToSearch.setVariable("faction","Civillian");
                                playerToSearch.setVariable("factionDuty",0);
                                playerToSearch.setProp(0,lsmc.hat,lsmc.hattext); //Hut
                                playerToSearch.setProp(1,lsmc.eye,lsmc.eyetext); //Brille
                                playerToSearch.setClothes(1,lsmc.mask,lsmc.masktext,0); //Masken
                                playerToSearch.setClothes(3,lsmc.torso,0,0); //Torso
                                playerToSearch.setClothes(4,lsmc.leg,lsmc.legtext,0); //Hose
                                playerToSearch.setClothes(6,lsmc.shoe,lsmc.shoetext,0); //Schuhe
                                playerToSearch.setClothes(11,lsmc.jacket,lsmc.jackettext,0);//Jacke
                                playerToSearch.setClothes(8,lsmc.shirt,lsmc.shirttext,0); //Shirt
                                playerToSearch.setClothes(9,lsmc.body,lsmc.bodytext,0); //Body
                                playerToSearch.call("client:faction:delmarkers");
                                playerToSearch.call("client:TS-VoiceChat:removeFromRadio");	
                            }                      
                        }                        
                    );
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            } else {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            }
        });
    });
});

mp.events.add("server:lsmc:einstellen",(player) => {
    getNearestPlayer(player, 2);  
    if (currentTarget !== null) {
        if (currentTarget.data.faction == "Civillian") {
            gm.mysql.handle.query("UPDATE characters SET faction = 'Medic', factionrang = '1' WHERE id = ?",[currentTarget.data.charId], function (err,res) {
                if (err) console.log("Error in Update Faction user: "+err);
                player.notify("~g~Der Bürger wurde eingestellt");
                currentTarget.notify("Sie wurden beim LSMC eingestellt!");
                currentTarget.data.faction = "Medic";
                currentTarget.data.factionDuty = 0;
                currentTarget.data.factionrang = 1;
                currentTarget.data.factiondn = 0;
                currentTarget.setVariable("faction","Medic");
                gm.mysql.handle.query('SELECT * FROM faction WHERE name = ?', [currentTarget.data.faction], function (error, results, fields) {
                    for(let i = 0; i < results.length; i++) {
                        if(currentTarget.data.faction == results[i].name)
                        {
                        currentTarget.call("LoadFactionDutyMarkers",[results[i].dutyX,results[i].dutyY,results[i].dutyZ]);
                        currentTarget.call("LoadFactionClothesMarkers",[results[i].clothesX,results[i].clothesY,results[i].clothesZ]);
                        currentTarget.call("LoadFactionEquipMarkers", [results[i].equipX,results[i].equipY,results[i].equipZ]);
                        currentTarget.call("LoadFactionPCMarkers", [results[i].pcX,results[i].pcY,results[i].pcZ]);
                        currentTarget.call("LoadFactionChiefMarkers", [results[i].chiefX,results[i].chiefY,results[i].chiefZ]);
                        currentTarget.call("LoadFactionGaragenMarkers",[results[i].vehicleX,results[i].vehicleY,results[i].vehicleZ]);
                        currentTarget.call("LoadFactionParkingMarkers",[results[i].parkX,results[i].parkY,results[i].parkZ]);
                        }		
                    }
                });	            
            });
        } else {    
            player.notify("~r~Der Bürger ist schon in einer Fraktion");
        } 
    } else {
        player.notify("~r~Keiner in deiner Nähe");
    }       
});
/*
mp.events.add("server:lsmc:parkin",(player,x,y,z) => {
    const pos = new mp.Vector3(player.position);
    const veh = getVehicleFromPosition(pos, 2)[0];
    veh.destroy();
  });

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];

    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
   return returnVehicles;
   
}*/
var currentTarget = null;

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if (player != _player) {
                let _dist = _player.dist(player.position);
                if (_dist < dist) {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};


  //rechnung ausstellen
  mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "LSMCRechnung") {
        getNearestPlayer(player, 1);      
        if (mp.players.exists(currentTarget)) {
         gm.mysql.handle.query("SELECT amount FROM `bank_konten` WHERE ownerId = ?", [currentTarget.data.charId], function (err, res) {
            if (err) console.log("Error in get Player bank amount at LSMC rechnung: "+err);
           gm.mysql.handle.query("SELECT amount FROM `bank_konten` WHERE kontonummer = ?", [9876543210], function (err1, res1) {
              if (err1) console.log("Error in get Player bank amount at staatskonto: "+err1);
              if (res.length > 0) {                
                  if (parseFloat(res[0].amount) >= parseFloat(output)) {
                    if(mp.players.exists(currentTarget)) currentTarget.call("client:lsmc:requestrechnung",[player,output,res[0].amount,res1[0].amount]);
                    currentTarget.setVariable("kontoamount",res[0].amount);
                    player.setVariable("staatskonto", res1[0].amount);                    
                    player.playAnimation('mp_common', 'givetake2_a', 1, 49);
                    setTimeout(_ => {
                      if (mp.players.exists(player)) player.stopAnimation();
                    }, 2500);
                  } else {
                    if(mp.players.exists(player)) player.notify("Die Transaktion wurde wegen zu wenig Geld verweigert!");
                  }                
              }
            });
          });
        }
      }
    }
  });

  mp.events.add("server:lsmc:payrechnung", (player, cop,amount,accountamount, staatskonto) => {
    if(mp.players.exists(player) && mp.players.exists(cop)) {
      var newamount = parseFloat(parseFloat(accountamount) - parseFloat(amount));
      var staatamout = parseFloat(parseFloat(amount) + parseFloat(staatskonto));
      player.playAnimation('mp_common', 'givetake2_a', 1, 49);
      setTimeout(_ => {
        if (mp.players.exists(player)) player.stopAnimation();
      }, 2500);
  
      gm.mysql.handle.query("UPDATE `bank_konten` SET amount = ? WHERE ownerId = ?",[newamount,player.data.charId], function(err, res) {
        if (err) {
          console.log("Error in Pay LSMC rechnung Query: "+err);
          if(mp.players.exists(cop)) cop.notify("Die Banktransaktion wurde technisch abgebrochen.");
          if(mp.players.exists(player)) player.notify("Die Banktransaktion wurde technisch abgebrochen.");
        } else {
          gm.mysql.handle.query("UPDATE bank_konten SET amount = ? WHERE kontonummer = ?", [staatamout, 9876543210], function(err1, res1) {
            if (err1) console.log("Error in Update Staatskonto: "+err1);

            var bs_timestamp = Math.floor(Date.now() / 1000);
            var bs_description = "LSMC rechnung ("+player.data.firstname+" "+player.data.lastname+")";
            gm.mysql.handle.query("INSERT INTO bank_statements (toCharId, `date`, category, description, amount) VALUES (?, ?, ?, ?, ?)", [player.data.charId, bs_timestamp, "Kartenzahlung", bs_description, "-"+parseFloat(amount)], function(err11, res11) {
                if (err11) console.log("Error in Insert Bank Statements: "+err11);
            });
          });
          if(mp.players.exists(cop)) cop.notify("Die Rechnung wurde bezahlt.");
          if(mp.players.exists(player)) player.notify("Du hast Die rechnung bezahlt.");
        }
      });
    }
  });
  
  mp.events.add("server:lsmc:dontPayrechnung", (player, cop) => {
    if(mp.players.exists(player) && mp.players.exists(cop)) {
      cop.notify("Die Bezahlung wurde durch die Gegenpartei abgelehnt.");
      player.notify("Du hast die Bezahlung abgelehnt.");
      player.playAnimation('mp_common', 'givetake2_a', 1, 49);
      setTimeout(_ => {
        if (mp.players.exists(player)) player.stopAnimation();
      }, 2500);
    }
  });
