const inquirer = require('inquirer');
const fs = require('fs');
const characters = require('./Characters/characters.json');
const enemies = require('./Characters/enemies.json');

// welcome message
console.log("Welcome to the game!");
let username = "";
let curStage = 0;
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
                console.log(data);
            } else {
                userSetup();
            }
        })
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
            save();
        });
}

function save() {
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
    });
}
// based on current stage, reference particular stage
// at the end of each stage, save to data.json file
// once game is completed, display congratulations message