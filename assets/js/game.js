var fightOrSkip = function(){
    // Asks users what they would like to do.
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? ENTER 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();
    // conditional null recursive call
    if(promptFight === "" || promptFight === null ){
        window.alert("Please enter a valid input");
        return fightOrSkip();
    }

    if (promptFight === "skip"){
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from player for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            return true;
        }
    }

    return false;
}
var fight = function(enemy) {
    var isPlayerTurn = true;
    if (Math.random() > 0.5){
        isPlayerTurn = false;
    }

    while(enemy.health > 0 && playerInfo.health > 0){
        if(isPlayerTurn){
            if (fightOrSkip()){
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //check enemy health
            if(enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                playerInfo.money = playerInfo.money + 20;

                break;
            }
            else{
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        else{
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //check player's health
            if(playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else{
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
            //If players choses to skip
        }
        isPlayerTurn = !isPlayerTurn;
    }   
};

var startGame = function(){
    // set players stats
    playerInfo.reset();

    for(i = 0; i < enemyInfo.length; i++){
        if(playerInfo.health > 0){
            window.alert("welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1){
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm){
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again?
    endGame();
};

var endGame = function(){
    if(playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else{
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm){
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function(){
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE'.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    //switch statement
    switch(shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max-min + 1)) + min;

    return value;
};

var getPlayerName = function(){
    var name = "";

    while(name === "" || name === null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function(){
        if (this.money >= 7){
            window.alert("Refilling players health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function(){
        if (this.money >= 7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
// Start game on page load
startGame();