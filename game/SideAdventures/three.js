const fs = require('fs');
const colors = require('colors');
const inquirer = require('inquirer');
const enemies = require('../../Characters/enemies.json');
const { save } = require('./two');

module.exports = {
    intro: function (character, curStage, weapons, lives, username) {
        setTimeout(() => {
            console.log("Infinity Battle!".cyan.bold);
        }, 1000);
        setTimeout(() => {
            console.log("Fight off an endless supply of enemies.".cyan);
        }, 2000);
        setTimeout(() => {
            console.log("Each round will introduce a new set of characters for you to fight.".cyan);
        }, 3500);
        setTimeout(() => {
            console.log("If you get past all 100 levels, you will get a large stat boost!".cyan.bold);
        }, 6000);
        setTimeout(() => {
            this.game(character, curStage, weapons, lives, username, 100, 1);
        }, 8000);
    },
    game: function (character, curStage, weapons, lives, username, health, level) {
        // let curEnemies = [];
        if (level === 75) {
            health += 65;
            console.log("You got a health boost!".green.bold);
        }
        if (level === 33) {
            health += 35;
            console.log("You got a health boost!".green.bold);
        }
        // on clearing all 100 levels, give 20 point boost on all stats and set health to 100
        if (level === 101) {
            console.log("You won!".rainbow.bold);
            character.attack += 25;
            character.block += 25;
            character.heal += 25;
            setTimeout(() => {
                console.log("You received a stat boost!".green);
            }, 1000);
            setTimeout(() => {
                console.table(character);
            }, 2000);
            setTimeout(() => {
                save(character, curStage, weapons, lives, username, health);
            }, 3000);
        } else {
            const curEnemies = this.enemySelection(level);
            const enemyBoost = Math.ceil(level * 0.4);
            curEnemies.forEach(enemy => {
                enemy.name = enemy.name;
                // ensure fighter stats are maintained
                switch (enemy.name) {
                    case "Goblin":
                        enemy.health = 28;
                        break;
                    case "Troll":
                        enemy.health = 38;
                        break;
                    case "Fairy":
                        enemy.health = 13;
                        break;
                    case "Grick the Gnarl":
                        enemy.health = 78;
                        break;
                    case "Trevor the Knight":
                        enemy.health = 63;
                        break;
                    case "Castor the Cricket":
                        enemy.health = 87;
                        break;
                    default:
                        enemy.health = 105;
                        break;
                }
                // announce fighter
                console.log("You are fighting " + enemy.name);
                // rubber band enemy to character stats
                while (enemy.attack - (character.block - (Math.ceil(level / 10))) < 0) {
                    enemy.attack += 3;
                }
                // increase each enemy stats based on level
                enemy.attack += enemyBoost;
                enemy.health += enemyBoost;
            });
            setTimeout(() => {
                this.currentStatus(character, curStage, weapons, lives, username, health, level, curEnemies);
            }, 2000);
        }
    },
    currentStatus: function (character, curStage, weapons, lives, username, health, level, curEnemies) {
        console.clear();
        console.log("Level: " + level);
        console.log("Your current health: " + health + "hp");
        // console.log("current enemies ", curEnemies);
        // enemy has been defeated
        if (curEnemies[0].health <= 0) {
            console.log(curEnemies[0].name + " has been defeated");
            curEnemies.shift();
        }
        // user has been defeated
        if (health <= 0) {
            this.loss(character, curStage, weapons, lives, username, health, level);
        } else {
            this.fight(character, curStage, weapons, lives, username, health, level, curEnemies);
        }
    },
    loss: function (character, curStage, weapons, lives, username, health, level) {
        console.log("You have been defeated...".red);
        inquirer
            .prompt(
                {
                    type: "confirm",
                    name: "restart",
                    message: "Try again?"
                }
            ).then(res => {
                if (res.restart) {
                    this.intro(character, curStage, weapons, lives, username);
                } else {
                    const statBoost = Math.ceil(level / 10);
                    if (level > 75) {
                        character.attack += statBoost;
                        character.block += statBoost;
                        character.heal += statBoost;
                        setTimeout(() => {
                            console.log("Because you made it this far...");
                        }, 1000);
                        setTimeout(() => {
                            console.log("...you have been granted a small stat boost!".green);
                        }, 2500);
                        // log new stats
                        setTimeout(() => {
                            console.table([
                                {
                                    attack: character.attack,
                                    block: character.block,
                                    heal: character.heal
                                }
                            ]);
                        }, 3000);
                        setTimeout(() => {
                            save(character, curStage, weapons, lives, username, health);
                        }, 4000);
                    } else {
                        console.log("Restart to continue...".bold);
                    }
                }
            });
    },
    fight: function (character, curStage, weapons, lives, username, health, level, curEnemies) {
        if (curEnemies.length > 0) {
            console.table(curEnemies);
            inquirer
                .prompt(
                    {
                        type: "list",
                        name: "enemySelection",
                        message: "Which enemy would you like to attack?",
                        choices: curEnemies
                    }
                )
                .then(res => {
                    // get index of user selection
                    const index = curEnemies.findIndex(ele => ele.name === res.enemySelection);
                    curEnemies[index].health -= character.attack;
                    let totalBlock = ((curEnemies[index].attack) - character.block);
                    if (totalBlock < 0) {
                        totalBlock = 0;
                    }
                    health -= totalBlock;
                    setTimeout(() => {
                        console.log("You are attacked...".red);
                    }, 1000);
                    setTimeout(() => {
                        console.log(("You take " + totalBlock + " damage").red);
                    }, 2000);
                    setTimeout(() => {
                        console.log(("You attack for " + character.attack).green);
                    }, 3000);
                    setTimeout(() => {
                        console.log(curEnemies[index].name + " has " + curEnemies[index].health + " hp left");
                    }, 4000);
                    setTimeout(() => {
                        this.currentStatus(character, curStage, weapons, lives, username, health, level, curEnemies);
                    }, 5000);
                });
            // all enemies have been defeated
        } else {
            console.log("You have cleared this round!".green);
            const newLevel = level + 1;
            setTimeout(() => {
                this.game(character, curStage, weapons, lives, username, health, newLevel);
            }, 1000);
        }
    },
    enemySelection: function (level) {
        const enemyArr = [];
        const majorEnemies = [enemies[3], enemies[4], enemies[5]];
        const minorEnemies = [enemies[0], enemies[1], enemies[2]];
        // levels 1 - 10
        // fight minor enemies one at a time
        if (level >= 1 && level < 11) {
            let i = 0;
            while (i < 1) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 11 - 20
        // fight minor enemies two at a time
        if (level >= 11 && level < 21) {
            let i = 0;
            while (i < 2) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 21 - 30
        // fight major enemies one at a time
        if (level >= 21 && level < 31) {
            let i = 0;
            while (i < 1) {
                enemyArr.push(Object.create(majorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 31 - 40
        // fight minor enemies three at a time
        if (level >= 31 && level < 41) {
            let i = 0;
            while (i < 3) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 41 - 50
        // fights one major enemy with one minor enemy
        if (level >= 41 && level < 51) {
            let i = 0;
            while (i < 1) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                enemyArr.push(Object.create(majorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 51 - 60
        // 50 hp health boost
        // fight four minor enemies at a time
        if (level >= 51 && level < 61) {
            let i = 0;
            while (i < 4) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 61 - 70
        // fights two major enemies at a time
        if (level >= 61 && level < 71) {
            let i = 0;
            while (i < 2) {
                enemyArr.push(Object.create(majorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 71 - 80
        // fight two major enemies and two minor enemies
        if (level >= 71 && level < 81) {
            let i = 0;
            while (i < 2) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                enemyArr.push(Object.create(majorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // levels 81 - 90
        // fights two major enemies and four minor enmies
        if (level >= 81 && level < 91) {
            let i = 0;
            while (i < 4) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
            let j = 0;
            while (j < 2) {
                enemyArr.push(Object.create(majorEnemies[this.getRandomNum()]));
                j++;
            }
        }
        // levels 91 - 99
        // fights eight minor enemies at a time
        if (level >= 91 && level < 100) {
            let i = 0;
            while (i < 8) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        // level 100
        // fight all three major enemies and seven minor enemies
        if (level === 100) {
            enemyArr.push(Object.create(majorEnemies[0]));
            enemyArr.push(Object.create(majorEnemies[1]));
            enemyArr.push(Object.create(majorEnemies[2]));
            let i = 0;
            while (i < 7) {
                enemyArr.push(Object.create(minorEnemies[this.getRandomNum()]));
                i++;
            }
        }
        return enemyArr;
    },
    getRandomNum: function () {
        return Math.floor(Math.random() * 3);
    }
}