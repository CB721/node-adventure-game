module.exports = {
    defend: function(userHealth, enemyAttack, userBlock, curStage) {
        // subtact attack by user block
        const totalAttack = enemyAttack * curStage;
        console.log(totalAttack);
        const totalBlock = userBlock * Math.round(1 + (curStage / 15));
        console.log("You were able to prevent " + totalBlock + "hp of damage.");
        // return user health
        if (totalAttack - totalBlock > 0) {
            // new user health, hp lost
            let defendArr = [(userHealth - (totalAttack - totalBlock)), (totalAttack - totalBlock)];
            return defendArr;
        } else {
            // user health, hp lost
            let defendArr = [userHealth, 0];
            return defendArr;
        }
    }
}