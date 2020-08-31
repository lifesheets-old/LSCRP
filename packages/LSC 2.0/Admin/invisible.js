function setInvisible(player, state) {
    if (mp.players.exists(player)) {
        if (state == "Unsichtbar") {
            player.alpha = 0;
            mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat sich unsichtbar gemacht!");
        }
        if (state == "Sichtbar") {
            player.alpha = 255;
            mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat sich sichtbar gemacht!");
        }
    }
}
mp.events.add("server:admin:setInvisible", setInvisible);