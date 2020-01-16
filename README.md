# node-adventure-game

* A CLI adventure game application where you can select a character, battle enemies and play side missions.

## Project Walkthrough

### Project Details
* When first starting the game, the user is prompted to create a username and select a character
* There are a total of 16 levels for the user to play through
* Before each level, the user is presented with the current story line
* On each level, the user must fight one or many enemies
* If they defeat all enemies, they get a stat boost and move on to the next level
* If they lose all of their health, they lose a life
    * If all three lives are lost, they are sent back to the previous level
* Every fifth level is a boss
    * Defeating each boss unlocks a new weapon
* Once all 16 levels are cleared, the user unlocks "free play" mode where they can re-play previous levels
* After the user passes level 5, they unlock all three side missions where they can level up their skills and unlock new weapons
    * Speed Demon
        * A game where the user must press 25 random keys in 30 seconds
        * If they press the wrong key, they lose
        * If they don't press all 25, they lose
        * If they win, they receive a stat boost
    * Infinity Battle
        * A game where the user plays through 100 levels of enemies that get progressively more difficult
        * If they clear all 100 levels, they receive a stat boost
        * After certain levels, they receive a health boost
        * Enemy stats are rubberbanded to the user stats to make it difficult regardless of the user's current stats
    * Rock, Paper, Scissors
        * A classic rock, paper, scissors game
        * If the user wins, the get a point
        * If they lose, they lose a point
        * If they get to 10 points, they can either unlock a weapon or get a stat boost

### User Stories
* "As a user, I want to play a game that progressively gets more difficult."
* "As a user, I want to save my progress I go through the game."

### Project Installation
* Download project files to your local computer
* Run the command "npm i" in the root directory of the project folder
* Run the command "node index.js" to start the game

#### Future Improvements
* Add ASCII graphics for each character/enemy
* Remove the need to restart the game after each battle
* Convert application to a video game

### Technologies Used

* Node.js
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [File System](https://nodejs.org/api/fs.html)
* [Jest](https://jestjs.io/)
* [Figlet](https://www.npmjs.com/package/figlet)
* [Colors](https://www.npmjs.com/package/colors)

## Author
* Clint Brodar

### Version
* 1.0.0