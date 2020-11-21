function init() {
  // todo VARIABLES
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
  
  // Declare array for storing food position for each food item
  
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
      // todo for loop with number of foods per row

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

  // Declaring an array and storing all food objects created automatically through for loop
  const foodsObjectArray = []
  for (let i = 0; i < foods.length; i++) {
    foodsObjectArray.push(new foodsObject(foods[i]))
  }


  // todo FUNCTIONS
  // Creating the initial Gameplay Area, adding characters
  function createGrid(ninjaPosition) {
    // Creating the cells and adding them on the board
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('class', 'grid-div') // setting class to each cell -> space them out evenly & highlight borders
      cell.textContent = i // todo To count the cells for easier navigation during game development

      grid.appendChild(cell) // placing cell on grid
      cells.push(cell) // pushing each cell into the cells array
    } 

    // Adding ninja in start position
    addNinja(ninjaPosition)

    // addFoods function
    addFoodToGrid()
  }

  // todo FOODS SECTION
  // Adding all food to grid in start position
  function addFoodToGrid () {
    // set start position for each food in the foods object array
    for (let i = 1; i < foodsObjectArray.length; i++) {
      let position

      // for each food type add the required number of elements on grid
      for (let j = 0; j < numberOfFoodsPerRow; j++) {
        position = foodsObjectArray[i].setStartPosition() + j

        //push the position of each created element into the positionOnGrid element array
        foodsObjectArray[i].positionOnGrid.push(position)

        // add different classlist depending on if column is odd or even
        if (position % 2 === 0) {
          cells[position].classList.add(foodsObjectArray[i].linkEvenClass())
          // cells[position].classList.add(ninjaClass)
        } else {
          cells[position].classList.add(foodsObjectArray[i].linkOddClass())
        }
      }
    }
  }
  // console.log(foodsObjectArray[1].positionOnGrid)

  // Removing item from a position on grid
  function removeItemFromGrid (position) {
    cells[position].setAttribute('class', 'grid-div')
  }

  // todo FOODS MOVEMENT SECTION

  // after drawing grid and placing elements, start timer

  // for each element of each food object, in the position array - increase position with 1 every half a second
  // if element is at the end of the row, move at (position + 1) + index of element place in his array
  // when element reaches position 80(row before last), end game

  // after drawing grid and placing elements, set new timer starting at 0
  const gameStartTime = new Date(0)
  console.log(gameStartTime.getTime())

  function increaseIndexNumberByOne () {
    // looping through all food objects except pizza which is at index 0
    for (let i = 1; i < foodsObjectArray.length; i++) {

      // increases the index number of each with 1 to push the element to the next position on grid
      for (let j = 0; j < foodsObjectArray[i].positionOnGrid.length; j++) {
        
        foodsObjectArray[i].positionOnGrid[j] ++
        console.log(`${foodsObjectArray[i].name} ${foodsObjectArray[i].positionOnGrid[j]}`)
      }
    }
  }

  function stopMoving() { // if any index number >= 80 stop movement
    let firstFoodItem = foodsObjectArray[foodsObjectArray.length - 1].positionOnGrid

    if (firstFoodItem[firstFoodItem.length - 1] >= 80) {
      console.log('stop')
    }
  }

  const timerId = setInterval(() => {
    stopMoving()

    // looping through all food objects except pizza which is at index 0
    increaseIndexNumberByOne()

    // for (let i = 0; i < 2; i++) {
    //   console.log('do action every second', i)
    // }
  }, 100)

  setTimeout(() => {
    clearInterval(timerId)
  }, 50000) // stop after 5 seconds


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


  // CALLING THE FUNCTIONS
  createGrid(ninjaPosition) // To create the Gameplay Area

  // // date & time at the moment
  // //  const now = new Date()
  //  // console.log(now.getTime())
  // remove item from grid
  // removeItemFromGrid(2)

  // EVENTS

  document.addEventListener('keydown', moveNinja)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be taken out before submitting project
// ! Important note
// ? Can also use this colour for something