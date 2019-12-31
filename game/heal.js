module.exports = {
    heal: function(userHealth, userHeal) {
        // increase user health by user heal
        let totalHealth = userHealth + userHeal;
        // return user health
        if (totalHealth > 100) {
            return userHealth;
        } else {
            return totalHealth;
        }
    }
}