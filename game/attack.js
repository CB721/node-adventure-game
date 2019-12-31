module.exports = {
    attack: function(userAttack, enemyHealth, enemyBlock, difficulty) {
        // multiply enemy block by difficulty
        let totalBlock = 0;
        if (enemyBlock * difficulty >= userAttack * (difficulty / 2)) {
            totalBlock = enemyBlock;
        } else {
            totalBlock += enemyBlock * difficulty;
        }
        // subtact attack by total enemy block
        const totalAttack = (userAttack * (difficulty / 2)) - totalBlock;
        // return enemy health
        const attackArr = [(enemyHealth - totalAttack), totalAttack];
        return attackArr;
    }
}