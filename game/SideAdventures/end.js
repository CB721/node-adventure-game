const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
    success: function(character, curStage, weapons, lives, username, health, results) {
        console.log("You successfully complete the challenge!");
    },
    fail: function(character, curStage, weapons, lives, username, health, results) {
        console.log("You did not complete this challenge...");
        setTimeout(() => {
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "restartChallenge",
                        message: "Would you like to try again?"
                    }
                ])
                .then(res => {
                    if (res.restartChallenge) {

                    } else {
                        
                    }
                });
        }, 743);
    }
}