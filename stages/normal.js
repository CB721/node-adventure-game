const colors = require('colors');
const game = require('../game/game');
const stageNames = require('../assets/stageNames.json');
const story = require('../assets/story.json');

module.exports = {
    begin: function (curStage, character, username, stageEnemies, health, weapons, lives, freePlay) {
        if (curStage === 1) {
            console.log("Welcome to your first match " + username + "!");
            setTimeout(() => {
                console.log("You have selected " + character.name + " as your fighter.".green);
            }, 500);
        } else {
            setTimeout(() => {
                console.log("You are fighting as " + character.name + ".".green);
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
        }, 1000);
        const stageStories = story[0][curStage];
        const gameCountdown = 2500 + ((stageStories.length - 1) * 1500);
        for (let i = 0; i < stageStories.length; i++) {
            let delay = 2000 + (i * 1500);
            this.storyLines(stageStories[i], delay, character.name);
        }
        setTimeout(() => {
            console.log(colors.bold.bgCyan("Stage " + curStage + ": " + stageNames[0][curStage]));
        }, gameCountdown)
        setTimeout(() => {
            for (let i = 0; i < stageEnemies.length; i++) {
                console.log("You are facing a " + stageEnemies[i].name + "!".bold);
            }
            game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username, freePlay);
        }, gameCountdown + 1000);
    },
    storyLines: function (line, delay, name) {
        const newLine = line.replace("Hero", name);
        const styleID = line.substring(0, 3);
        switch (styleID) {
            case "***":
                let bg = line.replace("***", "");
                setTimeout(() => {
                    console.log(bg.replace("Hero", name).italic.blue);
                }, delay);
                break;
            case "Her":
                setTimeout(() => {
                    console.log(newLine.green.bold);
                }, delay);
                break;
            case "Fin":
                setTimeout(() => {
                    console.log(newLine.red.bold);
                }, delay);
                break;
            case "Gri":
                setTimeout(() => {
                    console.log(newLine.gray.bold);
                }, delay);
                break;
            case "Cas":
                setTimeout(() => {
                    console.log(newLine.cyan.bold);
                }, delay);
                break;
            case "Tre":
                setTimeout(() => {
                    console.log(newLine.yellow.bold);
                }, delay);
                break;
            case "Hel":
                setTimeout(() => {
                    console.log(newLine.white.bold);
                }, delay);
                break;
            default:
                setTimeout(() => {
                    console.log(newLine.magenta);
                }, delay);
                break;
        }
    }
}