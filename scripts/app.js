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
  
  // Creating food object class for all food properties and methods
  class foodsObject {
    constructor(name) {
      this.name = name
    }

    getIndexNumber() {
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

  // Declaring and array and storing all food objects created automatically through for loop
  const foodsObjectArray = []
  for (let i = 0; i < foods.length; i++) {
    foodsObjectArray.push(new foodsObject(foods[i]))
  }
  // console.log({ foodsObjectArray })


  // todo FUNCTIONS
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

    // addFoods function
    addFoodToGrid()

  }

  // todo FOODS SECTION
  // Adding food to grid
  function addFoodToGrid () {
    // set start position for each food in the foods object array
    for (let i = 1; i < foodsObjectArray.length; i++) {
      const position = foodsObjectArray[i].setStartPosition()

      // add different classlist depending on if column is odd or even
      if (position % 2 === 0) {
        cells[position].classList.add(foodsObjectArray[i].linkEvenClass())
        // cells[position].classList.add(ninjaClass)
      } else {
        cells[position].classList.add(foodsObjectArray[i].linkOddClass())
      }
    }
  }

  // Removing food from grid
  function removeItemFromGrid (position) {
    cells[position].setAttribute('class', 'grid-div')
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

  // remove item from grid
  removeItemFromGrid()

  // EVENTS

  document.addEventListener('keydown', moveNinja)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be taken out before submitting project
// ! Important note
// ? Can also use this colour for something