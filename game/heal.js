module.exports = {
    heal: function (userHealth, userHeal, curStage) {
        console.log("You drink a magic potion...");
        // flip a coin for amount of health gained
        const coin = Math.floor(Math.random() * 2);
        // increase user health by user heal
        let totalHealth = 0;
        if (coin > 0) {
            console.log("You gained " + userHeal + "hp!");
            totalHealth = userHealth + userHeal;
        } else {
            console.log("You gained " + (userHeal - (curStage * 2)) + "hp!");
            totalHealth = userHealth + (userHeal - (curStage * 2));
        }
        // return user health
        return totalHealth;
    }
}