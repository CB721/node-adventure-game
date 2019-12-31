const game = require('../game/game');

module.exports = {
    begin: function(curStage, character, username, stageEnemies, health, weapons) {
        let difficulty = 1;
        for (let i = 0; i < curStage; i++) {
            difficulty += difficulty * curStage;
        }
        if (curStage === 1) {
            console.log("Welcome to your first match " + username + "!");
            setTimeout(() => {
                console.log("You have selected " + character.name + ".");
            }, 500);
        }
        setTimeout(() => {
            for (let i = 0; i < stageEnemies.length; i++) {
                console.log("You are facing a " + stageEnemies[i].name + "!");
            }
            game.turn(difficulty, character, stageEnemies, health, weapons);
        }, 1000);
    }
}