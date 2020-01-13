const fs = require('fs');
const colors = require('colors');
const inquirer = require('inquirer');
// const Stats = require('../Stats');


module.exports = {
    intro: function (character, curStage, weapons, lives, username, health) {
        console.log("Welcome to Speed Demon!".cyan.bold);
        setTimeout(() => {
            console.log("You will be presented a key to press".blue);
        }, 1000);
        setTimeout(() => {
            console.log("You will only have a 30 seconds to press all of the keys".blue);
        }, 2000);
        setTimeout(() => {
            console.log("If you miss the key, you lose the game".blue);
        }, 3000);
        setTimeout(() => {
            console.log("If you get the key, the next one will appear".blue);
        }, 4000);
        setTimeout(() => {
            console.log("Once all 25 keys have been cleared, you win the game!".blue);
        }, 5000);
        setTimeout(() => {
            console.log("Make sure to press enter after pressing the key!".bold.blue);
        }, 6000);
        setTimeout(() => {
            console.log("Start!");
        }, 7000);
        setTimeout(() => {
            this.game(character, curStage, weapons, lives, username, health, 30000, 0);
        }, 8000);
    },
    game: function (character, curStage, weapons, lives, username, health, timeLeft, keyTotal) {
        console.log("score total: " + keyTotal);
        // if time left is zero or less than zero, they have lost the game
        if (timeLeft <= 0) {
            this.results(character, curStage, weapons, lives, username, health, false);
        } else {

            // list of all letters
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            // randomly select one of the letters
            const randNum = Math.floor(Math.random() * letters.length)
            const letter = letters[randNum];
            // set interval to create countdown
            let timeElapsed = 0;
            let interval = setInterval(() => {
                timeElapsed = timeElapsed + 1000;
                displayTime();
            }, 1000);
            const thisIsThis = this;
            function displayTime() {
                if (timeLeft - timeElapsed > 0) {
                    console.log("Time left: " + ((timeLeft - timeElapsed) / 1000) + " seconds");
                } else {
                    clearInterval(interval);
                    console.log("Time is up!");
                    thisIsThis.results(character, curStage, weapons, lives, username, health, false);
                }
            }
            // prompt user to input letter
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "userLetter",
                        message: letter
                    }
                ])
                // on user response
                .then(res => {
                    // clear interval
                    clearInterval(interval);
                    // if it matches
                    if (res.userLetter === letter) {
                        let remainingTime = timeLeft - timeElapsed;
                        let scoreTotal = keyTotal += 1;
                        // make sure time is subtracted if user selects key too quickly
                        if (remainingTime === timeLeft) {
                            remainingTime -= 1000;
                        }
                        // if score equals 25, they have won the game
                        // send true to results
                        if (scoreTotal >= 25) {
                            console.log("You won!");
                            setTimeout(() => {
                                this.results(character, curStage, weapons, lives, username, health, true);
                            }, 2000);
                        } else {
                            // call function again with keyTotal + 1
                            this.game(character, curStage, weapons, lives, username, health, remainingTime, scoreTotal);
                        }
                        // if it doesn't match, send false to results
                    } else {
                        console.log("Incorrect!");
                        this.results(character, curStage, weapons, lives, username, health, false);
                    }
                })
                .catch(err => console.log(err));
        }
    },
    results: function (character, curStage, weapons, lives, username, health, results) {
        if (results) {
            console.log("Your current stats");
            function Stats(attack, block, heal) {
                this.attack = attack;
                this.block = block;
                this.heal = heal;
            }
            let attack = character.attack;
            let block = character.block;
            let heal = character.heal;
            const levelStats = new Stats(attack, block, heal);
            console.table([levelStats]);
            // prompt user for which stat they would like to boost
            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        name: "statBoost",
                        message: "Which of your stats would you like to boost?",
                        choices: ["attack", "block", "heal"]
                    }
                ])
                .then(res => {
                    switch (res.statBoost[0]) {
                        case "attack":
                            attack = this.statBoost(curStage, attack, "attack");
                            break;
                        case "block":
                            block = this.statBoost(curStage, block, "block");
                            break;
                        default:
                            heal = this.statBoost(curStage, heal, "heal");
                            break;
                    }
                })
                .then(res => {
                    let newStats = new Stats(attack, block, heal);
                    // display new stats
                    console.table([newStats]);
                    // update values in character object
                    character.attack = attack;
                    character.block = block;
                    character.heal = heal;
                    // save file
                    this.save(character, curStage, weapons, lives, username, health);
                })
                .catch(err => console.log(err));

        } else {
            // prompt user to replay game
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "replay",
                        message: "Would you like to try again?"
                    }
                ])
                .then(res => {
                    if (res.replay) {
                        // if yes, replay game
                        this.intro(character, curStage, weapons, lives, username, health);
                    } else {
                        // if no, tell user to restart game to continue
                        console.log("Restart to continue...".bold);
                    }
                })
                .catch(err => console.log(err));
        }
    },
    statBoost: function (curStage, stat, statName) {
        // boost stat by 3% rounded up
        let totalBoost = Math.ceil(stat * 1.07);
        // max boost by current stage
        if (curStage < 11) {
            if (stat > 25) {
                console.log("You have reached the maximum stat for level " + curStage);
                totalBoost = stat;
            } else {
                if (totalBoost > 25) {
                    totalBoost = 25;
                }
            }
        } else if (curStage < 16) {
            if (stat > 35) {
                console.log("You have reached the maximum stat for level " + curStage);
                totalBoost = stat;
            } else {
                if (totalBoost > 35) {
                    totalBoost = 35;
                }
            }
        } else {
            if (stat > 100) {
                console.log("You have reached the maximum stat for level " + curStage);
                totalBoost = stat;
            } else {
                if (totalBoost > 100) {
                    totalBoost = 100;
                }
            }
        }
        setTimeout(() => {
            console.log("Your " + statName + " is now " + totalBoost + "!");
            return totalBoost;
        }, 1000);
    },
    save: function (character, curStage, weapons, lives, username, health) {
        const userInfo = {
            username,
            character,
            health,
            weapons,
            curStage,
            lives
        }
        fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Saved".green);
            console.log("Restart to continue...".bold);
        });
    }
}