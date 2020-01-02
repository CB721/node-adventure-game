module.exports = {
    attack: function (userAttack, enemyHealth, enemyBlock, curStage) {
        // multiply enemy block by difficulty
        const totalBlock = enemyBlock * curStage;
        console.log("You attack for " + userAttack + "hp...")
        // subtact attack by total enemy block
        let damage = userAttack - totalBlock;
        // return enemy health
        const attackArr = [(enemyHealth - damage), damage];
        return attackArr;
    }
}