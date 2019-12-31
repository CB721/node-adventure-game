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
        } else {
            setTimeout(() => {
                console.log("Fight!");
            }, 500);
        }
        setTimeout(() => {
            for (let i = 0; i < stageEnemies.length; i++) {
                console.log("You are facing a " + stageEnemies[i].name + "!");
            }
            this.startMatch(difficulty, character, stageEnemies, health, weapons);
        }, 1000);
    },
    startMatch: function(difficulty, character, stageEnemies, health, weapons) {
        game.turn(difficulty, character, stageEnemies, health, weapons);
    }
}