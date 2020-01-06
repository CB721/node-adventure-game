const game = require('../game/game');
const normal = require('./normal');
const enemies = require('../Characters/enemies.json');
const story = require('../assets/story.json');

module.exports = {
    boss: function(curStage, character, username, health, weapons, lives) {
        const stageStories = story[0][curStage];
        const gameCountdown = 2000 + ((stageStories.length - 1) * 1500);
        for (let i = 0; i < stageStories.length; i++) {
            let delay = 1500 + (i * 1500);
            normal.storyLines(stageStories[i], delay, character.name);
        }
        setTimeout(() => {
            console.log("Boss level " + curStage / 5 + "!");
        }, gameCountdown);
        const stageEnemies = [];
        if (curStage === 5) {
            stageEnemies.push(enemies[4]);
            setTimeout(() => {
                console.log("You are facing the great " + enemies[3].name + "!");
                game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
            }, gameCountdown + 1000);
        }
        if (curStage === 10) {
            stageEnemies.push(enemies[0]);
            stageEnemies.push(enemies[0]);
            stageEnemies.push(enemies[5]);
            setTimeout(() => {
                console.log("You are facing the great " + enemies[4].name + "!");
            }, gameCountdown + 1000);
            setTimeout(() => {
                console.log("...and he brought two goblins with him!");
                game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
            }, gameCountdown + 2000);
        }
        if (curStage === 15) {
            stageEnemies.push(enemies[6]);
            enemies[2].attack = 15;
            stageEnemies.push(enemies[2]);
            setTimeout(() => {
                console.log("You are facing the great " + enemies[5].name + "!");
            }, gameCountdown + 1000);
            setTimeout(() => {
                console.log("...and she brought a super fairy with her!");
                game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
            }, gameCountdown + 2000);
        }
    }
}