module.exports = {
    heal: function (userHealth, userHeal, curStage) {
        if (userHealth, userHeal, curStage) {
            console.log("You drink a magic potion...");
            // flip a coin for amount of health gained
            const tripleCoin = Math.floor(Math.random() * 3);
            // increase user health by user heal
            let totalHealth = 0;
            switch (tripleCoin) {
                case 0:
                    console.log("...it worked perfectly!");
                    console.log("You gained " + (userHeal + (curStage * 2) + 4) + "hp!");
                    totalHealth = userHealth + (userHeal + (curStage * 2) + 4);
                    break;
                case 1:
                    console.log("You gained " + (userHeal + 4) + "hp!");
                    totalHealth = userHealth + (userHeal + 4);
                    break;
                default:
                    console.log("It had no effect");
                    totalHealth = userHealth;
                    break;
            }
            // return user health
            return totalHealth;
        } else {
            throw new Error("Invalid heal parameters");
        }
    }
}