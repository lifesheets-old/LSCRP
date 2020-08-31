/*mp.world.trafficLights.locked = true;
mp.world.trafficLights.state = 0;
setLights();

function setLights()
{
    mp.world.trafficLights.state = 39;
    setTimeout(function(){
        mp.world.trafficLights.state = 88;
        setTimeout(function(){
            mp.world.trafficLights.state = 49;
            setTimeout(function(){
                mp.world.trafficLights.state = 88;
                setTimeout(function(){
                    mp.world.trafficLights.state = 39;
                    setTimeout(function(){
                        mp.world.trafficLights.state = 0;
                        setTimeout(function(){
                            setLights();
                        }, 12500); // Grünphase West -> Ost
                    }, 1000);  // Grün werden West -> Ost
                }, 2000); // Gelbphase Nord -> Süd
            }, 7500); // Grünphase Nord -> Süd
        }, 1000); // Grün werden Nord -> Süd
    }, 2000); // Gelbphase West -> Ost
};*/
