var mysql = require('mysql');
const bcrypt = require('bcryptjs');

module.exports =
{
    handle: null,

    connect: function(call){
        this.handle = mysql.createConnection({
            
            host: "mysql.gameserver.gamed.de",
            user: "s1382509",
            password: "slatiowiar",
            database: "s1382509",
            connectionLimit: 150  
        });

        this.handle.connect(function (err){
            if(err){
                console.log(err);
                switch(err.code){
                    case "ECONNREFUSED":
                        console.log("\x1b[93m[MySQL] \x1b[97mError: Check your connection details (packages/mysql/mysql.js) or make sure your MySQL server is running. \x1b[39m");
                        break;
                    case "ER_BAD_DB_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: The database name you've entered does not exist. \x1b[39m");
                        break;
                    case "ER_ACCESS_DENIED_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: Check your MySQL username and password and make sure they're correct. \x1b[39m");
                        break;
                    case "ENOENT":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: There is no internet connection. Check your connection and try again. \x1b[39m");
                        break;
                    default:
                        console.log("\x1b[91m[MySQL] \x1b[97mError: " + err.code + " \x1b[39m");
                        break;
                }
            } else {
                console.log("\x1b[92m[MySQL] \x1b[97mConnected Successfully \x1b[39m");
            }
        });
    }
};

mp.events.add("sendDataToServer", (player, username, pass, state) => {
    let loggedAccount = mp.players.toArray().find(p => p.loggedInAs == username);    
    if(loggedAccount){
        console.log("Logged in already.");
        player.call("loginHandler", ["logged"]);
    } else {
        gm.mysql.handle.query('SELECT * FROM accounts WHERE username = ?', [username], function(err, res){
            if(res.length > 0){
                let sqlPassword = res[0]["password"];
                bcrypt.compare(pass, sqlPassword, function(err, res2) {
                    if(res2 === true){  //Password is correct
                        if (res[0]["blockLogin"] == 0) {
                            if(res[0]["banned"] == 0){
                                player.name = username;
                                if (state == 1) {
                                    gm.mysql.handle.query('UPDATE accounts SET autoLogin = ? WHERE username = ?', [1,username], function(err, res){
                                    });
                                }
                                    gm.mysql.handle.query('SELECT free FROM serverblock', function(err, res3){
                                        if(res3[0]["free"] == 1){
                                            player.call("loginHandler", ["success"]);
                                            gm.auth.loadAccount(player);
                                        } else {
                                            player.call("loginHandler", ["serverBlocked"]);
                                        }
                                    });
                            } else {
                                player.call("loginHandler", ["bannedFromServer"]);
                            }
                        } else {
                            player.call("loginHandler", ["blockedLogin"]);
                        }                        
                    } else {    //Password is incorrect
                        player.call("loginHandler", ["incorrectPassword"]);
                    }
                });
            } else {
                player.call("loginHandler", ["incorrectUsername"]);
            }
        });
    }
});

mp.events.add("playerJoin", (player) => {
    player.loggedInAs = "";
    player.dimension = 99;  
    player.health = 100;
    player.data.charId = null;    
});

