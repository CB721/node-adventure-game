const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
    game: function(username, character, health, weapons) {
        const userInfo = {
            username,
            character,
            health,
            weapons,
            curStage: 17,
            lives: 3
        }
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "delete",
                    message: "Would you like to delete and start over?"
                }
            ])
            .then(res => {
                if (res.delete) {
                    this.confirmDelete(userInfo);
                } else {
                    this.save(userInfo);
                }
            })
    },
    confirmDelete: function(userInfo) {
        console.log("Continuing will delete all of your progress. \n You say no, your current progress will be saved...".red);
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "delete",
                    message: "Would you like to delete and start over?"
                }
            ])
            .then(res => {
                if (res.delete) {
                    this.delete();
                } else {
                    this.save(userInfo);
                }
            })
    },
    delete: function() {
        fs.unlink("../data.json", (err) => {
            if (err) {
              console.error(err);
              return;
            } else {
                console.log("File deleted...".red);
            }
          })
    },
    save: function(userInfo) {
        fs.writeFile("data.json", JSON.stringify(userInfo, null, '\t'), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Saved".green);
            console.log("Restart to continue...".bold);
        });
    }
}