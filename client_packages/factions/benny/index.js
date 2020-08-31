const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;
let selectedNumPlate = null;
player = mp.players.local;
const MenuPoint = new Point(50, 50);
let clothesACLS = null;
let mainMenuACLS = null;
let memberMenuACLS = null;

// Main Menu
mp.events.add("client:bennys:openMainMenu", (factionrang) => {
  mainMenuACLS = new Menu("Bennys","",MenuPoint);
  mainMenuACLS.AddItem(new UIMenuItem("Rechnung ausstellen",""));
  mainMenuACLS.AddItem(new UIMenuItem("Dispatches","Liste aller aktiven Dispatches"));
  mainMenuACLS.AddItem(new UIMenuItem("Fahrzeug reparieren","Fahrzeug reparieren"));
    if(factionrang > 1){
      mainMenuACLS.AddItem(new UIMenuItem("Mitarbeiterverwaltung",""));
    }
    if(mainMenuACLS.Visible == false && memberMenuACLS.Visible == false)
    {
    mainMenuACLS.Open();
    }
    mainMenuACLS.ItemSelect.on((item, index) => {
      const nextMenu = index;    
      if (item.Text !== "Rechnung ausstellen") {
        mp.events.callRemote("server:bennys:mainMenu",item.Text);
        mainMenuACLS.Close();
      } else {
        mp.events.call("createInputShop", "Rechnung");
        mainMenuACLS.Close();
      }          
    });
    mainMenuACLS.MenuClose.on(() => {
      mp.events.callRemote("server:playermenu:variable");
    });    
});
//Leitstelle
mp.events.add("client:bennys:createOfficeComputer", (factionrang) => {
  const officeComputer = new Menu("Bennys","Computer",MenuPoint);
 officeComputer.AddItem(new UIMenuItem("Leitstelle","Leitstelle übernehmen/abgeben Nummer: 959"));
 if (factionrang > 1) {
  officeComputer.AddItem(new UIMenuItem("Mitarbeiter","Mitarbeiter vom Bennys"));
 } 
 officeComputer.Visible = true; 

 officeComputer.ItemSelect.on((item, index) => {
   if (item.Text == "Leitstelle") {
     mp.events.callRemote("server:phone:getLeitstelle",959); 
     officeComputer.Close();      
   } else if (item.Text == "Mitarbeiter") {
     mp.events.callRemote("server:bennys:mitarbeiter");
     officeComputer.Close();
   } 
 });
 officeComputer.MenuClose.on(() => {
  mp.events.callRemote("server:playermenu:variable");
});
 
});
mp.events.add("client:bennys:openofficeComputer", () => {
  if(activeMemberMenu == null && officeComputer.Visible == false)
  officeComputer.Open();
});


//MemberMenu
mp.events.add("client:bennys:openMemberMenu", () => {
  memberMenuACLS = new Menu("Bennys","Mitarbeiterverwaltung",MenuPoint);
  memberMenuACLS.AddItem(new UIMenuItem("Einstellen","Person einstellen"));
  memberMenuACLS.AddItem( new UIMenuListItem("Befördern","Befördere dein gegenüber", ACLSRanks =new ItemsCollection(["1", "2"])));
  memberMenuACLS.AddItem(new UIMenuItem("Entlassen","Person entlassen"));
  memberMenuACLS.Open();
  memberMenuACLS.ItemSelect.on((item, index) => {  
     if (item.Text == "Einstellen") {
      mp.events.callRemote("server:bennys:einstellen");
      memberMenuACLS.Close();
     }  
     if (item.Text == "Befördern") {
      mp.events.callRemote("server:bennys:befördern",item.SelectedItem.DisplayText);
      memberMenuACLS.Close();
     }
     if (item.Text == "Entlassen") {
      mp.events.callRemote("server:bennys:entlassen");
      memberMenuACLS.Close();
     }
  });
});
mp.events.add("client:bennys:closeMemberMenu", () => {
memberMenuACLS.Close();
});

