const fs = require('fs');
const colors = require('colors');
const inquirer = require('inquirer');
const allWeapons = require('../../assets/weapons.json');

module.exports = {
    intro: function (character, curStage, weapons, lives, username, health) {
        console.log("Rock, Paper, Scissors!".cyan.bold);
        setTimeout(() => {
            console.log("Rock smashes scissors, paper covers rock, scissors cut paper".cyan);
        }, 1000);
        setTimeout(() => {
            console.log("Select your best move and get a point!")
        }, 2000);
        setTimeout(() => {
            console.log("If you get ten points, you win a prize!".green.bold);
        }, 3000);
        setTimeout(() => {
            this.game(character, curStage, weapons, lives, username, health, 0, false);
        }, 5000);
    },
    game: function (character, curStage, weapons, lives, username, health, score, wonLastRound) {
        console.clear();
        console.log("Score: " + score);
        const choicesArr = ["rock", "paper", "scissors"];
        let randNum = Math.floor(Math.random() * 3);
        let cpuChoice = choicesArr[randNum];
        if (score >= 10) {
            console.log("You won the game!");
            this.checkWeapon(character, curStage, weapons, lives, username, health);
        } else {
            inquirer
                .prompt(
                    {
                        type: "checkbox",
                        name: "userChoice",
                        message: "What do you choose?",
                        choices: choicesArr
                    }
                ).then(res => {
                    const userChoice = res.userChoice[0];
                    // if user lost last round, choose between winning or tie options
                    if (!wonLastRound) {
                        // get index of user choice
                        const index = choicesArr.findIndex(ele => ele === userChoice);
                        // array for two remaining cpu options
                        const cpuAlts = [];
                        // random number between 0 and 1
                        randNum = Math.floor(Math.random() * 2);
                        // evaluate user choice and push other options
                        switch (index) {
                            case 0:
                                cpuAlts.push(choicesArr[1]);
                                cpuAlts.push(choicesArr[2]);
                                break;
                            case 1:
                                cpuAlts.push(choicesArr[2]);
                                cpuAlts.push(choicesArr[0]);
                                break;
                            case 2:
                                cpuAlts.push(choicesArr[1]);
                                cpuAlts.push(choicesArr[0]);
                                break;
                        }
                        // if user would lose, chose between other two options
                        cpuChoice = cpuAlts[randNum];
                    }
                    // determine winner and get updated score
                    const { outcome, newScore } = this.determineWinner(userChoice, cpuChoice, score);
                    setTimeout(() => {
                        this.game(character, curStage, weapons, lives, username, health, newScore, outcome);
                    }, 5000);
                })
        }
    },
    determineWinner(userChoice, cpuChoice, score) {
        let charScore = score;
        // tie
        if (userChoice === cpuChoice) {
            setTimeout(() => {
                console.log("CPU chose " + cpuChoice);
            }, 1000);
            setTimeout(() => {
                console.log("Draw");
            }, 2000);
            setTimeout(() => {
                console.log("You score is " + charScore);
            }, 3000);
            return { outcome: false, newScore: charScore}
            // win
        } else if ((userChoice === "rock" && cpuChoice === "scissors") || (userChoice === "paper" && cpuChoice === "rock") || (userChoice === "scissors" && cpuChoice === "paper")) {
            charScore += 1;
            setTimeout(() => {
                console.log("CPU chose " + cpuChoice);
            }, 1000);
            setTimeout(() => {
                console.log("You won this round!".green);
            }, 2000);
            setTimeout(() => {
                console.log("Your score is now " + charScore);
            }, 3000);
            return { outcome: true, newScore: charScore}
            // loss
        } else {
            if (charScore - 1 < 0) {
                charScore = 0
            } else {
                charScore -= 1;
            }
            setTimeout(() => {
                console.log("CPU chose " + cpuChoice);
            }, 1000);
            setTimeout(() => {
                console.log("You lost this round...".red);
            }, 2000);
            setTimeout(() => {
                console.log("Your score is now " + charScore);
            }, 3000);
            return { outcome: false, newScore: charScore}
        }
    },
    checkWeapon: function(character, curStage, weapons, lives, username, health) {
        // check if user already has special weapon
        const userSpecial = weapons.filter(weapon => weapon.name === "lightning lance");
        // if they do
        if (userSpecial.length > 0) {
            // randomly select a number 0 - 2
            const randNum = Math.floor(Math.random() * 2);
            // options --> attack, block and heal
            const options = ["attack", "block", "heal"];
            // increase selected stat by 10
            const newStat = character[options[randNum]] += 10;
            character[options[randNum]] = newStat;
            console.log("Your " + options[randNum] + " has increased by 10!");
            setTimeout(() => {
                this.save(character, curStage, weapons, lives, username, health);
            }, 1000);
            // if not, push weapon to weapons array
        } else {
            console.log(("You have unlocked a " + allWeapons[8].name + "!").bgCyan); 
            weapons.push(allWeapons[8]);
            setTimeout(() => {
                this.save(character, curStage, weapons, lives, username, health);
            }, 1000);
        }
    },
    save: function(character, curStage, weapons, lives, username, health) {
        // create user object
        const userInfo = {
            username,
            character,
            health,
            weapons,
            curStage,
            lives
        }
        // save file
        fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Saved".green);
            console.log("Restart to continue...".bold);
        });
    }
}