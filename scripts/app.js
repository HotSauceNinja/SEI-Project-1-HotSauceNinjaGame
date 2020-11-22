function init() {
  // todo ===================================VARIABLES===================================
  const foods = ['pizza', 'fries', 'egg', 'drumstick']  
  
  // todo ELEMENTS
  const grid = document.querySelector('.grid')
  const gridWidth = 10
  const gridLength = 10
  const cellCount = gridWidth * gridLength
  const cells = []

  // Set ninja class & start position
  const ninjaClass = 'ninja'
  let ninjaPosition = 94  

  // Establish number of foods per row and their start position
  const numberOfFoodsPerRow = gridWidth - Math.floor(gridWidth / 2.5)
  const foodStartPositionOnRow = (gridWidth - numberOfFoodsPerRow) / 2

  // Establish the position a food item must reach to trigger game over //todo COMMENTED OUT TEMPORARY
  // const gameOverPosition = (gridLength - 2) * gridWidth

  // Creating food object class for all food properties and methods
  class foodsObject {
    constructor(name) {
      this.name = name
      this.positionOnGrid = [] //will store grid position of each food item 
    }

    getIndexNumber() { // returns the index of this food in the foods array
      return `${foods.indexOf(this.name)}`
    }

    setStartPosition() { //decides start position number for each food item
      if (((gridWidth * this.getIndexNumber() + foodStartPositionOnRow - gridWidth) > 0)) {
        return (gridWidth * this.getIndexNumber()) + foodStartPositionOnRow - gridWidth
      } else {
        console.log('this is hidden')
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


  // todo ===================================FUNCTIONS===================================
  // Creating the initial Gameplay Area, adding characters
  function createGrid(ninjaPosition) {
    // Creating the cells and adding them on the board
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('class', 'grid-div') // setting class to each cell -> space them out evenly & highlight borders
      cell.textContent = i // ! In place to count the cells for easier navigation during game development, take out at the end

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
  // Control ninja with keyboard
  function moveNinja(event) {
    const horizontalPosition = ninjaPosition % gridWidth

    removeNinja(ninjaPosition)

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
        console.log('Hot Sauce!')
        break
      case 32: // Shoot with space key
        console.log('Hot Sauce!')
        break
      default:
        console.log('Invalid key')
    }
    addNinja(ninjaPosition)
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
  // console.log(foodsObjectArray[1].positionOnGrid)

  function addClassOfItem(object, position) {
    // add different classlist depending on if column is odd or even
    if (position % 2 === 0) {
      cells[position].classList.add(object.linkEvenClass())
      // cells[position].classList.add(ninjaClass)
    } else {
      cells[position].classList.add(object.linkOddClass())
    }
  }


  // Removing item from a position on grid
  function removeItemFromGrid(position) {
    cells[position].setAttribute('class', 'grid-div')
  }

  // todo FOODS MOVEMENT SECTION

  // for each element of each food object, in the position array - increase position every second as follows:
  // increase 
  // if element is at the end of the row, move at (position + 1) + index of element place in his array
  // when element reaches gameOverPosition (row before last), end game

  // after drawing grid and placing elements, set new timer starting at 0
  const gameStartTime = new Date(0)
  console.log(gameStartTime.getTime())

  //todo GOOD FUNCTION COMMENTED OUT TEMPORARY
  // function stopMoving() { // if any index number >= gameOverPosition stop movement and pop item out of array
  //   for (let i = 1; i < foodsObjectArray.length; i++) {
  //     for (let j = 0; j < foodsObjectArray[i].positionOnGrid.length; j++) {       
  //       if (foodsObjectArray[i].positionOnGrid[j] >= gameOverPosition) {
  //         console.log('STOP') // todo replace with calling function to pop element out
  //         foodsObjectArray[i].positionOnGrid.pop(foodsObjectArray[i].positionOnGrid[j])
  //       }
  //     }
  //   } 
  // }

  function foodsMoveOneRight() {
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

  function foodsMoveOneLeft() {
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
  }

  // function to move to next row

  //todo ===================================TIMERS===================================
  // set timeout move two right
  setTimeout(foodsMoveOneRight, 1000)
  setTimeout(foodsMoveOneRight, 2000)

  // set timeout move one down
  setTimeout(foodsMoveOneDown, 3000)

  // set timeout move four left
  setTimeout(foodsMoveOneLeft, 4000)
  setTimeout(foodsMoveOneLeft, 5000)
  setTimeout(foodsMoveOneLeft, 6000)
  setTimeout(foodsMoveOneLeft, 7000)
  
  // set timeout move one down
  setTimeout(foodsMoveOneDown, 8000)

  // const timerId = setInterval(() => {
    
  //   // if index of any number reaches gameOverPosition, stop moving that item and pop it out of the list
  //   stopMoving()

  //   // looping through all food objects except pizza which is at index 0
  //   foodsMoveOneRight()


  //   // decrease index number by one
  //   // foodsMoveOneLeft()

  //   //   console.log('do action every second', i)

  // }, 100)

  // setTimeout(() => {
  //   clearInterval(timerId)
  // }, 9000) // stop after 5 seconds
  


  // todo ===================================CALLING THE FUNCTIONS===================================
  createGrid(ninjaPosition) // To create the Gameplay Area

  // todo ===================================EVENTS===================================

  document.addEventListener('keydown', moveNinja)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be taken out before submitting project
// ! Important note, remember to take this out
// ? Can also use this colour for something