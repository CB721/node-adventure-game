const Heal = require('../game/heal');

describe("Heal Mode", () => {
    it("should return an integer", () => {
        const heal = Heal.heal(10, 10, 10);
        const isInt = Number.isInteger(heal);
        expect(isInt).toBe(true);
    });
    it("should throw an error if provided with invalid arguments", () => {
        expect(() => {
            Heal.heal();
        }).toThrow();
    });
    it("should return a positive integer", () => {
        const heal = Heal.heal(10, 10, 10);
        expect(heal).toBeGreaterThan(-1);
    })
})