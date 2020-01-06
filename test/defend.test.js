const Defend = require('../game/defend');

describe("Defend Mode", () => {
    it("should return an array if provided with valid arguments", () => {
        const defend = Defend.defend(10, 10, 10, 10);
        const isArray = Array.isArray(defend);
        expect(isArray).toEqual(true);
    });
    it("should throw an error if provided with no arguments", () => {
        expect(() => {
            Defend.defend();
        }).toThrow();
    });
    it("should return an array with two indices", () => {
        const defend = Defend.defend(10, 10, 10, 10);
        expect(defend.length).toEqual(2);
    });
    it("damage taken should be a positive number", () => {
        const defend = Defend.defend(10, 10, 1000, 10);
        expect(defend[1]).toBeGreaterThan(-1);
    });
    it("should return an array with two numbers", () => {
        const defend = Defend.defend(10, 10, 10, 10);
        const isIntOne = Number.isInteger(defend[0]);
        const isIntTwo = Number.isInteger(defend[1]);
        expect(isIntOne).toEqual(true);
        expect(isIntTwo).toEqual(true);
    });
    it("should return user health minus total damage dealt", () => {
        const defend = Defend.defend(10, 10, 10, 10);
        expect(defend[0]).toEqual(10 - defend[1]);
    });
});