const inquirer = require('inquirer');
const fs = require('fs');
const colors = require('colors');
const figlet = require('figlet');

const characters = require('./Characters/characters.json');
const normalStages = require('./stages/normal');
const bossStages = require('./stages/boss');
const finalBossStage = require('./stages/finalBoss');
const enemies = require('./Characters/enemies.json');
const end = require('./game/end');
const stageNames = require('./assets/stageNames.json');
const allWeapons = require('./assets/weapons.json');
const sideChallenges = require('./game/SideAdventures/main');

// welcome message
figlet('Node Adventure!', (err, text) => {
    if (err) throw err;
    console.log(text.rainbow);
});
let username = "";
let curStage = 1;
let health = 99;
let weapons = [];
let character = {};
let lives = 3;
let freePlay = false;

// check for saved file
fs.readFile("data.json", "utf8", function (err, data) {
    if (err) {
        // create a user
        setTimeout(() => {
            controller.userSetup();
        }, 250);
    } else {
        // ask user if they want to continue or create a new game file
        setTimeout(() => {
            controller.continueGame(data);
        }, 250);
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
                    console.log("This will erase any existing saved information...".red);
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
        console.log("Data loaded successfully".green);
        if (curStage > 6) {
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "sideAdventures",
                        message: "Would you like to visit the caves of Enduf?"
                    }
                ])
                .then(res => {
                    if (res.sideAdventures) {
                        sideChallenges.intro(character, curStage, weapons, lives, username, health);
                    } else {
                        this.weaponSelection();
                    }
                });
        } else {
            this.weaponSelection();
        }
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
                    console.log("Please enter a valid username to continue...".red);
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
                console.log(character[0].weapon);
                for (let i = 0; i < allWeapons.length; i++) {
                    if (allWeapons[i].name === character[0].weapon) {
                        weapons.push(allWeapons[i]);
                    }
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
                console.log("Saved".green);
                thisIsThis.stageSelection();
            }
        });
    },

    weaponSelection: function () {
        if (weapons.length > 1) {
            // select weapon
            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        message: "Which weapon would you like to select?",
                        name: "weaponSelection",
                        choices: weapons
                    }
                ])
                .then(res => {
                    // character = characters.filter(character => character.name === res.char[0]);
                    const selectedWeapon = weapons.filter(charWeap => charWeap.name === res.weaponSelection[0]);
                    // add to character attack
                    character.attack += selectedWeapon[0].attackIncrease;
                    // subtract from character block
                    character.block -= selectedWeapon[0].blockDecrease;
                    console.log((selectedWeapon[0].name + " increased your attack by " + selectedWeapon[0].attackIncrease).green);
                    console.log((selectedWeapon[0].name + " descrease your block by " + selectedWeapon[0].blockDecrease).red);
                    this.stageSelection();
                });
        } else {
            character.attack += weapons[0].attackIncrease;
            character.block += weapons[0].attackIncrease;
            console.log((weapons[0].name + " increased your attack by " + weapons[0].attackIncrease).green);
            console.log((weapons[0].name + " descreased your block by " + weapons[0].blockDecrease).red);
            this.stageSelection();
        }
    },
    // based on current stage, reference particular stage
    stageSelection: function () {
        console.log(colors.bgGreen("You have " + lives + " lives remaining..."));
        // select enemies based on stage
        const stageEnemies = [];
        for (let i = 0; i < curStage; i++) {
            const randomNum = Math.floor(Math.random() * 3);
            stageEnemies.push(enemies[randomNum]);
        }
        if (curStage > 0 && curStage < 5) {
            normalStages.begin(curStage, character[0] || character, username, stageEnemies, health, weapons, lives, freePlay);
        }
        if (curStage > 5 && curStage < 10) {
            normalStages.begin(curStage, character[0] || character, username, stageEnemies, health, weapons, lives, freePlay);
        }
        if (curStage > 10 && curStage < 15) {
            normalStages.begin(curStage, character[0] || character, username, stageEnemies, health, weapons, lives, freePlay);
        }
        if (curStage === 5 || curStage === 10 || curStage === 15) {
            bossStages.boss(curStage, character[0] || character, username, health, weapons, lives, freePlay);
        }
        if (curStage === 16) {
            finalBossStage.final(character, username, health, weapons, lives, freePlay);
        }
        // once game is completed, display congratulations message
        if (curStage >= 17) {
            console.log("Congratulations on completing the game!".bgGreen);
            console.log("You keep all of your stats in free play...".inverse);
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "freeplay",
                        message: "Would you like to start free play?"
                    }
                ])
                .then(res => {
                    if (res.freeplay) {
                        freePlay = true;
                        this.freePlayStage();
                    } else {
                        end.game(username, character, health, weapons);
                    }
                })
        }
    },
    freePlayStage: function () {
        const stageArr = [];
        for (const name in stageNames[0]) {
            stageArr.push(name + ": " + stageNames[0][name]);
        }
        inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "stage",
                    message: "Which stage would you like to play?",
                    choices: stageArr
                }
            ])
            .then(res => {
                curStage = parseInt(res.stage[0][0]);
                this.weaponSelection();
            });
    }
}
