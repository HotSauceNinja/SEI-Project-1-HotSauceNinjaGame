function init() {


  // ELEMENTS
  const grid = document.querySelector('.grid')
  const gridWidth = 10
  const gridLength = 10
  const cellCount = gridWidth * gridLength
  const cells = []

  // Establish number of foods per row and their start position
  const numberOfFoodsPerRow = gridWidth - Math.floor(gridWidth / 2.5)
  const foodStartPositionOnRow = (gridWidth - numberOfFoodsPerRow) / 2
  
  // Set ninja class & start position
  const ninjaClass = 'ninja'
  let ninjaPosition = 94

  // VARIABLES
  const foods = ['pizza', 'fries', 'egg', 'drumstick']

  // Create food object class for all food properties and methods
  class foodsObject {
    constructor(name) {
      this.name = name
    }
    getIndexNumber() {
      return `${foods.indexOf(this.name)}`
    }
    setStartPosition() {
      if (((gridWidth * this.getIndexNumber() + foodStartPositionOnRow - gridWidth) > 0)) {
        return (gridWidth * this.getIndexNumber()) + foodStartPositionOnRow - gridWidth
      } else {
        console.log('this is hidden')
        return null
      }
    }
    setOddClass() {
      return this.name + 'Odd'
    }
    setEvenClass() {
      return this.name + 'Even'
    }
  }

  // Declaring and array and storing all food objects created automatically through for loop
  let foodsObjectArray = []
  for (let i = 0; i < foods.length; i++) {
    foodsObjectArray.push(new foodsObject(foods[i]))
  }
  // console.log({ foodsObjectArray })

  // Placing foods on grid


  // // Place first drumstick two rows from top 
  // function placeFoods (foods) {
  //   for (let i = 1; i < foods.length; i++) {
      
  //     foods[i].setStartPosition()
  //     foodPosition.i = 

  //     // let foodClass = `${foods[i]}Position`
  //     // console.log(`${foods[i]}Position`)
  //     let startPosition = (gridWidth * i ) + foodStartPositionOnRow 
  //     console.log({ startPosition })
      
  //     cells[startPosition].classList.add(drumstickClassEven)
  //   }
  // }

// todo UP TO HERE
  
  // FUNCTIONS

  // Creating the Gameplay Area
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

    // // Adding drumsticks in start position
    // addDrumsticks(drumstickPosition)

    // todo call addFoods function
  }

// todo FOODS SECTION
  // Adding food to grid
  function addDrumsticks (position) {
    if (position % 2 === 0) {
      cells[position].classList.add(drumstickClassEven)
      // console.log({ position })
    } else {
      cells[position].classList.add(drumstickClassOdd)
    }
  }

  function addFoodItem (position) {
    // if on row 0 to 9 add fries
    // if on row 10 to 19 add eggs
    // if on row 20 to 29 add drumstick
  }

  // Removing food from grid
  function removeDrumstick (position) {
    if (position % 2 === 0) {
      cells[position].classList.remove(drumstickClassEven)
      // console.log({ position })
    } else {
      cells[position].classList.remove(drumstickClassOdd)
    }
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


  // CALLING THE FUNCTIONS
  createGrid(ninjaPosition) // To create the Gameplay Area

  // placeFoods(foods)

  // removeDrumstick(drumstickPosition)

  // EVENTS

  document.addEventListener('keydown', moveNinja)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be taken out before submitting project
// ! Important note
// ? Can also use this colour for something