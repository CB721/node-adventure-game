const inquirer = require('inquirer');
const util = require('util');

const attack = require('./attack');
const defend = require('./defend');
const heal = require('./heal');
const lose = require('./lose');
const win = require('./win');


module.exports = {
    turn: function (difficulty, character, stageEnemies, health, isPlayerTurn) {
        if (isPlayerTurn) {
            this.userAction(difficulty, character, stageEnemies, health);
        } else {

        }
    },
    userAction: function (difficulty, character, stageEnemies, health) {
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
                    enemyHealth = attackRes[0]
                    console.log("The " + stageEnemies[0].name + " took " + attackRes[1] + " damage!");
                    console.log("They now have " + enemyHealth + "hp remaining!");
                    this.turn(difficulty, character, stageEnemies, health, false);
                } else {
                    const healRes = heal.heal(health, character.heal);
                    userHealth = healRes;
                    console.log("You health is now at " + userHealth + "hp.");
                    this.turn(difficulty, character, stageEnemies, health, false);
                }
            });
    }
}