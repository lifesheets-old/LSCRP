let duty = mp.colshapes.newSphere(910.2910766601562, -153.45123291015625, 74.16829681396484, 2, 0);
let pc = mp.colshapes.newSphere(907.0165405273438, -151.2628173828125, 74.16830444335938, 3, 0); 
let chief = mp.colshapes.newSphere(894.5706176757812, -167.40098571777344, 74.66964721679688, 3, 0);

mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (player.data.faction == "Taxi") {
            if(pc.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:taxi:createOfficeComputer",[player.data.factionrang]);  
                player.data.mainmenu = true;
            } 
			if(chief.isPointWithin(player.position) && player.data.mainmenu == false && player.data.factionrang > 1) {
                player.call("client:taxi:createChiefMenu",[player.data.factionrang]);
                player.data.mainmenu = true;
            }
             if(duty.isPointWithin(player.position) && player.data.mainmenu == false) {
            mp.events.call("server:faction:duty", player);
            }         
        }         
    }
  });



mp.events.add("server:taxi:mainMenu", (player,slot,name) => {
    getNearestPlayer(player, 2);   
    if (name == "Mitarbeiterverwaltung")
    {
        player.call("client:taxi:openMemberMenu");
    } 
});
mp.events.add("server:taxi:entlassen", (player,itemText) => {
    getNearestPlayer(player, 2);   
    if(currentTarget !== null) {    
        if (currentTarget.data.faction == "taxi") {
            currentTarget.notifyWithPicture("taxi", "Entlassung", "Deine Anstellung wurde beendet","CHAR_CALL911");
        currentTarget.call("client:taxi:delmarkers");
        player.notifyWithPicture("taxi", "Mitarbeiterverwaltung","Du hast "+currentTarget.data.firstname + " "+ currentTarget.data.lastname + " entlassen.","CHAR_CALL911");
        currentTarget.data.faction = "Civillian";
        currentTarget.data.factionDuty = 0;
        currentTarget.data.factionrang = 0;
        gm.mysql.handle.query("UPDATE characters SET faction = ?, duty = ?, factionrang = ?, factioncloth = 'Zivil',firma = '0' WHERE id = ?", [currentTarget.data.faction, currentTarget.data.factionDuty,currentTarget.data.factionrang,currentTarget.data.charId], function(err12, ress12) {
            if(err12) console.log("Error in justiz Dismiss Member");
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
        }  else {
            player.notify("~r~Der Spieler arbeitet nicht bei der taxi!")
        } 
    }   
});

mp.events.add("server:taxi:befördern", (player,rank) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player,2);
        if (currentTarget !== null) {
            if (currentTarget.data.faction == "taxi") {
                gm.mysql.handle.query("UPDATE characters SET factionrang = ? WHERE id = ?", [rank,currentTarget.data.charId], function (err,res) {
                    if (err) console.log("Error in Update Character Factionrank: "+err);
                    player.notify("~g~Die Person wurde auf "+rank+" gesetzt");
                    currentTarget.notify("Du wurdest auf Rang "+rank+" gesetzt");
                    currentTarget.data.factionrang = rank;                    
                });
            } else {
                player.notify("~r~Die Person ist nicht bei taxi");
            }
        } else {
            player.notify("~r~Keiner in deiner Nähe");
        }
    }
});

mp.events.add("server:taxi:mitarbeiter",(player) => {
    gm.mysql.handle.query("SELECT firstname,lastname,factionrang,id FROM characters WHERE faction = 'taxi'",[],function(err,res) {
        if (err) console.log("Error in Select LSC Characters: "+err);
        if (res.length > 0) {
            var LSCList = [];
            var i = 1;
            res.forEach(function(justiz) {
                let obj = { "firstname": String(justiz.firstname), "lastname": String(justiz.lastname),"factionrang": String(justiz.factionrang), "id": String(justiz.id)};
                LSCList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:taxi:Memberlist", [JSON.stringify(LSCList)]);
                }
                i++;
            });
        } else {   
            player.notify("Es gibt keine taxi Mitarbeiter");
        }
     });
});

