let pc = mp.colshapes.newSphere(-1387.39013671875, -607.2839965820312, 30.319583892822266, 2, 0);
let equip = mp.colshapes.newSphere(-1391.67529296875, -605.6143798828125, 30.319570541381836, 2, 0);

mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (player.data.faction == "bahama") {
            if(pc.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:bahama:createOfficeComputer",[player.data.factionrang]);
                player.data.mainmenu = true;
            }else if(equip.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:bahama:opendrink",[1]);
                player.data.mainmenu = true;
            
            }  
        }         
    }
  });


mp.events.add("server:bahama:mainMenu", (player,slot,name) => {
    getNearestPlayer(player, 2);   
    if (name == "Mitarbeiterverwaltung")
    {
        player.call("client:bahama:openMemberMenu");
    } 
});
mp.events.add("server:bahama:entlassen", (player,itemText) => {
    getNearestPlayer(player, 2);   
    if(currentTarget !== null) {    
        if (currentTarget.data.faction == "Bahama") {
            currentTarget.notifyWithPicture("bahama", "Entlassung", "Deine Anstellung wurde beendet","CHAR_CALL911");
        currentTarget.call("client:bahama:delmarkers");
        player.notifyWithPicture("bahama", "Mitarbeiterverwaltung","Du hast "+currentTarget.data.firstname + " "+ currentTarget.data.lastname + " entlassen.","CHAR_CALL911");
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
            player.notify("~r~Der Spieler Arbteitet nicht bei der bahama!")
        } 
    }   
});

mp.events.add("server:bahama:befördern", (player,rank) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player,2);
        if (currentTarget !== null) {
            if (currentTarget.data.faction == "Bahama") {
                gm.mysql.handle.query("UPDATE characters SET factionrang = ? WHERE id = ?", [rank,currentTarget.data.charId], function (err,res) {
                    if (err) console.log("Error in Update Character Factionrank: "+err);
                    player.notify("~g~Die Person wurde auf "+rank+" gesetzt");
                    currentTarget.notify("Du wurdest auf Rang "+rank+" gesetzt");
                    currentTarget.data.factionrang = rank;                    
                });
            } else {
                player.notify("~r~Die Person ist nicht bei bahama");
            }
        } else {
            player.notify("~r~Keiner in deiner Nähe");
        }
    }
});

mp.events.add("server:bahama:mitarbeiter",(player) => {
    gm.mysql.handle.query("SELECT firstname,lastname,factionrang,id FROM characters WHERE faction = 'Bahama'",[],function(err,res) {
        if (err) console.log("Error in Select LSC Characters: "+err);
        if (res.length > 0) {
            var LSCList = [];
            var i = 1;
            res.forEach(function(justiz) {
                let obj = { "firstname": String(justiz.firstname), "lastname": String(justiz.lastname),"factionrang": String(justiz.factionrang), "id": String(justiz.id)};
                LSCList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:bahama:Memberlist", [JSON.stringify(LSCList)]);
                }
                i++;
            });
        } else {   
            player.notify("Es gibt keine bahama Mitarbeiter");
        }
     });
});

mp.events.add("server:bahama:mitarbeiterentl",(player,id) => {
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


mp.events.add("server:bahama:einstellen",(player) => {
    getNearestPlayer(player, 2);  
    if (currentTarget !== null) {
        if (currentTarget.data.faction == "Civillian") {
            gm.mysql.handle.query("UPDATE characters SET faction = 'Bahama', factionrang = '1',firma = '1' WHERE id = ?",[currentTarget.data.charId], function (err,res) {
                if (err) console.log("Error in Update Faction user: "+err);
                player.notify("~g~Der Bürger wurde eingestellt");
                currentTarget.notify("Sie wurden bei Bahama eingestellt!");
                currentTarget.data.faction = "Bahama";
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

mp.events.add("server:bahama:drink",(player,weapon) => {
    if (weapon == "alkoholfreies Bier") {
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
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '2'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select drink: "+err);
            if (res.length > 0) {
                var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '2' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                    if (err2) console.log(err2);
                });
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,2,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert drink: "+err1);
                });
            }
        });
    });
    }
});

mp.events.add("server:bahama:drink",(player,weapon) => {
if (weapon == "Schnaps") {
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
    gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '54'",[player.data.charId],function(err,res){
        if (err) console.log("Error in Select drink: "+err);
        if (res.length > 0) {
            var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
            gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '54' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                if (err2) console.log(err2);
            });
        } else {
            gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,54,1)",[player.data.charId], function(err1,res) {
                if (err1) console.log("Error in Insert drink: "+err1);
            });
        }
    });
});
}
});