//MemberMenü Ende
//Cothes Menu
clothesACLS = new Menu("Bennys", "Umkleide", MenuPoint);
clothesACLS.AddItem(new UIMenuItem("Azubi-Klamotten","Die Azubi-Klamotten"));
clothesACLS.AddItem(new UIMenuItem("Arbeits-Klamotten","Die Arbeits-Klamotten"));
clothesACLS.AddItem(new UIMenuItem("Zivil","Deine Zivilkleidung"));
clothesACLS.Visible = false;

mp.events.add("client:bennys:clothes", () => {
  clothesACLS.Visible = true;
});

clothesACLS.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:bennys:clothes",item.Text);
});
clothesACLS.MenuClose.on(() => {
  mp.events.callRemote("server:playermenu:variable");
});

//Cothes Menu

//Cothes Menu


// MAIN MENU anzeigen
function drawDipatch(disJSON){
  // Menu für Fahrzeugliste anlegen
  ui_Dispatchv = new Menu("Dispatches", "Liste aller Dispatches", MenuPoint);
  ui_Dispatchv.Visible = true;
  if (disJSON != "none"){
    disList = JSON.parse(disJSON);
    disList.forEach(dispatch => {
        let newItem = new UIMenuItem("Dispatch-"+dispatch.disid, ""+dispatch.id);
        ui_Dispatchv.AddItem(newItem);
    });
  } else{
    ui_Dispatchv.AddItem( new UIMenuItem("Keine Dispatches vorhanden", ""));
  }

  // Auswertung Menuauswahl ausparken
  ui_Dispatchv.ItemSelect.on((item, index) => {
      mp.events.call("client:bennys:dispatchsub", item.Description);
      ui_Dispatchv.Close();
  });
}
mp.events.add("client:bennys:dispatchvewer", drawDipatch);

mp.events.add("client:bennys:dispatchsub", (position) => {
  const   ui_subdispatch = new Menu("Dipatch", "Wähle eine Aktion", MenuPoint);
  ui_subdispatch.AddItem( new UIMenuItem("Dispatch Makieren", ""+position));
  ui_subdispatch.AddItem( new UIMenuItem("Dispatch löschen", ""+position));
  ui_subdispatch.Visible = true;

  ui_subdispatch.ItemSelect.on((item) => {
      if (item.Text == 'Dispatch Makieren') {
          mp.events.callRemote("server:bennys:mark",item.Description)
          ui_subdispatch.Close();
      } else if (item.Text == 'Dispatch löschen') {
          mp.events.callRemote("server:bennys:deletedispatch",item.Description);
          ui_subdispatch.Close();
      }
  });
});

mp.events.add("client:bennys:markdispatch",(posx, posy) => {
  mp.game.ui.setNewWaypoint(posx, posy);
});





let dismissACLS = null;
mp.events.add("client:bennys:askedForDismiss", () => {
  dismissACLS = new Menu("Bennys","Willst du den Mitarbeiter wirklich entlassen?",MenuPoint);
  dismissACLS.AddItem(new UIMenuItem("Ja","Der Mitarbeiter wird entlassen."));
  dismissACLS.AddItem(new UIMenuItem("Nein","Aktion abbrechen"));
  dismissACLS.Open();

  dismissACLS.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:bennys:dismissMember",item.Text);
  });
});
mp.events.add("client:bennys:closeDismissMenu", () => {
  dismissACLS.Close();
});

function activeACLSMemberList(playerJSON,id){  
  activeMemberMenu = new Menu("Aktive Mitarbeiter", "Liste aller Mitarbeiter im Dienst", MenuPoint);
  activeMemberMenu.Visible = true;
  if (playerJSON != "none") {
    playerJSON = JSON.parse(playerJSON);
    playerJSON.forEach(players => {
        let newItem = new UIMenuItem("" + players.firstname+" "+players.lastname, ""+players.onlineid);
        activeMemberMenu.AddItem(newItem);
        newItem.SetRightLabel("Rang: "+players.factionrang);
    });
  } else {
    activeMemberMenu.AddItem( new UIMenuItem("Keine Mitarbeiter sind im Dienst!", ""));
  }

  activeMemberMenu.ItemSelect.on((item, index) => {
    activeMemberMenu.Close();
    
    
  });
}
mp.events.add("client:acls:activeMemberList", activeACLSMemberList);


