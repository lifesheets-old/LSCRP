
var keys = {
  // Laut https://docs.microsoft.com/de-de/windows/desktop/inputdev/virtual-key-codes
  Back: 0x08,
  Enter: 0x0d,
  Left: 0x25,
  Up: 0x26,
  Right: 0x27,
  Down: 0x28,
  End: 0x23,
  ESC: 0x1b,
  0: 0x30,
  1: 0x31,
  2: 0x32,
  3: 0x33,
  4: 0x34,
  5: 0x35,
  6: 0x36,
  7: 0x37,
  8: 0x38,
  9: 0x39,
  A: 0x41,
  B: 0x42,
  C: 0x43,
  D: 0x44,
  E: 0x45,
  F: 0x46,
  G: 0x47,
  H: 0x48,
  I: 0x49,
  J: 0x4a,
  K: 0x4b,
  L: 0x4c,
  M: 0x4d,
  N: 0x4e,
  O: 0x4f,
  P: 0x50,
  Q: 0x51,
  R: 0x52,
  S: 0x53,
  T: 0x54,
  U: 0x55,
  V: 0x56,
  W: 0x57,
  X: 0x58,
  Z: 0x5a,
  Y: 0x59,
  NumPad0: 0x60,
  NumPad1: 0x61,
  NumPad2: 0x62,
  NumPad3: 0x63,
  NumPad4: 0x64,
  NumPad5: 0x65,
  NumPad6: 0x66,
  NumPad7: 0x67,
  NumPad8: 0x68,
  NumPad9: 0x69,
  F1: 0x70,
  F2: 0x71,
  F3: 0x72,
  F4: 0x73,
  F5: 0x74,
  F6: 0x75,
  F7: 0x76,
  F8: 0x77,
  F9: 0x78,
  F10: 0x79,
  F11: 0x7a,
  F12: 0x7b,
  Oem: 220
};

mp.keys.bind(keys.H, true, function () {
  if (!actionKeyConditions()) return;
  if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {
    if (mp.game.invoke(`0xDCE4334788AF94EA`, mp.players.local.vehicle.getModel())) {
      if (mp.players.local.vehicle.getModel() == mp.game.joaat("polmav")) {
        mp.events.callRemote("SearchLight");
      }
    } else {
      mp.events.callRemote("LightTrigger");
    }
  }
});


mp.events.addDataHandler("LIGHT_STATUS", (entity, value) => {
  if (entity.type !== "vehicle") return;
  if (value > 0) {
    entity.setLights(0);
  } else {
    entity.setLights(1);
  }
  if (value == 2) {
    entity.setFullbeam(true);
  } else {
    entity.setFullbeam(false);
  }
});