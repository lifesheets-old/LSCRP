let garage5 = mp.colshapes.newSphere(-966, -2609, 13, 2, 0);  //Flughafen
let garage6 = mp.colshapes.newSphere(213.754, -808.721, 31.01, 2, 0);  // Würfelpark
let garage7 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  // - - 
let garage8 = mp.colshapes.newSphere(-823,-1269, 6, 2, 0); // la Puerta
let garage9 = mp.colshapes.newSphere(-2030, -465, 11, 2, 0); // LKW Del Perro             LKW
let garage10 = mp.colshapes.newSphere(-1721, 67, 67, 2, 0);  // Richmann
let garage11 = mp.colshapes.newSphere(-189, 299, 96, 2, 0);  // Vinewood
let garage12 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  // - -
let garage13 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  // - -
let garage14 = mp.colshapes.newSphere(882, 6, 78, 2, 0);  // Casino
let garage15 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  // - -
let garage16 = mp.colshapes.newSphere(1695, 4785, 42, 2, 0);   // Grapeseed
let garage17 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  //  - 
let garage18 = mp.colshapes.newSphere(67, 6412, 31, 2, 0);   // Paletto          LKW
let garage19 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);   //  - -
let garage20 = mp.colshapes.newSphere(-3057, 115, 12, 2, 0);  // Pacific Bluffs
let garage21 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  //  - - 
let garage22 = mp.colshapes.newSphere(1181,-1533, 39, 2, 0);  // El Burro
let garage23 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  //  - -
let garage24 = mp.colshapes.newSphere(-0,45,94, 2, 0);   // - -
let garage25 = mp.colshapes.newSphere(782, -2988, 6, 2, 0);  // Hafen              LKW
let garage26 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);  //  - -
let garage27 = mp.colshapes.newSphere(-425,1208,326, 2, 0);     // Galileo Park
let garage28 = mp.colshapes.newSphere(901,3655,33, 2, 0);      //   Alamosee
let garage29 = mp.colshapes.newSphere(-0, 45, 94, 2, 0);     //    - -
let garage30 = mp.colshapes.newSphere(2551, 2610, 37.957, 2, 0);    //   DinoDiner  
let garage31 = mp.colshapes.newSphere(-2188, 4267, 48, 2, 0);  // Chumash
let garage32 = mp.colshapes.newSphere(3867,4463,3, 2, 0);    //  Boot Paleto
let garage33 = mp.colshapes.newSphere(221,-975,-99, 2, 0);  //  Garage - Hpusing ? -
let garage34 = mp.colshapes.newSphere(191,-994,-99, 2, 0);   //  Garage - Hpusing ? -
let garage35 = mp.colshapes.newSphere(-40.74,-1081.859,26.61, 2, 0);    //  PDM  **
let garage36 = mp.colshapes.newSphere(-831,-1359,5, 2, 0);      // Boot    
let garage38 = mp.colshapes.newSphere(461.05, -980.39, 43.69, 2, 0);   // LSPD  Heli
let garage39 = mp.colshapes.newSphere(338.26, -587.49, 74.16, 2, 0);   // LSMD  Heli
let garage41 = mp.colshapes.newSphere(-567.38, -182.22, 37.96, 2, 0);   // Stadtverwaltung interne Garage
let garage42 = mp.colshapes.newSphere(897.11, -158.30, 76.89, 2, 0);   //  Taxizentrale
let garage43 = mp.colshapes.newSphere(1830.22, 3668.41, 34.27, 2, 0);   // LSMD  Garage Sandy Shores
let garage44 = mp.colshapes.newSphere(-674.94, 5772.14, 17.33, 2, 0);   // Hotel Paleto
let garage45 = mp.colshapes.newSphere(1098.46, 2657.93, 38.14, 2, 0);   // Hotel Sandy
let garage46 = mp.colshapes.newSphere(-468.43, 273.19, 83.27, 2, 0);   // Hotel City Vinewood
let garage47 = mp.colshapes.newSphere(-1462.99, -500.90, 32.96, 2, 0);   // Hotel City  Bahamas .
let garage48 = mp.colshapes.newSphere(2523.35, -349.02, 94.14, 2, 0);    //  noose 
let garage49 = mp.colshapes.newSphere(1214.765380859375, 2730.206298828125, 38.00538635253906, 5, 0);    //  Bike  




mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {
    if(garage5.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[5]);    
        player.data.mainmenu = true;
    } else if(garage6.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[6]);    
        player.data.mainmenu = true;
    } else if(garage7.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[7]);    
        player.data.mainmenu = true;
    } else if(garage8.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[8]);    
        player.data.mainmenu = true;
    } else if(garage9.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[9]);    
        player.data.mainmenu = true;
    } else if(garage10.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[10]);    
        player.data.mainmenu = true;
    } else if(garage11.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[11]);    
        player.data.mainmenu = true;
    } else if(garage12.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[12]);    
        player.data.mainmenu = true;
    } else if(garage13.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[13]);    
        player.data.mainmenu = true;
    } else if(garage14.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[14]);    
        player.data.mainmenu = true;
    } else if(garage15.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[15]);    
        player.data.mainmenu = true;
    } else if(garage16.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[16]);    
        player.data.mainmenu = true;
    } else if(garage17.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[17]);    
        player.data.mainmenu = true;
    } else if(garage18.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[18]);    
        player.data.mainmenu = true;
    } else if(garage19.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[19]);    
        player.data.mainmenu = true;
    } else if(garage20.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[20]);    
        player.data.mainmenu = true;
    } else if(garage21.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[21]);    
        player.data.mainmenu = true;
    } else if(garage22.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[22]);    
        player.data.mainmenu = true;
    } else if(garage23.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[23]);    
        player.data.mainmenu = true;
    } else if(garage24.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[24]);    
        player.data.mainmenu = true;
    } else if(garage25.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[25]);    
        player.data.mainmenu = true;
    } else if(garage26.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[26]);    
        player.data.mainmenu = true;
    } else if(garage27.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[27]);    
        player.data.mainmenu = true;
    } else if(garage28.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[28]);    
        player.data.mainmenu = true;
    } else if(garage29.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[29]);    
        player.data.mainmenu = true;
    } else if(garage30.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[30]);    
        player.data.mainmenu = true;
    } else if(garage31.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[31]);    
        player.data.mainmenu = true;
    } else if(garage32.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[32]);    
        player.data.mainmenu = true;
    } else if(garage33.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[33]);    
        player.data.mainmenu = true;
    } else if(garage34.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[34]);    
        player.data.mainmenu = true;
    } else if(garage35.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "PDM") {
        player.call("client:garage:openmenu",[35]);    
        player.data.mainmenu = true;
    } else if(garage36.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[36]);    
        player.data.mainmenu = true;
    } else if(garage38.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "LSPD") {
        player.call("client:garage:openmenu",[38]);    
        player.data.mainmenu = true;
    } else if(garage39.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Medic") {
        player.call("client:garage:openmenu",[39]);    
        player.data.mainmenu = true;
    } else if(garage41.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Justiz") {
        player.call("client:garage:openmenu",[41]);    
        player.data.mainmenu = true;
    } else if(garage42.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Taxi") {
        player.call("client:garage:openmenu",[42]);    
        player.data.mainmenu = true;
    } else if(garage43.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Medic") {
        player.call("client:garage:openmenu",[43]);    
        player.data.mainmenu = true;
    } else if(garage44.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[44]);    
        player.data.mainmenu = true;
    } else if(garage45.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[45]);    
        player.data.mainmenu = true;
    } else if(garage46.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[46]);    
    } else if(garage47.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[47]);    
        player.data.mainmenu = true;
    } else if(garage48.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:garage:openmenu",[48]);    
        player.data.mainmenu = true;
    } else if(garage49.isPointWithin(player.position) && player.data.mainmenu == false && player.data.faction == "Bike") {
        player.call("client:garage:openmenu",[49]);    
        player.data.mainmenu = true;
    } 
  }
});