const game = require('../game/game');
const normal = require('./normal');
const enemies = require('../Characters/enemies.json');
const story = require('../assets/story.json');

module.exports = {
    final: function (character, username, health, weapons, lives) {
        const stageStories = story[0]["16"];
        const gameCountdown = 2000 + ((stageStories.length - 1) * 1500);
        for (let i = 0; i < stageStories.length; i++) {
            let delay = 1500 + (i * 1500);
            normal.storyLines(stageStories[i], delay, character.name);
        }
        const stageEnemies = [];
        stageEnemies.push(enemies[3]);
        stageEnemies.push(enemies[4]);
        stageEnemies.push(enemies[5]);
        stageEnemies.push(enemies[6]);
        setTimeout(() => {
            console.log("Final Boss!");
            console.log("The almighty Finity approaches...");
            for (let i = 0; i < 3; i++) {
                console.log(stageEnemies[i].name + " is with her!");
            }
        }, gameCountdown);
        setTimeout(() => {
            console.log("Fight!");
            game.turn(character, stageEnemies, health, true, 16, weapons, lives, username);
        }, gameCountdown + 1000);
    }
}