const Attack = require('../game/attack');

describe("Attack Mode", () => {
    it("should return an array if provided with valid arguments", () => {
        const attack = Attack.attack(10, 10, 10, 10);
        const isArray = Array.isArray(attack);
        expect(isArray).toEqual(true);
    });
    it("should throw an error if provided with no arguments", () => {
        expect(() => {
            Attack.attack();
        }).toThrow();
    });
    it("should return an array with two indices", () => {
        const attack = Attack.attack(10, 10, 10, 10);
        expect(attack.length).toEqual(2);
    });
    it("damage dealt should be a positive number", () => {
        const attack = Attack.attack(10, 10, 1000, 10);
        expect(attack[1]).toBeGreaterThan(-1);
    });
    it("should return an array with two numbers", () => {
        const attack = Attack.attack(10, 10, 10, 10);
        const isIntOne = Number.isInteger(attack[0]);
        const isIntTwo = Number.isInteger(attack[1]);
        expect(isIntOne).toEqual(true);
        expect(isIntTwo).toEqual(true);
    });
    it("should return enemy health minus total damage dealt", () => {
        const attack = Attack.attack(10, 10, 10, 10);
        expect(attack[0]).toEqual(10 - attack[1]);
    });
})