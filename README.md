# SEI-Project-1
# Hot Sauce Ninja
by [Sandra Spighel](https://www.linkedin.com/in/sandraspighel/) - [HotSauceNinja](https://github.com/HotSauceNinja)
![Ninja](https://github.com/HotSauceNinja/SEI-Project-1-HotSauceNinjaGame/blob/main/Ninja/eyeninja_left.png?raw=true)

Deployed Project available [here](https://hotsauceninja.github.io/SEI-Project-1-HotSauceNinjaGame/)
<<<<<<< HEAD
=======

>>>>>>> cc8a5a6a3468e65b3817a6d4e31e3ce994963cbf
## Brief
  9 days to create a Space Invaders-type game using Vanilla Javascript, HTML and CSS.
## Overview
Inspired by Space Invaders, this game features a ninja fighting incoming food enemies by throwing bottles of hot sauce. 

The player wins a level if they manage to shoot down all incoming foods before these reach the bottom of the screen. Foods progress down in a zig zag block motion, shooting forks randomly throughout their movement. 

If the ninja is hit by a fork, the player loses a life. The game is lost if the player loses all lives, or if a food item reaches the last row.

## Technologies used
The game is using Vanilla JavaScript, HTML and CSS, and was deployed with GitHub Pages.

## Get Started
The website is accessible through the web browser and does not require installing any dependencies. 
The game can be played using the keyboard (Arrows and Space bar, or WASD keys and Enter). 

## Approach taken
First built the game grid by using a for loop to create each cell as a div, and then pushing it into the cells array. A minimal CSS was also written to place the corec game elements on the page, with the game grid in the middle.

Then tackled the player movement by using a switch stament generating outcomes based on key strokes (using ASCII key codes).

Used an array of objects to store all food items, and automated finding the start position and adding the food items to the grid at the start of the game. To create illusion of movement I am switching in between two different images of each food item based on their grid position: one for odd-numbered columns, and another one for even-numbered columns. 

Initially hard coded the food movement until I could work out a better way to automatise this. 

Wrote functions to handle interactions: when the hot sauce hits a food item, the item and the hot sauce bottle disappear from the board (all through adding and removing class names, using counters and pushing items out of the foods array).

Wrote function to randomise throwing forks from different food items still on the board. If a fork hits the ninja, the player loses one life.

Automated the food movement implementing checking if outermost elements on the left and right of the food block are at the end of the row, in which case the food goes down one row and starts moving in the opposite direction. 

Wrote end game conditions - player wins if ninja clears all food items, or loses if they reach the bottom of the screen or if lives get to 0.

Then implemented audio, the new visuals done in collaboration with a friend, a start page where the player can add their name and start the game when they are ready, and an end game page displaying the score.

<<<<<<< HEAD
A comprehensive ReadMe inclusive of project planning, build process, screenshots and detailed code is [available here](https://docs.google.com/document/d/1gYCbjeMwoDVXMoXbjuOj6MHwY5NWDhV4KvNyss24JwQ/edit?usp=sharing)
=======
# A comprehensive ReadMe inclusive of project planning, build process, screenshots and detailed code is [available here](https://docs.google.com/document/d/1gYCbjeMwoDVXMoXbjuOj6MHwY5NWDhV4KvNyss24JwQ/edit?usp=sharing)
>>>>>>> cc8a5a6a3468e65b3817a6d4e31e3ce994963cbf

## Wins
* Look of the game
* Automating the start game and food item placement
* Using an array to store food objects

# Known Bugs / Blockers
* ShowBoom function (when the hot sauce hits the food items) does not show the visual, likely because it adds the class of boom to the item right before removing the item from the grid (so no time to display this visully)
* Cancel an incoming fork with a hot sauce bottle does not work, but left the code in to illustrate a potential new feature
* The food block movement is not 100% as I wanted it to be, but had to cut my losses as it does work and I had already spent too much time on this without progressing.

# Possible future features:
* More levels
* scoreboard that persists, showing top 10 players with best scores (Spicy Board)
* More food items, each with a different score
* Trees/bushes in the middle protecting ninja from forks (but slowly deteriorating if hit)
* Big boss food appearing once during each level
* Personalise ninja by choosing eye colour
* Choose your fight arena (3 different backgrounds to choose from)
* Once a game, ninja gets a super splash that randomly kills a number of enemies when called

## License & copyright
This project was build for educational purposes. No copyright infringement is intended and all content is used under educational license. 
©️ [Sandra Spighel](https://www.linkedin.com/in/sandraspighel/)
<<<<<<< HEAD
=======

>>>>>>> cc8a5a6a3468e65b3817a6d4e31e3ce994963cbf
