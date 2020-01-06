module.exports = {
    attack: function (userAttack, enemyHealth, enemyBlock, curStage) {
        if (userAttack, enemyHealth, enemyBlock, curStage) {
            // multiply enemy block by difficulty
            const difficulty = Math.ceil(curStage * 1.05);
            const totalBlock = enemyBlock + difficulty;
            console.log("You attack for " + userAttack + "hp...")
            // subtact attack by total enemy block
            let damage = userAttack - totalBlock;
            if (damage < 0) {
                damage = 0;
            }
            // return enemy health
            const attackArr = [(enemyHealth - damage), damage];
            return attackArr;
        } else {
            throw new Error("Invalid attack parameters");
        }
    }
}