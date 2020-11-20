function init() {
  // VARIABLES


  // ELEMENTS
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []

  const ninjaClass = 'ninja'
  let ninjaPosition = 94

  const drumstickClassOdd = 'drumstick-odd'
  const drumstickClassEven = 'drumstick-even'
  let drumstickPosition = 23

  
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

    addNinja(ninjaPosition)

    addDrumsticks(drumstickPosition)
    console.log({ drumstickPosition })
  }

  // todo NINJA SECTION
  // Adding the ninja to grid
  function addNinja(position) {
    cells[position].classList.add(ninjaClass)
    console.log({ position })
  }
  
  // Removing ninja from grid
  function removeNinja(position) {
    cells[position].classList.remove(ninjaClass)
    console.log({ position })
  }
  
  // Control ninja with keyboard
  function moveNinja(event) {
    const horizontalPosition = ninjaPosition % width

    removeNinja(ninjaPosition)

    switch (event.keyCode) {
      case 37: // left with left arrow
        if (horizontalPosition > 0) ninjaPosition--
        break
      case 65: // left with a key
        if (horizontalPosition > 0) ninjaPosition--
        break
      case 39: // right with right arrow
        if (horizontalPosition < width - 1) ninjaPosition++
        break
      case 68: // right with d key
        if (horizontalPosition < width - 1) ninjaPosition++
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
  // Adding food to grid
  function addDrumsticks (position) {
    if (position % 2 === 0) {
      cells[position].classList.add(drumstickClassEven)
      console.log({ position })
    } else {
      cells[position].classList.add(drumstickClassOdd)
    }
  }

  // Removing food from grid
  function removeDrumstick (position) {
    if (position % 2 === 0) {
      cells[position].classList.remove(drumstickClassEven)
      console.log({ position })
    } else {
      cells[position].classList.remove(drumstickClassOdd)
    }
  }

  // CALLING THE FUNCTIONS
  createGrid(ninjaPosition) // To create the Gameplay Area

  // removeDrumstick(drumstickPosition)

  // EVENTS

  document.addEventListener('keydown', moveNinja)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be taken out before submitting project
// ! Important note
// ? Can also use this colour for something