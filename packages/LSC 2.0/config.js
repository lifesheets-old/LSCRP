"use strict";

var conf = module.exports;


// FAHRZEUGE
conf.sys_veh = new Array(500);
conf.veh_params = new Array(500);

conf.sys_key = new Array(500);
conf.key_params = new Array(500);

conf.sys_atms = new Array(500);
conf.atms_params = new Array(500);
// FAHRZEUGE

//carSHOP
conf.sys_carshop = new Array(500);
conf.carshop_params = new Array(500);


//Blip
conf.sys_blip = new Array(500);
conf.blip_params = new Array(500);
//Blip
conf.sys_tank = new Array(500);
conf.tank_params = new Array(500);


// FAHRZEUGE
for(let i = 0; i <conf.veh_params.length; i++) {
    conf.veh_params[i] = {};
  }
  for(let i = 0; i <conf.key_params.length; i++) {
    conf.key_params[i] = {};
  }
  // FAHRZEUGE


     // ATM
  for(let i = 0; i <conf.atms_params.length; i++) {
    conf.atms_params[i] = {};
  }
   // ATM

   //CarSHOP
  for(let i = 0; i <conf.carshop_params.length; i++) {
    conf.carshop_params[i] = {};
  }


  //Blip
  for(let i = 0; i <conf.blip_params.length; i++) {
    conf.blip_params[i] = {};
  }

    //Blip
    for(let i = 0; i <conf.tank_params.length; i++) {
      conf.tank_params[i] = {};
    } 