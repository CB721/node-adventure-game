module.exports = {
    attack: function (userAttack, enemyHealth, enemyBlock, difficulty) {
        // multiply enemy block by difficulty
        let totalBlock = 0;
        if (enemyBlock * difficulty >= userAttack * (difficulty / 2)) {
            totalBlock = Math.round(enemyBlock / 2);
        } else {
            totalBlock = Math.round(enemyBlock * (difficulty / 2));
        }
        // subtact attack by total enemy block
        const totalAttack = (userAttack * (difficulty / 2)) - totalBlock;
        // return enemy health
        const attackArr = [(enemyHealth - totalAttack), totalAttack];
        return attackArr;
    }
}