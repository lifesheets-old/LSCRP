let browser;

// Creating browser.
mp.events.add('guiReady', () => {
    if (!browser) {
        // Creating CEF browser.
        browser = mp.browsers.new("package://leben/cef/index.html");
        // Init the life of the player, when the browser is ready.
        mp.events.add('render', () => {
        let player = mp.players.local; 
        browser.execute('cStatUser("' + player.getHealth() + '", "' + player.getArmour() + '")'); //Get the Health and armor of the player.
        
        //if u don't wanna use the gps off just delete this condition.
        if (mp.players.local.vehicle) { //Check if the player is in car or not.
                mp.game.ui.displayRadar(true);
               // mp.game.graphics.notify('Gps ~g~Enabled');
            }
            else {
                mp.game.ui.displayRadar(false);
            }
        });
    }
});
  