mp.events.add("server:bahama:drink",(player,weapon) => {
    if (weapon == "Tecula") {
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
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1123'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select drink: "+err);
            if (res.length > 0) {
                var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1123' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                    if (err2) console.log(err2);
                });
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1123,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert drink: "+err1);
                });
            }
        });
    });
    }
    });


    mp.events.add("server:bahama:drink",(player,weapon) => {
        if (weapon == "Tequila") {
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
            gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1122'",[player.data.charId],function(err,res){
                if (err) console.log("Error in Select drink: "+err);
                if (res.length > 0) {
                    var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1122' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                        if (err2) console.log(err2);
                    });
                } else {
                    gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1122,1)",[player.data.charId], function(err1,res) {
                        if (err1) console.log("Error in Insert drink: "+err1);
                    });
                }
            });
        });
        }
        });


        mp.events.add("server:bahama:drink",(player,weapon) => {
            if (weapon == "Vodka") {
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
                gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1101'",[player.data.charId],function(err,res){
                    if (err) console.log("Error in Select drink: "+err);
                    if (res.length > 0) {
                        var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                        gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1101' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                            if (err2) console.log(err2);
                        });
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1101,1)",[player.data.charId], function(err1,res) {
                            if (err1) console.log("Error in Insert drink: "+err1);
                        });
                    }
                });
            });
            }
            });
        
            mp.events.add("server:bahama:drink",(player,weapon) => {
                if (weapon == "Jin") {
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
                    gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1100'",[player.data.charId],function(err,res){
                        if (err) console.log("Error in Select drink: "+err);
                        if (res.length > 0) {
                            var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                            gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1100' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                if (err2) console.log(err2);
                            });
                        } else {
                            gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1100,1)",[player.data.charId], function(err1,res) {
                                if (err1) console.log("Error in Insert drink: "+err1);
                            });
                        }
                    });
                });
                }
                });

                mp.events.add("server:bahama:drink",(player,weapon) => {
                    if (weapon == "Rum") {
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
                        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1099'",[player.data.charId],function(err,res){
                            if (err) console.log("Error in Select drink: "+err);
                            if (res.length > 0) {
                                var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1099' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                    if (err2) console.log(err2);
                                });
                            } else {
                                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1099,1)",[player.data.charId], function(err1,res) {
                                    if (err1) console.log("Error in Insert drink: "+err1);
                                });
                            }
                        });
                    });
                    }
                    });

                    mp.events.add("server:bahama:drink",(player,weapon) => {
                        if (weapon == "Tojioto Whiskey") {
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
                            gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1089'",[player.data.charId],function(err,res){
                                if (err) console.log("Error in Select drink: "+err);
                                if (res.length > 0) {
                                    var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1089' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                        if (err2) console.log(err2);
                                    });
                                } else {
                                    gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1089,1)",[player.data.charId], function(err1,res) {
                                        if (err1) console.log("Error in Insert drink: "+err1);
                                    });
                                }
                            });
                        });
                        }
                        });

                        mp.events.add("server:bahama:drink",(player,weapon) => {
                            if (weapon == "Inland Ice Tea") {
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
                                gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1088'",[player.data.charId],function(err,res){
                                    if (err) console.log("Error in Select drink: "+err);
                                    if (res.length > 0) {
                                        var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                        gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1088' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                            if (err2) console.log(err2);
                                        });
                                    } else {
                                        gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1088,1)",[player.data.charId], function(err1,res) {
                                            if (err1) console.log("Error in Insert drink: "+err1);
                                        });
                                    }
                                });
                            });
                            }
                            });

                            mp.events.add("server:bahama:drink",(player,weapon) => {
                                if (weapon == "Tojioto Whiskey") {
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
                                    gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1089'",[player.data.charId],function(err,res){
                                        if (err) console.log("Error in Select drink: "+err);
                                        if (res.length > 0) {
                                            var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                            gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1089' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                if (err2) console.log(err2);
                                            });
                                        } else {
                                            gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1089,1)",[player.data.charId], function(err1,res) {
                                                if (err1) console.log("Error in Insert drink: "+err1);
                                            });
                                        }
                                    });
                                });
                                }
                                });
        
                                mp.events.add("server:bahama:drink",(player,weapon) => {
                                    if (weapon == "Vodka Bull") {
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
                                        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1084'",[player.data.charId],function(err,res){
                                            if (err) console.log("Error in Select drink: "+err);
                                            if (res.length > 0) {
                                                var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1084' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                    if (err2) console.log(err2);
                                                });
                                            } else {
                                                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1084,1)",[player.data.charId], function(err1,res) {
                                                    if (err1) console.log("Error in Insert drink: "+err1);
                                                });
                                            }
                                        });
                                    });
                                    }
                                    });

                                    mp.events.add("server:bahama:drink",(player,weapon) => {
                                        if (weapon == "Fanta") {
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
                                            gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1082'",[player.data.charId],function(err,res){
                                                if (err) console.log("Error in Select drink: "+err);
                                                if (res.length > 0) {
                                                    var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1082' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                        if (err2) console.log(err2);
                                                    });
                                                } else {
                                                    gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1082,1)",[player.data.charId], function(err1,res) {
                                                        if (err1) console.log("Error in Insert drink: "+err1);
                                                    });
                                                }
                                            });
                                        });
                                        }
                                        });

                                        mp.events.add("server:bahama:drink",(player,weapon) => {
                                            if (weapon == "Spirit") {
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
                                                gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1080'",[player.data.charId],function(err,res){
                                                    if (err) console.log("Error in Select drink: "+err);
                                                    if (res.length > 0) {
                                                        var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                        gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1080' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                            if (err2) console.log(err2);
                                                        });
                                                    } else {
                                                        gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1080,1)",[player.data.charId], function(err1,res) {
                                                            if (err1) console.log("Error in Insert drink: "+err1);
                                                        });
                                                    }
                                                });
                                            });
                                            }
                                            });

                                            mp.events.add("server:bahama:drink",(player,weapon) => {
                                                if (weapon == "Cogla Cola") {
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
                                                    gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1081'",[player.data.charId],function(err,res){
                                                        if (err) console.log("Error in Select drink: "+err);
                                                        if (res.length > 0) {
                                                            var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                            gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1081' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                                if (err2) console.log(err2);
                                                            });
                                                        } else {
                                                            gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1081,1)",[player.data.charId], function(err1,res) {
                                                                if (err1) console.log("Error in Insert drink: "+err1);
                                                            });
                                                        }
                                                    });
                                                });
                                                }
                                                });

                                                mp.events.add("server:bahama:drink",(player,weapon) => {
                                                    if (weapon == "Zombie") {
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
                                                        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1030'",[player.data.charId],function(err,res){
                                                            if (err) console.log("Error in Select drink: "+err);
                                                            if (res.length > 0) {
                                                                var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1030' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                                    if (err2) console.log(err2);
                                                                });
                                                            } else {
                                                                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1030,1)",[player.data.charId], function(err1,res) {
                                                                    if (err1) console.log("Error in Insert drink: "+err1);
                                                                });
                                                            }
                                                        });
                                                    });
                                                    }
                                                    });

                                                    mp.events.add("server:bahama:drink",(player,weapon) => {
                                                        if (weapon == "Long Island") {
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
                                                            gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1029'",[player.data.charId],function(err,res){
                                                                if (err) console.log("Error in Select drink: "+err);
                                                                if (res.length > 0) {
                                                                    var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1029' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                                        if (err2) console.log(err2);
                                                                    });
                                                                } else {
                                                                    gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1029,1)",[player.data.charId], function(err1,res) {
                                                                        if (err1) console.log("Error in Insert drink: "+err1);
                                                                    });
                                                                }
                                                            });
                                                        });
                                                        }
                                                        });

                                                        mp.events.add("server:bahama:drink",(player,weapon) => {
                                                            if (weapon == "Sex in Los Santos") {
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
                                                                gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1028'",[player.data.charId],function(err,res){
                                                                    if (err) console.log("Error in Select drink: "+err);
                                                                    if (res.length > 0) {
                                                                        var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                                        gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1028' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                                            if (err2) console.log(err2);
                                                                        });
                                                                    } else {
                                                                        gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1028,1)",[player.data.charId], function(err1,res) {
                                                                            if (err1) console.log("Error in Insert drink: "+err1);
                                                                        });
                                                                    }
                                                                });
                                                            });
                                                            }
                                                            });

                                                            mp.events.add("server:bahama:drink",(player,weapon) => {
                                                                if (weapon == "Jägermeister") {
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
                                                                    gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '1025'",[player.data.charId],function(err,res){
                                                                        if (err) console.log("Error in Select drink: "+err);
                                                                        if (res.length > 0) {
                                                                            var newAm = parseInt(parseInt(res[0].amount) + parseInt(1));
                                                                            gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE itemId = '1025' AND charId = ?",[newAm,player.data.charId],function(err2,res2){
                                                                                if (err2) console.log(err2);
                                                                            });
                                                                        } else {
                                                                            gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,1025,1)",[player.data.charId], function(err1,res) {
                                                                                if (err1) console.log("Error in Insert drink: "+err1);
                                                                            });
                                                                        }
                                                                    });
                                                                });
                                                                }
                                                                });
                                
                            
                            
                        
                    
                
            
        
                
            
        
    

