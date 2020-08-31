let shop1 = mp.colshapes.newSphere(-47, -1756, 29, 2, 0);  // "Grove"
let shop2 = mp.colshapes.newSphere(24,-1345,29, 2, 0); // Strawberry
let shop3 = mp.colshapes.newSphere(1728,6416,35, 2, 0);   // rechter Highway Paleto 
let shop4 = mp.colshapes.newSphere(1697,4923,42, 2, 0);  // Grapeseed
let shop5 = mp.colshapes.newSphere(1959,3741,32, 2, 0);  // Sandy Shores
let shop6 = mp.colshapes.newSphere(549,2669,42, 2, 0);  // Harmony
let shop7 = mp.colshapes.newSphere(-3242,999,12.83, 2, 0);  // Chumash
let shop8 = mp.colshapes.newSphere(-3039,584,7, 2, 0);  // Ineseno Road
let shop9 = mp.colshapes.newSphere(372,327,103, 3, 0);  // Vinewood Mitte
let shop10 = mp.colshapes.newSphere(1164.04,-324.14,69, 2, 0);  // Mirror Park"
let shop11 = mp.colshapes.newSphere(1134,-983,46, 2, 0);  // Murrieta Heights          Likör  !
let shop12 = mp.colshapes.newSphere(161,6642,31, 2, 0); // Paleto
let shop13 = mp.colshapes.newSphere(-160,6321,31, 2, 0);  // Paletto  "DLC"             Likör !
let shop14 = mp.colshapes.newSphere(-657,-858, 24,2, 0);   //  Handy SHOP      Handy
let shop15 = mp.colshapes.newSphere(-706,-913,19, 2, 0);  // "Little Seoul"
let shop16 = mp.colshapes.newSphere(-1820,794,138, 2, 0);  // "Richmann"
let shop40 = mp.colshapes.newSphere(-2966,391,15, 2, 0);  //  "Pacifik Bluffs"         Likör   !
let shop41 = mp.colshapes.newSphere(1588,6456,26, 2, 0);  //  Elle's Dinner
let shop42 = mp.colshapes.newSphere(2748,3468,55.68, 2, 0);  //     Baumarkt
let shop43 = mp.colshapes.newSphere(2678, 3280, 55.24, 2, 0);  //    Shop "Baumarkt"
let shop44 = mp.colshapes.newSphere(467, -989, 30, 1, 0);  //   Donut Automat LSPD
let shop45 = mp.colshapes.newSphere(464, -995, 30, 1, 0);  //   Zigaretten Automat LSPD
let shop47 = mp.colshapes.newSphere(1984.36, 3054.67, 47.21,2, 0);  //   Sandy Pißwasser Laden
let shop48 = mp.colshapes.newSphere(1982.29, 3708.31, 32.10,2, 0);  //   Hotdog Sandy
let shop49 = mp.colshapes.newSphere(1166.42, 2711.03, 38.15,2, 0);  //   Sandy
let shop50 = mp.colshapes.newSphere(21.133, -1104.81, 29.79,2, 0);  //   Amunation City Waffen
let shop51 = mp.colshapes.newSphere(18.55, -1109.59, 29.79,2, 0);  //   Amunation City Schutzwesten
let shop54 = mp.colshapes.newSphere(-3174.15, 1087.05, 20.83,2, 0);  //   Amunation Chumash
let shop55 = mp.colshapes.newSphere(-3170.36, 1082.84, 20.83,2, 0);  //   Amunation Chumash Schutzwesten
let shop57 = mp.colshapes.newSphere(305.298, -595.74, 43.28,2, 0);  //   Apotheke im MD
let shop58 = mp.colshapes.newSphere(-331.77, 6084.90, 31.45,2, 0);  //   Amunation Paleto
let shop59 = mp.colshapes.newSphere(-330.48, 6078.39, 31.45,2, 0);  //   Amunation Paleto Schutzwesten
let shop61 = mp.colshapes.newSphere(562.49, 2741.08, 42.82,2, 0);  //   Hundeladen








/*let shopArray = [];
// X, Y, Z, Range, Dimension
shopArray.push(mp.colshapes.newSphere(24.47,-1347.1,29.497, 2, 0), 1);
shopArray.push(mp.colshapes.newSphere(-47.693,-1759,29.42, 2, 0), 3);
shopArray.push(mp.colshapes.newSphere(-709,-915,19, 2, 0), 4);*/

mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {

    // shopArray.forEach((shape, id, index) => {
    //     console.log(`${shopArray[shape]} + ${shopArray[index]}`);
    //     if(shape.isPointWithin(player.position) && player.data.mainmenu == false) {
    //         if(id == 19 && !player.data.faction == "VanillaUnicorn") { continue; }
    //         player.call("client:shop:openShop", index);
    //         player.data.mainmenu = true;
    //         return;
    //     }
    // });



    if(shop1.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[1]);    
        player.data.mainmenu = true;
    } else if(shop2.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[2]);    
        player.data.mainmenu = true;  
    } else if(shop3.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[3]);    
        player.data.mainmenu = true;
    } else if(shop4.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[4]);    
        player.data.mainmenu = true;
    } else if(shop5.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[5]);    
        player.data.mainmenu = true;
    } else if(shop6.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[6]);    
        player.data.mainmenu = true;
    } else if(shop7.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[7]);    
        player.data.mainmenu = true;
    } else if(shop8.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[8]);    
        player.data.mainmenu = true;
    } else if(shop9.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[9]);    
        player.data.mainmenu = true;
    } else if(shop10.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[10]);    
        player.data.mainmenu = true;
    } else if(shop11.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[11]);    
        player.data.mainmenu = true;  
    } else if(shop12.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[12]);    
        player.data.mainmenu = true; 
    } else if(shop13.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[13]);    
        player.data.mainmenu = true; 
    } else if(shop14.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[14]);    
        player.data.mainmenu = true; 
    } else if(shop15.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[15]);    
        player.data.mainmenu = true; 
    } else if(shop16.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[16]);    
        player.data.mainmenu = true; 
    } else if(shop40.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[40]);    
        player.data.mainmenu = true; 
    } else if(shop41.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[41]);    
        player.data.mainmenu = true; 
    } else if(shop42.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[42]);    
        player.data.mainmenu = true; 
    } else if(shop43.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[43]);    
        player.data.mainmenu = true; 
    } else if(shop44.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[44]);    
        player.data.mainmenu = true; 
    } else if(shop45.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[45]);    
        player.data.mainmenu = true; 
    } else if(shop47.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[47]);    
        player.data.mainmenu = true; 
    } else if(shop48.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[48]);    
        player.data.mainmenu = true; 
    } else if(shop49.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[49]);    
        player.data.mainmenu = true; 
    } else if(shop50.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[50]);    
        player.data.mainmenu = true; 
    } else if(shop51.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[51]);    
        player.data.mainmenu = true; 
    } else if(shop54.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[54]);    
        player.data.mainmenu = true; 
    } else if(shop55.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[55]);    
        player.data.mainmenu = true; 
    } else if(shop57.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[57]);    
        player.data.mainmenu = true; 
    } else if(shop58.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[58]);    
        player.data.mainmenu = true; 
    } else if(shop59.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[59]);    
        player.data.mainmenu = true; 
    } else if(shop61.isPointWithin(player.position) && player.data.mainmenu == false) {
        player.call("client:shop:openShop",[61]);    
        player.data.mainmenu = true; 
    }     
  } 
});
