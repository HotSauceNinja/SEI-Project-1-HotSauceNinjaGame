# SEI-Project-1: Hot Sauce Ninja ![img](https://img.shields.io/badge/version-v%201.0.0-blue)

by [Sandra Spighel](https://www.linkedin.com/in/sandraspighel/) - [HotSauceNinja](https://github.com/HotSauceNinja)

![Gameplay](https://github.com/HotSauceNinja/SEI-Project-1-HotSauceNinjaGame/blob/main/Screengrabs/HotSauceNinja_gameplay.gif?raw=true)

👉 [<b>TRY ME</b>](https://hotsauceninja.github.io/SEI-Project-1-HotSauceNinjaGame/) 👈

# Table of Contents

  - [Short Brief](#short-brief)
  - [Description](#description)
  - [Technology Used](#technology-used)
  - [Get Started](#get-started)
  - [Project Development](#project-development)
    - [Comprehensive README](https://docs.google.com/document/d/1gYCbjeMwoDVXMoXbjuOj6MHwY5NWDhV4KvNyss24JwQ/edit?usp=sharing)
  - [Final Thoughts & Project Wrap](#final-thoughts-and-project-wrap)
    - [Wins](#wins)
    - [Known Bugs / Blockers](#known-bugs-/-blockers)
    - [Possible future features](#possible-future-features)
  - [License](#license)
  
## Short Brief
9 days to create a Space Invaders-type game using Vanilla Javascript, HTML and CSS.
## Description
Inspired by Space Invaders, this game features a ninja fighting incoming food enemies by throwing bottles of hot sauce. 

The player wins a level if they manage to shoot down all incoming foods before these reach the bottom of the screen. Food items progress down in a zig zag block motion, shooting forks randomly throughout their movement. 

If the ninja is hit by a fork, the player loses a life. The game is lost if the player loses all lives, or if a food item reaches the last row.

## Technology used
The game is using Vanilla [JavaScript](https://www.javascript.com/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), and was deployed with [GitHub Pages](https://pages.github.com/).

## Get Started
The website is accessible through the web browser and does not require installing any dependencies. 
The game can be played using the keyboard (Arrows and Space bar, or WASD keys and Enter). 

## Project Development
I first built the game grid by using a for loop to create each cell as a div, and then pushing it into the cells array. A minimal CSS was also written to place the game elements on the page, with the game grid in the middle.

```
  // GAME GRID
  const grid = document.querySelector('.grid')
  const gridWidth = 10
  const gridLength = 10
  const cellCount = gridWidth * gridLength
  const cells = []

  // Creating the initial Gameplay Area, adding characters
  function createGrid(ninjaPosition) {

    // Creating the cells and adding them on the board
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      
      // setting class to each cell -> space them out evenly & highlight borders
      cell.setAttribute('class', 'grid-div') 

      cell.textContent = i // ! In place to count the cells for easier navigation during game development

      grid.appendChild(cell) // placing cell on grid
      cells.push(cell) // pushing each cell into the cells array
    } 
```

The player movement was created by using a switch stament generating outcomes based on key strokes (using ASCII key codes).

```
  // Control ninja with keyboard
  function moveNinja(event) {
    // event.preventDefault() // causes name input area to become unresponsive

    const horizontalPosition = ninjaPosition % gridWidth

    removeNinja(ninjaPosition)
    removeNinjaAfterThrow(ninjaPosition)

    switch (event.keyCode) {
      case 37: // left with left arrow
        if (horizontalPosition > 0) ninjaPosition--
        break
      case 65: // left with a key
        if (horizontalPosition > 0) ninjaPosition--
        break
      case 39: // right with right arrow
        if (horizontalPosition < gridWidth - 1) ninjaPosition++
        break
      case 68: // right with d key
        if (horizontalPosition < gridWidth - 1) ninjaPosition++
        break
      case 13: // Shoot with enter key
        addHotSauce(ninjaPosition)
        addNinjaAfterThrow(ninjaPosition)
        break
      case 32: // Shoot with space key
        addHotSauce(ninjaPosition)
        addNinjaAfterThrow(ninjaPosition)
        break
      default:
        console.log('Invalid key')
    }  
    addNinja(ninjaPosition)
  }
  ```

Used an array of objects to store all food items, and automated finding the start position and adding the food items to the grid at the start of the game. To create illusion of movement I am switching in between two different images of each food item based on their grid position: one for odd-numbered columns, and another one for even-numbered columns. 

```
  function addClassOfItem(object, position) {
    // add different classlist depending on if column is odd or even
    if (position % 2 === 0) {
      cells[position].classList.add(object.linkEvenClass())
      cells[position].classList.add('foodsClass')
    } else {
      cells[position].classList.add(object.linkOddClass())
      cells[position].classList.add('foodsClass')
    }
  }
```

I initially hard coded the food movement until I could work out a better way to automatise this. 

Wrote functions to handle interactions: when the hot sauce hits a food item, the item and the hot sauce bottle disappear from the board (all through adding and removing class names, using counters and pushing items out of the foods array).

```
      //if hotsaucePosition includes foodsClass remove both items
      if (cells[hotsaucePosition].classList.contains('foodsClass')) {
        scoreHit(hotsaucePosition)
        showBoom(hotsaucePosition)
        
        // check each food object in the foodsObjectArray
        foodsObjectArray.forEach(item => {

          // if the item positions array includes the position where the bottle hit
          if (item.positionOnGrid.includes(hotsaucePosition)) {

            // find the index of that position
            const elementToRemoveIndex = item.positionOnGrid.indexOf(hotsaucePosition)

            // and take the element out of the array
            item.positionOnGrid.splice(elementToRemoveIndex, 1)
          }
        })

        // then remove both food item and bottle from the grid 
        removeItemFromGrid(hotsaucePosition)
        removeHotSauce(hotsaucePosition - gridWidth)
```

Wrote function to randomise throwing forks from different food items still on the board. If a fork hits the ninja, the player loses one life.

Automated the food movement implementing checking if outermost elements on the left and right of the food block are at the end of the row, in which case the food goes down one row and starts moving in the opposite direction. 

```
  // Check if max item is at the right end of the grid
  function checkIfMaxItemIsAtRightEndOfRow(position) {    
    const horizontalPosition = position % gridWidth

    // if item is at right end of row
    if (horizontalPosition === gridWidth - 1) {
      return true
    }
    return false
  }

  // move foods to the right
  function foodsMoveOneRight() {

    // check if max element is at right end of the grid
    const maxElement = findMax()
  
    if (checkIfMaxItemIsAtRightEndOfRow(maxElement)) {
      return foodsMoveOneDown(movingRight)

    } else {
      // looping through all food objects except pizza which is at index 0
      for (let i = 1; i < foodsObjectArray.length; i++) {

        // increases the index number of each with 1 to push the element to the next position on grid
        for (let j = foodsObjectArray[i].positionOnGrid.length - 1; j >= 0; j--) {
          removeItemFromGrid(foodsObjectArray[i].positionOnGrid[j])
          foodsObjectArray[i].positionOnGrid[j] ++
          addClassOfItem(foodsObjectArray[i], foodsObjectArray[i].positionOnGrid[j])
        }
      }
    }
  }
```

Wrote end game conditions - player wins if ninja clears all food items, or loses if they reach the bottom of the screen or if lives get to 0.

```
// =======================END OF GAME FUNCTIONS=======================
  function gameOver() {
    const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)

    if ((findMax() >= gameOverPosition) || (lives <= 0)) {
      // gameOverAlert()
      displayGameOverBox()
    } else if (fullArray.length === 0) {
      gameOverText.innerHTML = 'You won, you swift, spicy lightning!'
      displayGameOverBox()
    }
    audio.src = './Sound/endBell.mp3'
    audio.play()
  }

  function displayGameOverBox () {
    gameWrapper.setAttribute('class', 'hidden')
    headerOne.setAttribute('class', 'hidden')
    endDiv.classList.remove('hidden')
  }

  function handleRestart() {
    window.location.reload()
  }
```

Then implemented audio, the new visuals done in collaboration with a friend, a start page where the player can add their name and start the game when they are ready, and an end game page displaying the score.

---
## A comprehensive README inclusive of project planning, build process, screenshots and detailed code is [available here](https://docs.google.com/document/d/1gYCbjeMwoDVXMoXbjuOj6MHwY5NWDhV4KvNyss24JwQ/edit?usp=sharing)
---

## Final Thoughts & Project Wrap
### Wins
* Look of the game
* Automating the start game and food item placement
* Using an array to store food objects

### Known Bugs / Blockers
* ShowBoom function (when the hot sauce hits the food items) does not show the visual, likely because it adds the class of boom to the item right before removing the item from the grid (so no time to display this visully)
* Cancel an incoming fork with a hot sauce bottle does not work, but left the code in to illustrate a potential new feature
* The food block movement is not 100% as I wanted it to be, but had to cut my losses as it does work and I had already spent too much time on this without progressing.

### Possible future features
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
