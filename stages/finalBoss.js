const colors = require('colors');

const game = require('../game/game');
const normal = require('./normal');
const enemies = require('../Characters/enemies.json');
const story = require('../assets/story.json');

module.exports = {
    final: function (character, username, health, weapons, lives, freePlay) {
        console.clear();
        const stageStories = story[0]["16"];
        const gameCountdown = 2500 + ((stageStories.length - 1) * 1500);
        for (let i = 0; i < stageStories.length; i++) {
            let delay = 2000 + (i * 1500);
            normal.storyLines(stageStories[i], delay, character.name);
        }
        const stageEnemies = [];
        stageEnemies.push(enemies[3]);
        stageEnemies.push(enemies[4]);
        stageEnemies.push(enemies[5]);
        stageEnemies.push(enemies[6]);
        setTimeout(() => {
            console.log("Final Boss!".bold);
            console.log("The almighty Finity approaches...".bold.red.bgGray);
            for (let i = 0; i < 3; i++) {
                console.log(colors.bold(stageEnemies[i].name + " is with her!"));
            }
        }, gameCountdown);
        setTimeout(() => {
            console.log("Fight!");
            game.turn(character, stageEnemies, health, true, 16, weapons, lives, username, freePlay);
        }, gameCountdown + 1000);
    }
}