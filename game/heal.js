module.exports = {
    heal: function (userHealth, userHeal, curStage) {
        console.log("You drink a magic potion...");
        // flip a coin for amount of health gained
        const coin = Math.floor(Math.random() * 2);
        // increase user health by user heal
        let totalHealth = 0;
        if (coin > 0) {
            console.log("You gained " + (userHeal + 4)+ "hp!");
            totalHealth = userHealth + (userHeal + 4);
        } else {
            console.log("...it worked perfectly!");
            console.log("You gained " + (userHeal + (curStage * 2) + 4) + "hp!");
            totalHealth = userHealth + (userHeal + (curStage * 2) + 4);
        }
        // return user health
        return totalHealth;
    }
}