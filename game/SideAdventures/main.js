const inquirer = require('inquirer');
const fs = require('fs');
const colors = require('colors');
const one = require('./one');
const two = require('./two');
const three = require('./three');

module.exports = {
    intro: function (character, curStage, weapons, lives, username, health) {
        console.log("Welcome to Enduf!".rainbow);
        setTimeout(() => {
            console.log("After completing a challenge, you will gain stats or get a new weapon!");
            this.levelSelect(character, curStage, weapons, lives, username, health);
        }, 1000);
    },
    levelSelect: function (character, curStage, weapons, lives, username, health) {
        const choices = ["Speed Demon", "Infinity Battle", "Rock, Paper, Scissors"];
        inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "level",
                    message: "Which game would you like to play?",
                    choices: choices
                }
            ])
            .then(res => {
                switch(res.level[0]) {
                    case "Speed Demon":
                        one.intro(character, curStage, weapons, lives, username, health);
                        break;
                    case "Rock, Paper, Scissors":
                        two.intro(character, curStage, weapons, lives, username, health);
                        break;
                    default:
                        three.intro(character, curStage, weapons, lives, username);
                        break;
                }
            })
            .catch(err => console.log(err));
    }
}