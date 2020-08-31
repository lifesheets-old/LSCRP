// Native UI
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

const MenuPoint = new Point(50, 50);



// Einladen
mp.events.add("client:kofferraum:einlagern", (inventory, weight, vehWeight) => {
  res = JSON.parse(inventory);
  const ui_einlagern = new Menu("Einlagern", "("+weight+"/"+vehWeight+")kg", MenuPoint);
    var invParsed = JSON.parse(inventory);
    for(var res in invParsed) {
      var newRes = invParsed[""+res];
      ui_einlagern.AddItem( new UIMenuItem(""+newRes.itemName+" ("+newRes.amount+"x)", ""+newRes.id));
    }
          ui_einlagern.AddItem( new UIMenuItem("Schließen", "kofferraum schließen"));
          ui_einlagern.Visible = true;
          ui_einlagern.ItemSelect.on((item, index, value) => {
      if (item.Text !== "Schließen") {
        mp.events.call("createInputShop", "loadTrunkItem");
        mp.events.callRemote("server:kofferraum:loadItem", item.Description);
        ui_einlagern.Close();
      } else {
        ui_einlagern.Close();
      }
    });
    ui_einlagern.MenuClose.on(() => {
      ui_einlagern.RefreshIndex();
    });
});

// Main Menu
mp.events.add("client:kofferraum:openMenu", (vehicle) => {
  const ui_kofferraum = new Menu("kofferraum", "", MenuPoint);
    ui_kofferraum.AddItem( new UIMenuItem("Gegenstand einladen", ""));
    ui_kofferraum.AddItem( new UIMenuItem("Gegenstand ausladen", ""));
    ui_kofferraum.AddItem( new UIMenuItem("Schließen", ""));
    ui_kofferraum.Visible = true;

    ui_kofferraum.ItemSelect.on((item, index, value) => {
      if (item.Text == "Gegenstand einladen") {
        mp.events.callRemote("server:kofferraum:einladen", vehicle);
        ui_kofferraum.Close();
      } else if (item.Text == "Gegenstand ausladen") {
        mp.events.callRemote("server:kofferraum:ausladen");
        ui_kofferraum.Close();
      } else if (item.Text == "Schließen") {
        ui_kofferraum.Close();
      }
    });
});

// Ausladen
mp.events.add("client:kofferraum:ausladen", (vehinventory, weight, vehWeight) => {
  const ui_ausladen = new Menu("Ausladen", "("+weight+"/"+vehWeight+")kg", MenuPoint);
  var vehinvParsed = JSON.parse(vehinventory);
  for(var res in vehinvParsed) {
    var newRes = vehinvParsed[""+res];
    ui_ausladen.AddItem( new UIMenuItem(""+newRes.itemName+" ("+newRes.amount+"x)", ""+newRes.id));
  }
    ui_ausladen.AddItem( new UIMenuItem("Schließen", "kofferraum schließen"));
    ui_ausladen.Visible = true;
    ui_ausladen.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.call("createInputShop", "unloadTrunkItem");
      mp.events.callRemote("server:kofferraum:unloadItem", item.Description);
      ui_ausladen.Close();
    } else {
      ui_ausladen.Close();
    }
  });
  ui_ausladen.MenuClose.on(() => {
    ui_ausladen.RefreshIndex();
  });
});