mp.events.add("server:taxi:mitarbeiterentl",(player,id) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[id],function(err,res) {
        if (err) console.log("Error in Select Kündigen Char: "+err);
        res.forEach(function(justiz) {
            if (justiz.isOnline == 1) {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil',firma = '0' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.id == justiz.onlineId) {                
                                playerToSearch.data.faction = 'Civillian';
                                playerToSearch.data.factionDuty = 0;
                                playerToSearch.data.factionrang = 0;
                                playerToSearch.setProp(0,justiz.hat,justiz.hattext); //Hut
                                playerToSearch.setProp(1,justiz.eye,justiz.eyetext); //Brille
                                playerToSearch.setClothes(1,justiz.mask,justiz.masktext,0); //Masken
                                playerToSearch.setClothes(3,justiz.torso,0,0); //Torso
                                playerToSearch.setClothes(4,justiz.leg,justiz.legtext,0); //Hose
                                playerToSearch.setClothes(6,justiz.shoe,justiz.shoetext,0); //Schuhe
                                playerToSearch.setClothes(11,justiz.jacket,justiz.jackettext,0);//Jacke
                                playerToSearch.setClothes(8,justiz.shirt,justiz.shirttext,0); //Shirt
                                playerToSearch.setClothes(9,justiz.body,justiz.bodytext,0); //Body
                                playerToSearch.call("client:faction:delmarkers");
                            }                      
                        }                        
                    );
                    playerToSearch.data.faction == 'Civillian';
                    playerToSearch.data.factionDuty == 0;
                    playerToSearch.data.factionrang == 0;
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            } else {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil',firma = '0' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            }
        });
    });
});


mp.events.add("server:taxi:einstellen",(player) => {
    getNearestPlayer(player, 2);  
    if (currentTarget !== null) {
        if (currentTarget.data.faction == "Civillian") {
            gm.mysql.handle.query("UPDATE characters SET faction = 'taxi', factionrang = '1',firma = '1' WHERE id = ?",[currentTarget.data.charId], function (err,res) {
                if (err) console.log("Error in Update Faction user: "+err);
                player.notify("~g~Der Bürger wurde eingestellt");
                currentTarget.notify("Sie wurden bei taxi eingestellt!");
                currentTarget.data.faction = "taxi";
                currentTarget.data.factionDuty = 0;
                currentTarget.data.factionrang = 1;
                currentTarget.data.factiondn = 0;
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
      if(trigger === "taxiRechnung") {
        getNearestPlayer(player, 1);      
        if (mp.players.exists(currentTarget)) {
         gm.mysql.handle.query("SELECT amount FROM `bank_konten` WHERE ownerId = ?", [currentTarget.data.charId], function (err, res) {
            if (err) console.log("Error in get Player bank amount at taxi rechnung: "+err);
           gm.mysql.handle.query("SELECT amount FROM `bank_konten` WHERE kontonummer = ?", [9876543210], function (err1, res1) {
              if (err1) console.log("Error in get Player bank amount at staatskonto: "+err1);
              if (res.length > 0) {                
                  if (parseFloat(res[0].amount) >= parseFloat(output)) {
                    if(mp.players.exists(currentTarget)) currentTarget.call("client:taxi:requestrechnung",[player,output,res[0].amount,res1[0].amount]);
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

  mp.events.add("server:taxi:payrechnung", (player, cop,amount,accountamount, staatskonto) => {
    if(mp.players.exists(player) && mp.players.exists(cop)) {
      var newamount = parseFloat(parseFloat(accountamount) - parseFloat(amount));
      var staatamout = parseFloat(parseFloat(amount) + parseFloat(staatskonto));
      player.playAnimation('mp_common', 'givetake2_a', 1, 49);
      setTimeout(_ => {
        if (mp.players.exists(player)) player.stopAnimation();
      }, 2500);
  
      gm.mysql.handle.query("UPDATE `bank_konten` SET amount = ? WHERE ownerId = ?",[newamount,player.data.charId], function(err, res) {
        if (err) {
          console.log("Error in Pay taxi rechnung Query: "+err);
          if(mp.players.exists(cop)) cop.notify("Die Banktransaktion wurde technisch abgebrochen.");
          if(mp.players.exists(player)) player.notify("Die Banktransaktion wurde technisch abgebrochen.");
        } else {
          gm.mysql.handle.query("UPDATE bank_konten SET amount = ? WHERE kontonummer = ?", [staatamout, 9876543210], function(err1, res1) {
            if (err1) console.log("Error in Update Staatskonto: "+err1);

            var bs_timestamp = Math.floor(Date.now() / 1000);
            var bs_description = "taxi rechnung ("+player.data.firstname+" "+player.data.lastname+")";
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
  
  mp.events.add("server:taxi:dontPayrechnung", (player, cop) => {
    if(mp.players.exists(player) && mp.players.exists(cop)) {
      cop.notify("Die Bezahlung wurde durch die Gegenpartei abgelehnt.");
      player.notify("Du hast die Bezahlung abgelehnt.");
      player.playAnimation('mp_common', 'givetake2_a', 1, 49);
      setTimeout(_ => {
        if (mp.players.exists(player)) player.stopAnimation();
      }, 2500);
    }
  });