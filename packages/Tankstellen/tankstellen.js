let tanke1 = mp.colshapes.newSphere(264,-1260,29, 15, 0);  // Strawberry
let tanke2 = mp.colshapes.newSphere(-71,-1761,30, 15, 0);   // Grove St
let tanke3 = mp.colshapes.newSphere(-272, -956, 145, 15, 0); // - -
let tanke4 = mp.colshapes.newSphere(-2096,-320,13, 15, 0);  // Pazific Bluuffs
let tanke5 = mp.colshapes.newSphere(-2556,2334,33, 15, 0);  // Zancudo
let tanke6 = mp.colshapes.newSphere(180,6603,32, 10, 0);  // Paleto
let tanke7 = mp.colshapes.newSphere(1702,6417,33, 5, 0);  // Senora Fwy
let tanke8 = mp.colshapes.newSphere(2680,3264,55, 5, 0);  // Baumarkt
let tanke9 = mp.colshapes.newSphere(2581,362,108, 15, 0);  // Palomino Fwy
let tanke10 = mp.colshapes.newSphere(1209,-1402,35, 10, 0);  // El Burro
let tanke11 = mp.colshapes.newSphere(818,-1028,26, 10, 0);  // La Mesa
let tanke12 = mp.colshapes.newSphere(-1437,-277,46, 10, 0);  // Morningwood
let tanke13 = mp.colshapes.newSphere(1181, -331, 69, 15, 0);  // Mirror Park
let tanke14 = mp.colshapes.newSphere(622,269,103, 15, 0);  // Vinewood Mitte
let tanke15 = mp.colshapes.newSphere(2005,3775,32, 5, 0);  // Sandy Shores
let tanke16 = mp.colshapes.newSphere(-1799,803,139, 15, 0); // Richmann
let tanke17 = mp.colshapes.newSphere(-723,-934,19, 15, 0); // Little Seoul
let tanke18 = mp.colshapes.newSphere(-272,-956,145, 15, 0); // - - 
let tanke19 = mp.colshapes.newSphere(-796,-1503,0, 15, 0);  // BOOT Tankstelle "La Puerta"
let tanke20 = mp.colshapes.newSphere(3854, 4458, 0, 15, 0); // BOOT Tankstelle "San-Chianski"
let tanke21 = mp.colshapes.newSphere(264,2609,45, 5, 0);  // Harmony
let tanke22 = mp.colshapes.newSphere(1786,3331,41, 5, 0);  // Grand Senora Airfield
let tanke23 = mp.colshapes.newSphere(1209,2661,38, 5, 0);  // Sandy, Route 68
let tanke24 = mp.colshapes.newSphere(-272,-956,145, 15, 0);  //  - -
let tanke25 = mp.colshapes.newSphere(-1152,-2858,13, 14, 0);  //  - -


mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {
    if(tanke1.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,1);   
        player.data.mainmenu = true;
    } else if(tanke2.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,2);   
        player.data.mainmenu = true;
    } else if(tanke3.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,3);  
        player.data.mainmenu = true;
    } else if(tanke4.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,4);  
        player.data.mainmenu = true;
    } else if(tanke5.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,5);   
        player.data.mainmenu = true;
    } else if(tanke6.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,6);   
        player.data.mainmenu = true;
    } else if(tanke7.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,7);  
        player.data.mainmenu = true;
    } else if(tanke8.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,8);   
        player.data.mainmenu = true;
    } else if(tanke9.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,9);   
        player.data.mainmenu = true;
    } else if(tanke10.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,10);   
        player.data.mainmenu = true;
    } else if(tanke11.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,11);   
        player.data.mainmenu = true;
    } else if(tanke12.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,12);  
        player.data.mainmenu = true;
    } else if(tanke13.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,13);  
        player.data.mainmenu = true;
    } else if(tanke14.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,14);
        player.data.mainmenu = true;
    } else if(tanke15.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,15);  
        player.data.mainmenu = true;
    } else if(tanke16.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,16);   
        player.data.mainmenu = true;
    } else if(tanke17.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,17);  
        player.data.mainmenu = true;
    } else if(tanke18.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,18);    
        player.data.mainmenu = true;
    } else if(tanke19.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,19);   
        player.data.mainmenu = true;
    } else if(tanke20.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,20);    
        player.data.mainmenu = true;
    } else if(tanke21.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,21);   
        player.data.mainmenu = true;
    } else if(tanke22.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,22);   
        player.data.mainmenu = true;
    } else if(tanke23.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,23);    
        player.data.mainmenu = true;
    } else if(tanke24.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,24);    
        player.data.mainmenu = true;
    } else if(tanke25.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:tankstellen:openTanke",player,25);    
        player.data.mainmenu = true;
    }     
  }
});