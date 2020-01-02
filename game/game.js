const inquirer = require('inquirer');
const fs = require('fs');

const attack = require('./attack');
const defend = require('./defend');
const heal = require('./heal');

module.exports = {
    turn: function (difficulty, character, stageEnemies, health, isPlayerTurn, curStage, weapons, lives, username) {
        let userHealth = health;
        let enemyAttack = stageEnemies[0].attack;
        let userBlock = character.block;
        if (health <= 0) {
            console.log("You have been defeated!");
            this.save(health, character, weapons, username, curStage, lives, username);
        }
        if (stageEnemies[0].health <= 0) {
            console.log(stageEnemies[0].name + " has been defeated!");
            stageEnemies.shift();
        }
        if (stageEnemies.length < 1) {
            console.log("You have completed this stage");
            this.save(health, character, weapons, username, curStage, lives, username);
        }
        if (isPlayerTurn) {
            console.log("You have " + health + "hp remaining...");
            this.userAction(difficulty, character, stageEnemies, health, curStage, weapons, lives, username);
        } else {
            console.log("The " + stageEnemies[0].name + " attacks you...");
            const defendRes = defend.defend(userHealth, enemyAttack, userBlock, difficulty);
            userHealth = defendRes[0];
            console.log(defendRes[1] + "hp was lost!");
            this.turn(difficulty, character, stageEnemies, userHealth, true, curStage, weapons, lives, username);
        }
    },
    userAction: function (difficulty, character, stageEnemies, health, curStage, weapons, lives, username) {
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
                    console.log("You attack!");
                    const attackRes = attack.attack(character.attack, enemyHealth, enemyBlock, difficulty);
                    stageEnemies[0].health = attackRes[0];
                    console.log("The " + stageEnemies[0].name + " took " + attackRes[1] + " damage!");
                    console.log("They now have " + stageEnemies[0].health + "hp remaining!");
                    this.turn(difficulty, character, stageEnemies, health, false, curStage, weapons, lives, username);
                } else {
                    const healRes = heal.heal(health, character.heal);
                    userHealth = healRes;
                    console.log("You health is now at " + userHealth + "hp.");
                    this.turn(difficulty, character, stageEnemies, userHealth, false, curStage, weapons, lives, username);
                }
            });
    },
    save: function (health, character, weapons, username, curStage, lives, username) {
        let userLives = 3;
        let stage = 0;
        if (health <= 0) {
            health = 99;
            if (lives - 1 <= 0) {
                stage = curStage - 1;
                userLives = 3;
                console.log("You have run out of lives!");
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
                console.log("You have " + lives + " lives remaining...");
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
            character.attack = character.attack + 20;
            const userInfo = {
                username,
                character,
                health,
                weapons,
                curStage: stage,
                lives
            }
            console.log("You have made it to stage " + stage + "!");
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