function cStatUser(heal, armor){
  var $heal = $("#heal");
  var $box = $("#box");
  var $armor = $("#boxArmor");
  $box.css("width", (`${heal}`)+"%"); //Hp of the player.
  $armor.css("width", (`${armor}`)+"%"); //Armor of the player.
};
