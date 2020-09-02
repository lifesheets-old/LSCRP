let shop20 = mp.colshapes.newSphere(-42.34,-1092.466,26.422, 2, 0);             //  PDM
let shop21 = mp.colshapes.newSphere(-1012.17, -2682.12, 13.98, 2, 0);           //  Airport - Fahrradhändler
let shop22 = mp.colshapes.newSphere(-742.603,-1325.39,5.00038, 2, 0);           //  Boot Händler
let shop23 = mp.colshapes.newSphere(459.3114929199219, -1007.9383544921875, 28.256071090698242, 4, 0);   //LSPD
let shop24 = mp.colshapes.newSphere(-41.32919692993164, -1674.6556396484375, 29.450660705566406, 4, 0);           //  Schrotthändler
let shop25 = mp.colshapes.newSphere(289.165, -1161.49, 29.272, 4, 0);
let shop26 = mp.colshapes.newSphere(1817.42919921875, 3670.44921875, 34.27687072753906, 2, 0);  //Medic
let shop27 = mp.colshapes.newSphere(899.62060546875, -171.4994354248047, 74.07556915283203, 4, 0);  //Taxi
let shop28 = mp.colshapes.newSphere(-1186.09033203125, -1724.182861328125, 4.38937520980835, 2, 0);  //Exotic cars

mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {

     if(shop20.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "PDM") {
        mp.events.call("server:carshop:openShop",player,20,"PDM");	   
        player.data.mainmenu = true;
    } else if(shop21.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,21,"Fahrräder");  
        player.data.mainmenu = true;
    } else if(shop22.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,22,"CustomCars");  
        player.data.mainmenu = true;
      }  else if(shop23.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "LSPD" && player.data.factionrang > 10) {
        mp.events.call("server:carshop:openShop",player,23,"LSPD");  
        player.data.mainmenu = true;
      }  else if(shop24.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,24,"Schrotthändler");  
        player.data.mainmenu = true;
      }  else if(shop25.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Bike") {
        mp.events.call("server:carshop:openShop",player,25,"BikeShop");  
        player.data.mainmenu = true;
      }  else if(shop26.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Medic" && player.data.factionrang > 10) {
        mp.events.call("server:carshop:openShop",player,26,"Medic");  
        player.data.mainmenu = true;
      }  else if(shop27.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Taxi" && player.data.factionrang > 1) {
        mp.events.call("server:carshop:openShop",player,27,"Taxi");  
        player.data.mainmenu = true;
      }  else if(shop28.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Exotic cars" ) {
        mp.events.call("server:carshop:openShop",player,28,"Exotic cars");  
        player.data.mainmenu = true;
    }
           
  }
});