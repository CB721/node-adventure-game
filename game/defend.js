module.exports = {
    defend: function(userHealth, enemyAttack, userBlock, curStage) {
        const block = userBlock + curStage;
        console.log("You were able to prevent " + block + "hp of damage.");
        // subtact attack by user block
        const totalAttack = enemyAttack * curStage;
        // return user health
        if (totalAttack - block > 0) {
            // new user health, hp lost
            let defendArr = [(userHealth - (totalAttack - block)), (totalAttack - block)];
            return defendArr;
        } else {
            // user health, hp lost
            let defendArr = [userHealth, 0];
            return defendArr;
        }
    }
}