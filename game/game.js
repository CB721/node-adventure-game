const inquirer = require('inquirer');
const fs = require('fs');

const attack = require('./attack');
const defend = require('./defend');
const heal = require('./heal');

module.exports = {
    turn: function (character, stageEnemies, health, isPlayerTurn, curStage, weapons, lives, username) {
        let userHealth = health;
        let userBlock = character.block;
        if (health <= 0) {
            console.log("You have been defeated!");
            stageEnemies.length = 0;
            this.save(health, character, weapons, username, curStage, lives, username);
        }
        if (stageEnemies.length < 1) {
            console.log("You have completed this stage");
            this.save(health, character, weapons, username, curStage, lives, username);
        } else {
            let enemyAttack = stageEnemies[0].attack;
            if (isPlayerTurn) {
                console.log("You have " + health + "hp remaining...");
                this.userAction(character, stageEnemies, health, curStage, weapons, lives, username);
            } else {
                console.log("The " + stageEnemies[0].name + " attacks you...");
                const defendRes = defend.defend(userHealth, enemyAttack, userBlock, curStage);
                userHealth = defendRes[0];
                console.log(defendRes[1] + "hp was lost!");
                this.turn(character, stageEnemies, userHealth, true, curStage, weapons, lives, username);
            }
        }
    },
    userAction: function (character, stageEnemies, health, curStage, weapons, lives, username) {
        let enemyHealth = stageEnemies[0].health;
        let enemyBlock = stageEnemies[0].block;
        let userHealth = health;
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "action",
                    message: "Would you like to attack?"
                }
            ])
            .then(res => {
                if (res.action) {
                    const attackRes = attack.attack(character.attack, enemyHealth, enemyBlock, curStage);
                    stageEnemies[0].health = attackRes[0];
                    console.log("The " + stageEnemies[0].name + " took " + attackRes[1] + " damage!");
                    if (attackRes[0] <= 0) {
                        console.log(stageEnemies[0].name + " has been defeated!");
                        stageEnemies.shift();
                    } else {
                        console.log("They now have " + stageEnemies[0].health + "hp remaining!");
                    }
                    this.turn(character, stageEnemies, health, false, curStage, weapons, lives, username);
                } else {
                    const healRes = heal.heal(health, character.heal, curStage);
                    userHealth = healRes;
                    console.log("You health is now at " + userHealth + "hp.");
                    this.turn(character, stageEnemies, userHealth, false, curStage, weapons, lives, username);
                }
            });
    },
    save: function (health, character, weapons, username, curStage, lives, username) {
        let userLives = 3;
        let stage = 0;
        const randomNum = Math.floor(Math.random() * 2);
        if (health <= 0) {
            health = 99;
            if (lives - 1 <= 0) {
                stage = curStage - 1;
                userLives = 3;
                console.log("You have run out of lives!");
                console.log(character.losingPhrases[randomNum]);
                setTimeout(() => {
                    console.log("You have been sent back a level...");
                }, 1000);
                const userInfo = {
                    username,
                    character,
                    health,
                    weapons,
                    curStage: stage,
                    lives: userLives
                }
                fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Saved");
                    console.log("Restart to continue...");
                });
            } else {
                userLives = lives - 1;
                console.log("You have lost a life!");
                console.log("You have " + userLives + " lives remaining...");
                console.log(character.losingPhrases[randomNum]);
                const userInfo = {
                    username,
                    character,
                    health,
                    weapons,
                    curStage,
                    lives: userLives
                }
                fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Saved");
                    console.log("Restart to continue...");
                });
            }
        } else {
            stage = curStage + 1;
            character.attack += (3 + (curStage * 2));
            character.block += (2 + (curStage * 2));
            character.heal += Math.round(1.3 * curStage);
            const healthGained = Math.round(curStage * 1.3)
            const userHealth = health + healthGained;
            const userInfo = {
                username,
                character,
                health: userHealth,
                weapons,
                curStage: stage,
                lives
            }
            function Stats(attack, block, heal) {
                this.attack = attack;
                this.block = block;
                this.heal = heal;
            }
            const levelStats = new Stats(character.attack, character.block, character.heal);
            console.log(character.winningPhrases[randomNum]);
            console.log("You have made it to stage " + stage + "!");
            console.log("The game master has granted you " + healthGained + "hp for passing this stage!");
            console.log("You have " + userHealth + "hp remaining");
            console.log("Game master also boosted your skills!");
            console.table(levelStats);
            fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Saved");
                console.log("Restart to continue...");
            });
        }
    }
}