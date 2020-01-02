module.exports = {
    defend: function(userHealth, enemyAttack, userBlock, difficulty) {
        // subtact attack by user block
        const randomAttackValue = Math.floor(Math.random() * difficulty);
        let totalAttack = enemyAttack * randomAttackValue;
        let defendArr = [];
        // return user health
        if (totalAttack - userBlock > 0) {
            // new user health, hp lost
            defendArr = [(userHealth - (totalAttack - userBlock)), (totalAttack - userBlock)];
            return defendArr;
        } else {
            // new user health, hp lost
            defendArr = [userHealth, 0];
            return defendArr;
        }
    }
}