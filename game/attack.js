module.exports = {
    attack: function (userAttack, enemyHealth, enemyBlock, curStage) {
        // multiply enemy block by difficulty
        let totalBlock = enemyBlock * curStage;
        let attack = userAttack * curStage;
        // subtact attack by total enemy block
        let totalAttack = attack - totalBlock;
        // return enemy health
        const attackArr = [(enemyHealth - totalAttack), totalAttack];
        return attackArr;
    }
}