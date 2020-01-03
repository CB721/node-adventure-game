const inquirer = require('inquirer');
const fs = require('fs');


const characters = require('./Characters/characters.json');
const normalStages = require('./stages/normal');
const bossStages = require('./stages/boss');
const finalBossStage = require('./stages/finalBoss');
const enemies = require('./Characters/enemies.json');

// welcome message
console.log("Welcome to the game!");
let username = "";
let curStage = 1;
let health = 99;
let weapons = {};
let character = {};
let lives = 3;

// check for saved file
fs.readFile("data.json", "utf8", function (err, data) {
    if (err) {
        // create a user
        controller.userSetup();
    } else {
        // ask user if they want to continue or create a new game file
        controller.continueGame(data);
    }
});

const controller = {
    continueGame: function (data) {
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "continue",
                    message: "Would you like to continue from where you left off?"
                }
            ])
            .then(res => {
                if (res.continue) {
                    // continue from last save point
                    this.continueFromSave(JSON.parse(data));
                } else {
                    console.log("This will erase any existing saved information...");
                    inquirer
                        .prompt([
                            {
                                type: "confirm",
                                name: "restart",
                                message: "Would you like to delete and restart the game?"
                            }
                        ])
                        
                        .then(res => {
                            if (res.restart) {
                                this.userSetup();
                            } else {
                                this.continueFromSave(JSON.parse(data));
                            }
                        })
                }
            })
    },

    continueFromSave: function (data) {
        username = data.username;
        character = data.character;
        curStage = data.curStage;
        health = data.health;
        weapons = data.weapons;
        lives = data.lives;
        console.log("Data loaded successfully");
        this.stageSelection();
    },

    userSetup: function () {
        // ask user to create a username
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "username",
                    message: "Please create a username"
                }
            ])
            .then(res => {
                if (res.username !== "" || res.username.match(/^[a-zA-Z]+$/)) {
                    // set user details to global variables
                    username = res.username;
                    this.gameInstructions();
                } else {
                    console.log("Please enter a valid username to continue...");
                    this.userSetup();
                }
            })
    },

    // display game instructions
    gameInstructions: function () {
        // each stage will contain one or many enemies to defeat
        console.log("Each stage will contain one or many enemies to defeat");
        setTimeout(() => {
            console.log("In order to pass the stage, you must clear all enemies");
        }, 1000);
        setTimeout(() => {
            console.log("Each stage will have instructions special to that stage");
        }, 2000);
        setTimeout(() => {
            console.log("As you progress, you will be awarded new weapons and healing points");
        }, 3000);
        setTimeout(() => {
            console.log("You can save your progress at the end of each stage");
        }, 4000);
        setTimeout(() => {
            console.log("You start off with 3 lives");
        }, 4500);
        setTimeout(() => {
            this.charSelect();
        }, 5000);
    },

    // character choice
    charSelect: function () {
        inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "char",
                    message: "Which character would you like to use?",
                    choices: characters
                }
            ])
            .then(res => {
                character = characters.filter(character => character.name === res.char[0]);
                weapons = {

                }
                this.createProfile();
            });
    },

    createProfile: function () {
        const userInfo = {
            username,
            character,
            health,
            weapons,
            curStage,
            lives
        }
        const thisIsThis = this;
        fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("Saved");
                thisIsThis.stageSelection();
            }
        });
    },

    // based on current stage, reference particular stage
    stageSelection: function () {
        console.log("You have " + lives + " lives remaining...");
        console.log("You have " + health + "hp remaining...");
        // select enemies based on stage
        const stageEnemies = [];
        for (let i = 0; i < curStage; i++) {
            const randomNum = Math.floor(Math.random() * 3);
            stageEnemies.push(enemies[randomNum]);
        }
        if (curStage > 0 && curStage < 5) {
            normalStages.begin(curStage, character[0] || character, username, stageEnemies, health, weapons, lives);
        }
        if (curStage > 5 && curStage < 10) {
            normalStages.begin(curStage, character[0] || character, username, stageEnemies, health, weapons, lives);
        }
        if (curStage > 10 && curStage < 15) {
            normalStages.begin(curStage, character[0] || character, username, stageEnemies, health, weapons, lives);
        }
        if (curStage === 5 || curStage === 10 || curStage === 15) {
            bossStages.boss(curStage, character[0] || character, username, health, weapons, lives);
        }
        if (curStage === 16) {

        }
        // once game is completed, display congratulations message
        if (curStage === 17) {
            console.log("Congratulations on completing the game!");
        }
    },
    freePlay: function() {
        
    }
}
