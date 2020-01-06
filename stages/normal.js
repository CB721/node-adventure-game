const game = require('../game/game');
const stageNames = require('../assets/stageNames.json');
const story = require('../assets/story.json');

module.exports = {
    begin: function (curStage, character, username, stageEnemies, health, weapons, lives) {
        if (curStage === 1) {
            console.log("Welcome to your first match " + username + "!");
            setTimeout(() => {
                console.log("You have selected " + character.name + " as your fighter.");
            }, 500);
        } else {
            setTimeout(() => {
                console.log("You are fighting as " + character.name + ".");
                console.log("Fight!");
            }, 500);
        }
        setTimeout(() => {
            function Stats(attack, block, heal) {
                this.attack = attack;
                this.block = block;
                this.heal = heal;
            }
            const levelStats = new Stats(character.attack, character.block, character.heal);
            console.table([levelStats]);
        }, 750)
        setTimeout(() => {
            for (const name in stageNames[0]) {
                if (name == curStage) {
                    console.log("Stage " + name + ": " + stageNames[0][name]);
                }
            }
        }, 1050);
        const stageStories = story[0][curStage];
        const gameCountdown = 2000 + ((stageStories.length - 1) * 1500);
        for (let i = 0; i < stageStories.length; i++) {
            let delay = 1500 + (i * 1500);
            this.storyLines(stageStories[i], delay, character.name);
        }
        setTimeout(() => {
            for (let i = 0; i < stageEnemies.length; i++) {
                console.log("You are facing a " + stageEnemies[i].name + "!");
            }
            game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username, false);
        }, gameCountdown);
    },
    storyLines: function(line, delay, name) {
        const newLine = line.replace("Hero", name);
        setTimeout(() => {
            console.log(newLine);
        }, delay);
    }
}