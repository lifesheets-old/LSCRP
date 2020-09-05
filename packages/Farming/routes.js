//Weed
let farm1 = mp.colshapes.newSphere(2222, 5577, 53, 7, 0);       //check x
//Koffein
let farm2 = mp.colshapes.newSphere(1011.2716674804688, 3096.193115234375, 41.097694396972656, 30, 0);    // check x 
//Stein
let farm3 = mp.colshapes.newSphere(2953.18, 2787.56, 41.48, 20, 0);    // check x
//Muscheln
let farm4 = mp.colshapes.newSphere(-1474.49, -1500.8, 0.68216, 15, 0);   // check  x
//Huhn
let farm5 = mp.colshapes.newSphere(1449.49, 1066.83, 114, 10, 0);     // check  x
//Holz
let farm6 = mp.colshapes.newSphere(-574.28, 5884.74 ,29.51, 20, 0);   //check  x
//Wolle
let farm8 = mp.colshapes.newSphere(-99.349, 1910.06, 197.042, 20, 0);   //check   x
//Eisen
let farm9 = mp.colshapes.newSphere(315, 2866 ,43.49, 25, 0);    //check x
//frog
let farm10 = mp.colshapes.newSphere(37.7315, 4296.2363, 31.5850, 10, 0);   //  check  x
//�l
let farm11 = mp.colshapes.newSphere(1680, -1849, 108.79, 30, 0);        // check   x
//Gold
let farm12 = mp.colshapes.newSphere(-552.27, 1893.90, 123.06, 15, 0);   //check   x
//Diamant
let farm13 = mp.colshapes.newSphere(-465.72, 2063.12, 120.94, 15, 0);  // check   x
//Weinfarmen
let farm14 = mp.colshapes.newSphere(-1762, 2179, 112.90, 25, 0);       //check  x
//Kokain
let farm15 = mp.colshapes.newSphere(-391.4090576171875, 895.9900512695312, 232.29981994628906, 15, 0);    // check x


mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (farm1.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 1,21); //Weed    
        } else if (farm2.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 2,29); //Koffein   
        } else if (farm3.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 3,31); //Stein    
        } else if (farm4.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 4,51); //Muscheln     
        } else if (farm5.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 5,49); // Chicken   
        } else if (farm6.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 6,45); //Wood         
        } else if (farm8.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 8,43); //Wool       
        } else if (farm9.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 9,35); //Iron     
        } else if (farm10.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 10,94); //frog    
        } else if (farm11.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 11,41); //Oil    
        } else if (farm12.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 12,37); //Gold    
        } else if (farm13.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 13,39); // Diamant  
        } else if (farm14.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 14,55); //Grapes   
        } else if (farm15.isPointWithin(player.position)) {
            mp.events.call("server:farming:farm", player, 15,23); //Kokainplant   
        }
    }
});


//Weed
let process1 = mp.colshapes.newSphere(1245.919677734375, -2573.752685546875, 43.05973815917969, 2, 0);
//Koffein
let process2 = mp.colshapes.newSphere(471.11, 3552.87, 33.23, 2, 0);
//Stein
let process3 = mp.colshapes.newSphere(1639.48, 22.02, 173.77, 2, 0);
//Muscheln
let process4 = mp.colshapes.newSphere(-1085.85, -1256.68, 5.45722, 2, 0);
//Huhn
let process5 = mp.colshapes.newSphere(371.485, 253.186, 103.01, 2, 0);
//Holz
let process6 = mp.colshapes.newSphere(-492.415, 5296, 80.6101, 2, 0);
//Wolle
let process8 = mp.colshapes.newSphere(-1440.3778, -106.4799, 50.7975, 2, 0);
//Eisen
let process9 = mp.colshapes.newSphere(1896.58, 584.71, 178.398, 2, 0);
//lsd
let process10 = mp.colshapes.newSphere(2462.45654296875, 1567.3458251953125, 32.72029113769531, 2, 0);            
//�l
let process11 = mp.colshapes.newSphere(2731.80, 1563.41, 24.5, 2, 0);
//Gold
let process12 = mp.colshapes.newSphere(3584.115, 3658.550, 33.898, 2, 0);
//Diamant
let process13 = mp.colshapes.newSphere(1426, 6337.72, 23.9915, 2, 0);
//Weinfarm
let process14 = mp.colshapes.newSphere(-3152.7, 1110.16, 20.8727, 2, 0);
//Kokain
let process15 = mp.colshapes.newSphere(1920.2064208984375, 3892.75341796875, 32.65724182128906, 2, 0);





mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (process1.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 1,21,22); //Weed to Joint    
        } else if (process2.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 2,29,30); //Koffein to KoffeinTAB   
        } else if (process3.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 3,31,32); //Stone to Marmor       
        } else if (process4.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 4,51,52); //Muscheln zu Muschelseide   
        } else if (process5.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 5,49,50); //Chicken to Meat      
        } else if (process6.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 6,45,46); //Wood to Woodenplank  
        } else if (process8.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 8,43,44); //Wool to Material      
        } else if (process9.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 9,35,36); // Iron to Ironingot     
        } else if (process10.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 10,94,99); //Frosch              
        } else if (process11.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 11,41,42); // Oil to Fuel        
        } else if (process12.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 12,37,38); // Gold to Goldrings     
        } else if (process13.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 13,39,40); // Diamant to Cut Diamant    
        } else if (process14.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 14,55,56); // Grapes to Wine       
        } else if (process15.isPointWithin(player.position)) {
            mp.events.call("server:farming:processing", player, 15,23,24); //Kokainplant to Kokain   
        }
    }
});

//Weed
let sell1 = mp.colshapes.newSphere(-1337.735595703125, -1161.738525390625, 4.509861469268799, 2, 0);
//Koffein
let sell2 = mp.colshapes.newSphere(1433.689208984375, 3665.288330078125, 39.72842025756836, 2, 0);
//Stein
let sell3 = mp.colshapes.newSphere(109.9, -371.34, 42.4712, 1, 0);
//Muscheln
let sell4 = mp.colshapes.newSphere(-601.61, -1115.4, 22.3242, 1, 0);
//Huhn
let sell5 = mp.colshapes.newSphere(378.157, -336.635, 46.665, 1, 0);
//Holz
let sell6 = mp.colshapes.newSphere(101.662, 6368.68, 31.3758, 1, 0);
//Wolle
let sell8 = mp.colshapes.newSphere(-654.509, -414.264, 35.401, 1, 0);
//Eisen
let sell9 = mp.colshapes.newSphere(-116.044, -1025.38, 27.2736, 1, 0);
//lsd
let sell10 = mp.colshapes.newSphere(1006.7158813476562, -2880.853759765625, 43.153038024902344, 3, 0);
//�l
let sell11 = mp.colshapes.newSphere(-2566.56, 2313.37, 33.21, 1, 0);
//Gold
let sell12 = mp.colshapes.newSphere(-641.595, -246.457, 38.1879, 1, 0);
//Diamant
let sell13 = mp.colshapes.newSphere(-332.884, -2792.89, 5.00024, 1, 0);
//Weinfarm
let sell14 = mp.colshapes.newSphere(-1234.62, -140.135, 40.4082, 1, 0);
//Kokain
let sell15 = mp.colshapes.newSphere(775.76, 4180.61, 41.77, 1, 0);


mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (sell1.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 1,22);
        } else if (sell2.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 2,30);
        } else if (sell3.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 3,32);
        } else if (sell4.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 4,52);
        } else if (sell5.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 5,50);
        } else if (sell6.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 6,46);
        } else if (sell8.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 8,44);
        } else if (sell9.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 9,36);
        } else if (sell10.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 10,99);
        } else if (sell11.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 11,42);
        } else if (sell12.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 12,38);
        } else if (sell13.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 13,40);
        } else if (sell14.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 14,56);
        } else if (sell15.isPointWithin(player.position)) {
            mp.events.call("server:farming:selling", player, 15,24);
        }
    }
});