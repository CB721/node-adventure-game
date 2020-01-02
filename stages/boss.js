const game = require('../game/game');
const enemies = require('../Characters/enemies.json');

module.exports = {
    boss: function(curStage, character, username, health, weapons, lives) {
        console.log("Boss level " + curStage / 5 + "!");
        const stageEnemies = [];
        if (curStage === 5) {
            stageEnemies.push(enemies[4]);
            setTimeout(() => {
                console.log("You are facing the great " + enemies[4].name + "!");
                game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
            }, 1000);
        }
        if (curStage === 10) {
            stageEnemies.push(enemies[0]);
            stageEnemies.push(enemies[0]);
            stageEnemies.push(enemies[5]);
            setTimeout(() => {
                console.log("You are facing the great " + enemies[5].name + "!");
            }, 1000);
            setTimeout(() => {
                console.log("...and he brought two goblins with him!");
                game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
            }, 2000);
        }
        if (curStage === 15) {
            stageEnemies.push(enemies[6]);
            enemies[2].attack = 15;
            stageEnemies.push(enemies[2]);
            setTimeout(() => {
                console.log("You are facing the great " + enemies[6].name + "!");
            }, 1000);
            setTimeout(() => {
                console.log("...and she brought a super fairy with her!");
                game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
            }, 2000);
        }
    }
}