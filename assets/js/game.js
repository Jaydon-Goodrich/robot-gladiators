var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

for(var i = 0; i < enemyNames.length; i++){
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}

var fight = function(enemyName) {
    window.alert("Welcome to Robot Gladiators!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? ENTER 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "fight" || promptFight === "FIGHT"){
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        //check enemy health
        if(enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        else{
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        //check player's health
        if(playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }
        else{
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
        //If players choses to skip
    }
    else if (promptFight === "skip" || promptFight === "SKIP"){
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // subtract money from player for skipping
            playerMoney = playerMoney - 2;
        }
        else {
            fight();
        }
        window.alert(playerName + " has chosen to skip the fight!");
    }
    else {
        window.alert("You need to pick a valid option. Try again!");
    }
};

for(i = 0; i < enemyNames.length; i++){
    fight(enemyNames[i]);
}