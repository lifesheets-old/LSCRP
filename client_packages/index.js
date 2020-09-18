require("login.js");
require("nativeui");
require("other/keys.js");
require("other/index.js");
require("other/betternotifs");
require("other/camera.js");
require("charchooser")
require("playermenu");
require("CharCreator");
require("vehKeys");
require("other/noclip");
require("VehicleMenu");
require("shortcut");
require("deathscreen/index.js");
require("playerlocation");
require("Inventory");
require("scaleform_messages");
require("factions/markers");
require("factions/lspd");
require("factions/Exotic cars");
require("factions/medic");
require("factions/justiz");
//require("factions/acls");
require("factions/lsc");
require("factions/nitroempire");
require("factions/pdm");
require("factions/bike");
require("factions/tattoobrooks");
require("factions/vanillaunicorn");
require("factions/taxi");
require("factions/benny");
require("factions/Exotic cars");
require("factions/mbt");
require('lscgarage');
require('nitroempiregarage');
require("bennygarage");
require("aclsgarage");
require("lspdgarage");
require("lsmdgarage");
require("Bank");
require("Casino/casino.js");
require("tablet/tablet.js");
require("speedometer/index.js");
require("vehicle/VehicleDamage.js");
require("vehicle/vehiclesync.js")
//require("headshots/index.js");
///////////////////////
//require("ClothesMenu");
//require("soundviewer");
//require("AnimPlayer");
///////////////////////
require('CarTuner');
require('Licenseshop');
require('Passenger');
require('Hud');
require("leben/index.js")
require('clothingshops');
require('Garage');
require('Shop');
require('progress');
require('Housing');
require('Carshop');
require('FingerPoint');
require('Handy');
require('Voice');
require('Dokumente');
require('Doors');
require('Tattoo');
require('Siren');
require('Kofferraum');
require('Barber');
require('Gangsystem');
require('impound');
require('Zulassung');
require('Tankstellen');
require('email');
require('Animations');
require('parachute');
require('tiresmoke');
require('coloredhlights');
require('indicators');
require('burgermeister');
require('blackout');
require('Bart');
require('Makeup');
require('factions/tslafamillia');
require("factions/Bahamas");

mp.game.streaming.removeIpl("rc12b_destroyed");
mp.game.streaming.removeIpl("rc12b_default");
mp.game.streaming.removeIpl("rc12b_hospitalinterior_lod");
mp.game.streaming.removeIpl("rc12b_hospitalinterior");
mp.game.streaming.removeIpl("hei_bi_hw1_13_door");
//Lost Mc
mp.game.streaming.requestIpl("bkr_bi_hw1_13_int"); //Clubhouse 982.0083, -100.8747, 74.84512
//casino
mp.game.streaming.requestIpl("vw_casino_garage"); //Garage small 1295.000, 230.000, -50.000
mp.game.streaming.requestIpl("vw_casino_main"); //Casino 1100.000, 220.000, -50.000
mp.game.streaming.requestIpl("hei_dlc_windows_casino"); // Window fix
mp.game.streaming.requestIpl("vw_casino_penthouse");//Penthouse 976.636, 70.295, 115.164
mp.game.streaming.requestIpl("vw_casino_carpark");// Garage big 1380.000, 200.000, -50.000
//Arcadius Busness Centre
mp.game.streaming.requestIpl("ex_dt1_02_office_03a"); //Ice -141.392, -621.0451, 168.8204
//Maze Bank Building
mp.game.streaming.requestIpl("ex_dt1_11_office_03a"); //Ice -75.56978, -827.1152, 243.3859
//Lom Bank
mp.game.streaming.requestIpl("ex_sm_13_office_03a"); //Ice -1579.677, -565.0689, 108.5229
//Maze Bank West
mp.game.streaming.requestIpl("ex_sm_15_office_03a"); //Ice -1392.563, -480.549, 72.0421


mp.gui.chat.show(false);
mp.nametags.enabled = false;

mp.game.gameplay.setFadeOutAfterDeath(false);
mp.game.audio.setAudioFlag('DisableFlightMusic', false);
mp.gui.chat.show(false);
mp.nametags.enabled = false;

mp.events.add("client:player:joininvincible-state", (player, state) => {
    if (state == true) {
        player.setInvincible(true);
    } else if (state == false) {
        player.setInvincible(false);
    }
});
mp.events.add("client:player:joinfreeze-state", (player, state) => {
    if (state == true) {
        player.freezePosition(true);
    } else if (state == false) {
        player.freezePosition(false);
    }
});
