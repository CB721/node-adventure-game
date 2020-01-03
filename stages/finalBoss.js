const game = require('../game/game');
const enemies = require('../Characters/enemies.json');

module.exports = {
    final: function (character, username, health, weapons, lives) {
        console.log("Final Boss!");
        const stageEnemies = [];
        stageEnemies.push(enemies[4]);
        stageEnemies.push(enemies[5]);
        stageEnemies.push(enemies[6]);
        stageEnemies.push(enemies[7]);
        console.log("The almighty " + enemies[7].name + " approaches...");
        setTimeout(() => {
            for (let i = 0; i < stageEnemies.length - 2; i++) {
                console.log(stageEnemies[i].name + " is with her!");
            }
        }, 1000);
        setTimeout(() => {
            console.log("Fight!");
            game.turn(character, stageEnemies, health, true, 16, weapons, lives, username);
        }, 2000);
    }
}