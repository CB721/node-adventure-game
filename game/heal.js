module.exports = {
    heal: function (userHealth, userHeal, curStage) {
        // increase user health by user heal
        let totalHealth = userHealth + (Math.round((curStage * userHeal) / 2));
        // return user health
        return totalHealth;
    }
}