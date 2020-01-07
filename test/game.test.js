const inquirer = require('inquirer');
const colors = require('colors');
const Game = require('../game/game');

describe("Turn", () => {
    it("user is defeated", () => {
        const mock = jest.spyOn(console, "log");
        mock.mockImplementation(() => { });
        Game.turn(
            {
                name: "Osman",
                "losingPhrases": [
                    "I lost...", "How will I ever beat this guy?", "It is all hopeless!"
                ]
            },
            [], -5, true, 5, { weapon: "sword" }, 3, "Clint", false);
        expect(mock).toBeCalledWith(
            "You have been defeated!".red
        );
        expect(mock).toBeCalledWith(
            "You lost a life!".red
        );
        expect(mock).toBeCalledWith(
            colors.red.bold("You have 2 lives remaining...")
        );
        expect(mock).toBeCalledWith(expect.anything());
        mock.mockRestore();
    });
    it("user has completed stage", () => {
        const mock = jest.spyOn(console, "log");
        mock.mockImplementation(() => { });
        Game.turn(
            {
                name: "Osman",
                "winningPhrases": [
                    "I won!", "Take that, chump!", "All I do is win, win, win!"
                ]
            },
            [], 50, true, 5, { weapon: "sword" }, 3, "Clint", false);
        expect(mock).toBeCalledWith(
            "You have completed this stage".green
        );
        mock.mockRestore();
    });
});