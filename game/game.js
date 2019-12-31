const inquirer = require('inquirer');
const util = require('util');

const attack = require('./attack');
const defend = require('./defend');
const heal = require('./heal');
const lose = require('./lose');
const win = require('./win');


module.exports = {
    turn: function (difficulty, character, stageEnemies, health, isPlayerTurn) {
        // let userAttack = character.attack;
        // let userBlock = character.block;
        // let userHeal = character.heal;
        // let userHealth = health;
        // let enemies = stageEnemies;

        if (isPlayerTurn) {
            this.userAction(difficulty, character, stageEnemies, health);
        } else {

        }
    },
    userAction: function (difficulty, character, stageEnemies, health) {
        let enemyHealth = stageEnemies[0].health;
        let enemyBlock = stageEnemies[0].block;
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
                }
            });
    }
}