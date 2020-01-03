module.exports = {
    defend: function(userHealth, enemyAttack, userBlock, curStage) {
        // subtact attack by user block
        const difficulty = Math.ceil(curStage * 1.05);
        const totalAttack = enemyAttack + difficulty;
        console.log("You were able to block " + userBlock + "hp of damage.");
        // return user health
        if (totalAttack - userBlock > 0) {
            // new user health, hp lost
            let defendArr = [(userHealth - (totalAttack - userBlock)), (totalAttack - userBlock)];
            return defendArr;
        } else {
            // user health, hp lost
            let defendArr = [userHealth, 0];
            return defendArr;
        }
    }
}