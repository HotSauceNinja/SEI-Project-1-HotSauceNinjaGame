function init() {
  // todo ===========================VARIABLES=============================
  const foods = ['pizza', 'fries', 'egg', 'drumstick']  
  let score = 0
  let lives = 3
  let movingRight = true
  const maxScore = 3600
  let speed

  // todo ELEMENTS
  const welcomeDiv = document.querySelector('.welcome-div')
  const playerName = document.querySelector('form')
  const endDiv = document.querySelector('.game-over')
  const restartButton = document.querySelector('#new-start-button')
  const gameWrapper = document.querySelector('.game-wrapper')
  const headerOne = document.querySelector('body > h1')
  const gameOverText = document.querySelector('.game-over-text')

  // Linking score, name and lives with the website display
  const scoreDisplay = document.getElementsByClassName('display-current-score')[0]
  scoreDisplay.innerText = 0

  const scoreDisplayEnd = document.getElementsByClassName('display-current-score')[1]
  scoreDisplayEnd.innerText = 0

  const livesLeft = document.getElementsByClassName('display-lives-left')[0]
  livesLeft.innerText = lives
  const livesLeftEnd = document.getElementsByClassName('display-lives-left')[1]
  livesLeftEnd.innerText = lives

  const nameDisplay = document.getElementsByClassName('display-player-name')[0]

  const displayPointsLeft = document.querySelector('.display-points-left')
  displayPointsLeft.innerHTML = Math.abs(score - maxScore)

  //todo Game Grid
  const grid = document.querySelector('.grid')
  const gridWidth = 10
  const gridLength = 10
  const cellCount = gridWidth * gridLength
  const cells = []

  // Get ninja class & start position
  const ninjaClass = 'ninja'
  const ninjaAfterThrow = 'ninja-down'
  let ninjaPosition = 94 

  // Get hot sauce & fork classes
  const hotsauceClass = 'hotsauce' 
  const forkClass = 'fork'
  const pizzaClass = 'pizzaOdd'

  // Establish number of foods per row and their start position
  const numberOfFoodsPerRow = gridWidth - Math.floor(gridWidth / 2.5)
  const foodStartPositionOnRow = (gridWidth - numberOfFoodsPerRow) / 2

  // Establish the position a food item must reach to trigger game over 
  const gameOverPosition = (gridLength - 2) * gridWidth

  //todo FOOD OBJECTS ARRAY
  // Creating food object class for all food properties and methods
  class foodsObject {
    constructor(name) {
      this.name = name
      this.positionOnGrid = [] //will store grid position of each food item 
      this.classList = 'foodsClass'
    }

    getIndexNumber() { // returns the index of this food in the foods array
      return `${foods.indexOf(this.name)}`
    }

    setStartPosition() { //decides start position number for each food item
      if (((gridWidth * this.getIndexNumber() + foodStartPositionOnRow - gridWidth) > 0)) {
        return (gridWidth * this.getIndexNumber()) + foodStartPositionOnRow - gridWidth
      } else {
        return null
      }
    }

    linkOddClass() { //class for columns with odd number
      return `${this.name}Odd`
      // return this.name + 'Odd'
    }

    linkEvenClass() { //class for columns with even number
      return `${this.name}Even`
    }
  }

  // Declaring an array and storing all food objects created automatically through the for loop
  const foodsObjectArray = []
  for (let i = 0; i < foods.length; i++) {
    foodsObjectArray.push(new foodsObject(foods[i]))
  }

  //todo AUDIO
  const audio = document.querySelector('#audio')

  // Play audio on keypress
  function playAudioKey(event) {
    switch (event.keyCode) {
      // case 37: // left with left arrow
      //   audio.src = './sound/moveRightToLeft.mp3'
      //   break
      // case 65: // left with a key
      //   audio.src = './sound/moveRightToLeft.mp3'
      //   break
      // case 39: // right with right arrow
      //   audio.src = './sound/moveLeftToRight.mp3'
      //   break
      // case 68: // right with d key
      //   audio.src = './sound/moveLeftToRight.mp3'
      //   break
      case 13: // Shoot with enter key
        audio.src = './sound/throwHotSauce.mp3'
        break
      case 32: // Shoot with space key
        audio.src = './sound/throwHotSauce.mp3'
        break
      default:
        console.log('Invalid key')
    }  
    audio.play()
  }

  function playAudioStart () {
    audio.src = './sound/gong.mp3'
    audio.play()
  }

  // todo =======================FUNCTIONS=========================
  // Appears when loading the page, gets player name and starts the game when the user clicks the button
  function handleSubmit(event) {
    event.preventDefault()

    const nameInputted = document.querySelector('#input-player-name').value

    welcomeDiv.classList.add('hidden')

    nameDisplay.innerText = nameInputted

    startGame()
  } 

  // triggers the start of the game
  function startGame() {
  
    createGrid(ninjaPosition) // to create grid 

    startFoodsBlockMovement(movingRight) // to start moving the food block
  }

  // Creating the initial Gameplay Area, adding characters
  function createGrid(ninjaPosition) {

    // Creating the cells and adding them on the board
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('class', 'grid-div') // setting class to each cell -> space them out evenly & highlight borders
      // cell.textContent = i // ! In place to count the cells for easier navigation during game development

      grid.appendChild(cell) // placing cell on grid
      cells.push(cell) // pushing each cell into the cells array
    } 

    // Adding ninja in start position
    addNinja(ninjaPosition)

    // add foods in start position
    addFoodToGridInStartPosition()
  }

  // todo NINJA SECTION
  // Adding the ninja to grid
  function addNinja(position) {
    cells[position].classList.add(ninjaClass)
  }
  // Removing ninja from grid
  function removeNinja(position) {
    cells[position].classList.remove(ninjaClass)
  }
  // Adding the ninja after throw to grid
  function addNinjaAfterThrow(position) {
    cells[position].classList.add(ninjaAfterThrow)
  }
  // Removing ninja after throw from grid
  function removeNinjaAfterThrow(position) {
    cells[position].classList.remove(ninjaAfterThrow)
  }
  // Control ninja with keyboard
  function moveNinja(event) {
    // event.preventDefault()
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

  // todo HOT SAUCE BOTTLE MOVEMENT SECTION
  function removeHotSauce(position) {
    cells[position].classList.remove(hotsauceClass)
  }

  function moveHotSauce(position) {
    position = position - gridWidth
    
    if (position >= 10) {
      cells[position].classList.add(hotsauceClass)
      removeHotSauce(position + gridWidth)
    } else if (position >= 0) {
      cells[position + gridWidth].classList.remove(hotsauceClass)
      cells[position].classList.add(hotsauceClass)
      // removeHotSauce(position + gridWidth)
    }
    
  }

  function addHotSauce(position) {
    // when player presses key put the image of hot sauce on position above player
    cells[position - gridWidth].classList.add(hotsauceClass)
    // removeHotSauce(position) // not sure this is required
  
    //put timer so that bottle keeps going up 
    counterForHotsauce(position)
  }

  function scoreHit(position) {
    const positionOfFood = cells[position].classList
    // if hotSauce position contains food, increase points

    if (positionOfFood.contains('drumstickEven')) {
      score = score + 100

    } else if (positionOfFood.contains('drumstickOdd')) {
      score = score + 100

    } else if (positionOfFood.contains('eggEven')) {
      score = score + 200

    } else if (positionOfFood.contains('eggOdd')) {
      score = score + 200

    } else if (positionOfFood.contains('friesEven')) {
      score = score + 300

    } else if (positionOfFood.contains('friesOdd')) {
      score = score + 300

    } else if (positionOfFood.contains('pizzaEven')) {
      score = score + Math.floor(Math.random() * 500)

    } else if (positionOfFood.contains('pizzaOdd')) {
      score = score + Math.floor(Math.random() * 500)
  
    } else {
      console.log('missed!')
    }
    scoreDisplay.innerText = score
    scoreDisplayEnd.innerText = score

    displayPointsLeft.innerHTML = Math.abs(score - maxScore)
    // replace them with a boom class on a 1 second counter
  }

  function counterForHotsauce (hotsaucePosition) {
    let count = 0
    const timerIdOne = window.setInterval(() => {
      // repeat bottle movement and increase count each time
      hotsaucePosition = hotsaucePosition - gridWidth
      moveHotSauce(hotsaucePosition) 

      //if hotsaucePosition includes foodsClass remove both items
      if (cells[hotsaucePosition].classList.contains('foodsClass')) {
        
        scoreHit(hotsaucePosition)

        // ! show a boom +++++++++++++++++++++++++++
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

        // and stop timer for this bottle movement
        window.clearInterval(timerIdOne)
      }
    
      count ++

      // If bottle reaches end of grid, make it disappear and stop counting
      if (count > (gridWidth - 2)) {
        removeHotSauce(hotsaucePosition)
        window.clearInterval(timerIdOne)
      }
    }, 200)
  }

  function showBoom (position) {
    // removeItemFromGrid(position)
    cells[position].classList.add(pizzaClass)
  }

  // todo FOODS SECTION
  // Adding all food to grid in start position
  function addFoodToGridInStartPosition () {
    // set start position for each food in the foods object array
    for (let i = 1; i < foodsObjectArray.length; i++) {
      let position

      // for each food type add the required number of elements on grid
      for (let j = 0; j < numberOfFoodsPerRow; j++) {
        position = foodsObjectArray[i].setStartPosition() + j

        //push the position of each created element into the positionOnGrid element array
        foodsObjectArray[i].positionOnGrid.push(position)

        addClassOfItem(foodsObjectArray[i], position)
      }
    }
  }

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

  // Removing item from a position on grid
  function removeItemFromGrid(position) {
    cells[position].setAttribute('class', 'grid-div')
  }

  //todo FORK MOVEMENT
  function shootFork() {

    // using math random generate random forks 
    // accessing objects using math.ceil and (Math.random + 1) because I don't want to catch object 0 'Pizza', which behaves differently from rest
    const foodsObjectArrayNumber = Math.ceil((Math.random() + 0.001) * (foodsObjectArray.length - 1)) // returns number btw 1 and 3

    // accessing random food elements through their position using math.random
    const positionOnGridNumber = Math.floor(Math.random() * foodsObjectArray[foodsObjectArrayNumber].positionOnGrid.length)

    // generating random food element that will throw a fork 
    let randomShot = foodsObjectArray[foodsObjectArrayNumber].positionOnGrid[positionOnGridNumber]

    // function checking if there is another food element below, and if yes, pushing the fork down on the first empty row
    function containsFoodClass() {
      if (cells[randomShot].classList.contains('foodsClass')) {
        randomShot = randomShot + gridWidth
        containsFoodClass()
      }
      return randomShot
    }
    containsFoodClass()

    // adding fork to the space below the food that shot it
    cells[randomShot].classList.add(forkClass)

    // put timer so fork continues going down
    counterForFork(randomShot)
  }

  function removeFork(position) {
    cells[position].classList.remove(forkClass)
  }

  function moveFork(position) {
    removeFork(position - gridWidth)

    if (position <= 89) {
      removeFork(position)
      cells[position + gridWidth].classList.add(forkClass)
      
    } else if (position <= 99) {
      cells[position].classList.add(forkClass)
    }
  }
  
  function counterForFork(forkPosition) {

    const timerIdTwo = window.setInterval(() => {
      // repeat fork movement and increase count each time
      
      forkPosition = forkPosition + gridWidth
      moveFork(forkPosition)

      // if forkPosition includes ninjaClass remove both items and decrease ninjaLives with 1
      if (cells[forkPosition].classList.contains(ninjaClass)) {
        removeItemFromGrid(forkPosition)
        removeNinja(forkPosition)
        removeNinjaAfterThrow(forkPosition)
        lives--
        livesLeft.innerText = lives
        livesLeftEnd.innerText = lives

        // and stop timer for this bottle movement
        window.clearInterval(timerIdTwo)

        // then add ninja back on board
        if (lives > 0) {
          addNinja(ninjaPosition)
          window.clearInterval(timerIdTwo)
        } else {
          window.clearInterval(timerIdTwo)
          gameOver()
        }
      }

      // // if forkPosition includes hotsauceClass remove both items
      // if (cells[forkPosition].classList.contains(hotsauceClass)) {
      //   removeItemFromGrid(forkPosition)

      //   // and stop timer for this bottle movement
      //   window.clearInterval(timerIdTwo)
      // }

      // if fork reaches end of grid, make it disappear and stop counting
      if (forkPosition >= ((gridLength * gridWidth) - gridWidth)) {
        removeFork(forkPosition) 
        window.clearInterval(timerIdTwo)
      }
    }, 200)
  }

  // todo FOODS MOVEMENT 
  // Foods block movement 
  function foodsBlockMovement(movingRight) {
    speedUpFood()

    if (movingRight === true) {
      setTimeout(foodsMoveOneRight, speed)
    } else if (movingRight === false) {
      setTimeout(foodsMoveOneLeft, speed)
    }
  }

  function speedUpFood (speed) {
    const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)

    // if there are over 10 food items, move every 2000 milliseconds, else reduce as per below
    if (fullArray.length >= 10) {
      speed = 2500
    } else if (fullArray.length >= 9) {
      speed = 800 
    } else {
      speed = 200
    }
    return speed
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
  // move foods to the left
  function foodsMoveOneLeft() {

    // check if min element is at left end of grid
    const minElement = findMin()

    if (checkIfMinItemIsAtLeftEndOfRow(minElement)) {
      foodsMoveOneDown(movingRight)

    } else {
    // looping through all food objects except pizza which is at index 0
      for (let i = foodsObjectArray.length - 1; i > 0; i--) {
      // decreases the index number of each with 1 to push the element to the previous position on grid
      
        for (let j = 0; j < foodsObjectArray[i].positionOnGrid.length; j++) {
          removeItemFromGrid(foodsObjectArray[i].positionOnGrid[j])
          foodsObjectArray[i].positionOnGrid[j] --
          addClassOfItem(foodsObjectArray[i], foodsObjectArray[i].positionOnGrid[j])
        }
      }
    }
  }

  // move foods one down
  function foodsMoveOneDown() {

    // looping through all food objects except pizza which is at index 0
    for (let i = foodsObjectArray.length - 1; i > 0; i--) {
  
      // looping through all food positions from the right to the left
   
      for (let j = foodsObjectArray[i].positionOnGrid.length - 1; j >= 0; j--) {
        removeItemFromGrid(foodsObjectArray[i].positionOnGrid[j])
        foodsObjectArray[i].positionOnGrid[j] = foodsObjectArray[i].positionOnGrid[j] + gridWidth
        addClassOfItem(foodsObjectArray[i], foodsObjectArray[i].positionOnGrid[j])
      }
    }

    // check if max element is at right end of the grid
    const maxElement = findMax()

    // check if min element is at left end of the grid
    const minElement = findMin()

    // if max element is at right end of the grid, move left
    if (checkIfMaxItemIsAtRightEndOfRow(maxElement)) {
      movingRight = false

      // if min element is at left end of the grid, move right
    } else if (checkIfMinItemIsAtLeftEndOfRow(minElement)) {
      movingRight = true
    }
    foodsBlockMovement(movingRight)
  }

  // Check if min item is at the left end of the grid
  
  function checkIfMinItemIsAtLeftEndOfRow(position) {
    const horizontalPosition = position % gridWidth

    // if item is at left end of row
    if (horizontalPosition % 10 === 0) {
      return true
    }
    return false
  }

  // Check if max item is at the right end of the grid
  function checkIfMaxItemIsAtRightEndOfRow(position) {    
    const horizontalPosition = position % gridWidth

    // if item is at right end of row
    if (horizontalPosition === gridWidth - 1) {
      return true
    }
    return false
  }

  //todo ==========================TIMERS===========================
  // function to MOVE FOODS
  function startFoodsBlockMovement() {

    // keep looping until game over (currently set to if any food reaches game over position)
    const timerIdFour = window.setInterval(() => {

      const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)

      if (fullArray.length === 0) {
        window.clearInterval(timerIdFour)
        gameOver()
      } else if (findMax() >= gameOverPosition) {
        window.clearInterval(timerIdFour)
        gameOver()
      }

      //! speed function
      //function call to function which moves foods
      foodsBlockMovement(movingRight)
    }, 900)     
 
    counterForShootFork()
  }

  // functions finding min and max to store the outermost elements on the left(min) and on the right(max) of the moving positionOnGrid arrays 
  function findMax () {
    const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)

    const max = Math.max(...fullArray)
    return max
  }
  function findMin() {
    const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)

    const min = Math.min(...fullArray)
    return min
  }

  function counterForShootFork() {
    const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)
    
    const timerIdThree = window.setInterval(() => {
      shootFork()

      if ((lives === 0) || (findMax() >= gameOverPosition) || (fullArray.length === 0)) {
        window.clearInterval(timerIdThree)
      }
    }, 900)
  }

  function gameOver() {
    const fullArray = foodsObjectArray[1].positionOnGrid.concat(foodsObjectArray[2].positionOnGrid).concat(foodsObjectArray[3].positionOnGrid)

    if ((findMax() >= gameOverPosition) || (lives <= 0)) {
      // gameOverAlert()
      displayGameOverBox()
    } else if (fullArray.length === 0) {
      gameOverText.innerHTML = 'You won, you swift, spicy lightning!'
      displayGameOverBox()
    }
    audio.src = './sound/endBell.mp3'
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


  // todo ===========================EVENTS=========================
  document.addEventListener('keydown', moveNinja)

  document.addEventListener('keydown', playAudioKey)

  playerName.addEventListener('submit', handleSubmit)
  playerName.addEventListener('click', playAudioStart)

  restartButton.addEventListener('click', handleRestart)
  
}

window.addEventListener('DOMContentLoaded', init)