mp.events.add("client:bennys:createChiefMenu",() => {
  let main = new Menu("Chief PC", "Chief Computer", MenuPoint);
    main.AddItem(new UIMenuItem("Mitarbeiter",""));   
    main.AddItem( new UIMenuItem("Schließen", ""));
    main.Visible = true;

    main.ItemSelect.on((item, index, value) => {
    if (item.Text == "Mitarbeiter") {
      mp.events.callRemote("server:bennys:mitarbeiter");
      main.Close();
    } else if (item.Text == "Schließen") {
      main.Close();
    }
  });
  main.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});

function drawMenu(charJSON){
  mp.gui.cursor.visible = false;
  // Menu für Fahrzeugliste anlegen
  ui_List = new Menu("Charakter", "Liste aller Charakter", MenuPoint);
  ui_List.Visible = true;
  if (charJSON != "none"){
    charList = JSON.parse(charJSON);
    charList.forEach(char => {
        let newItem = new UIMenuItem(""+char.firstname+" "+char.lastname, ""+char.id);
        ui_List.AddItem(newItem);
        newItem.SetRightLabel("Rang: "+char.factionrang);
    });
  } else{
    ui_List.AddItem(new UIMenuItem("Du besitzt keine Charaktere!", ""));
  }


  ui_List.ItemSelect.on((item, index) => {      
      mp.events.call("client:bennys:memberSub",item.Description);
      ui_List.Close();
  });
}
mp.events.add("client:bennys:Memberlist", drawMenu);

mp.events.add("client:bennys:memberSub",(id) => {
  let memberSub = new Menu("Chief PC", "Chief Computer", MenuPoint);
  memberSub.AddItem(new UIMenuItem("Kündigen",""));   
  memberSub.AddItem( new UIMenuItem("Schließen", ""));
  memberSub.Visible = true;

    memberSub.ItemSelect.on((item, index, value) => {
    if (item.Text == "Kündigen") {
      mp.events.callRemote("server:bennys:mitarbeiter",id);
      memberSub.Close();
    } else if (item.Text == "Schließen") {
      memberSub.Close();
    }
  });
});


mp.events.add("client:bennys:createVeichleMenu", (factionrang) => {
  let vehicles = new Menu("Dienstfahrzeuge", "Die Dienstfahrzeuge", MenuPoint);
    vehicles.AddItem(new UIMenuItem("Kleiner Abschlepper","3852654278"));
    if(factionrang > 2){
    vehicles.AddItem(new UIMenuItem("Schwerer Abschlepper","2971866336"));
    vehicles.AddItem(new UIMenuItem("Werkstattwagen","4278019151"));
    } 
  vehicles.AddItem( new UIMenuItem("Schließen", ""));
  vehicles.Visible = true;

  vehicles.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:bennys:spawnVehicle",item.Description);
      vehicles.Close();
    } else if (item.Text == "Schließen") {
      vehicles.Close();
    }
  });
  vehicles.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});




mp.events.add("client:bennys:vehicleblip", (posX, posY, posZ) => {
  var vehicle = "vehicle_";
  global[vehicle + "_"] = mp.blips.new(56, new mp.Vector3(parseFloat(posX), parseFloat(posY), parseFloat(posZ)),
  {
      name: "Bennys",
      scale: 1.00,
      color: 70,
      alpha: 255,
      drawDistance: 10,
      shortRange: false,
      rotation: 0.00,
      dimension: 0,
  });
});

// Dispatch blips
mp.events.add("client:bennys:showDispatch", (posX, posY, posZ, id) => {
  var dispatchTime = new Date().getTime();
  var policeDispatch = "policeDispatch_";
  mp.game.graphics.notify("Neuer Dispatch eingegangen.");

  global[policeDispatch + mp.players.local.getVariable("ingameName") + "_" + dispatchTime] = mp.blips.new(60, new mp.Vector3(parseFloat(posX), parseFloat(posY), parseFloat(posZ)),
  {
      name: "Notruf Standort: "+id,
      scale: 1.00,
      color: 1,
      alpha: 255,
      drawDistance: 10,
      shortRange: false,
      rotation: 0.00,
      dimension: 0,
  });
  setTimeout(() => {
    global[policeDispatch + mp.players.local.getVariable("ingameName") + "_" + dispatchTime].destroy();
  }, 600000)
});



