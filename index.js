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

// check for saved file
fs.readFile("data.json", "utf8", function (err, data) {
    if (err) {
        // create a user
        userSetup();
    } else {
        // ask user if they want to continue or create a new game file
        continueGame(data);
    }
});

function continueGame(data) {
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
                continueFromSave(JSON.parse(data));
            } else {
                userSetup();
            }
        })
}

function continueFromSave(data) {
    username = data.username;
    character = data.character;
    curStage = data.curStage;
    health = data.health;
    weapons = data.weapons;
    console.log("Data loaded successfully");
    stageSelection();
}

function userSetup() {
    // ask user to create a username
    inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "What is your username?"
            }
        ])
        .then(res => {
            // set user details to global variables
            username = res.username;
            gameInstructions();
        })
}

// display game instructions
function gameInstructions() {
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
        charSelect();
    }, 5000);
}

// character choice
function charSelect() {
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
            createProfile();
        });
}

function createProfile() {
    const userInfo = {
        username,
        character: character[0],
        health,
        weapons,
        curStage
    }
    fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Saved");
        stageSelection();
    });
}

// based on current stage, reference particular stage
function stageSelection() {
    // select enemies based on stage
    const stageEnemies = [];
    for (let i = 0; i < curStage; i++) {
        const randomNum = Math.floor(Math.random() * 3);
        stageEnemies.push(enemies[randomNum]);
    }
    if (curStage > 0 && curStage < 5) {
        const earlyStage = normalStages.begin(curStage, character, username, stageEnemies, health, weapons);
    }
    if (curStage > 5 && curStage < 10) {

    }
    if (curStage > 10 && curStage < 15) {

    }
    if (curStage === 5 || curStage === 10 || curStage === 15) {

    }
    if (curStage === 16) {

    }
    // once game is completed, display congratulations message
    if (curStage === 17) {
        console.log("Congratulations on completing the game!");
    }
}
// at the end of each stage, save to data.json file