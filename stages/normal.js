const game = require('../game/game');

module.exports = {
    begin: function(curStage, character, username, stageEnemies, health, weapons, lives) {
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
            for (let i = 0; i < stageEnemies.length; i++) {
                console.log("You are facing a " + stageEnemies[i].name + "!");
            }
            game.turn(character, stageEnemies, health, true, curStage, weapons, lives, username);
        }, 1000);
    }
}