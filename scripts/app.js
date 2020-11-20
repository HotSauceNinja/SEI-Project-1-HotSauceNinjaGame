function init() {
  // VARIABLES


  // ELEMENTS
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []

  const ninjaClass = 'ninja'
  let ninjaPosition = 94

  
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
    console.log({ ninjaPosition })
  }

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
    removeNinja(ninjaPosition)

    switch (event.keyCode) {
      case 37: // left with left arrow
        ninjaPosition--
        addNinja(ninjaPosition)
        break
      case 65: // left with a key
        ninjaPosition--
        addNinja(ninjaPosition)
        break
      case 39: // right with right arrow
        ninjaPosition++
        addNinja(ninjaPosition)
        break
      case 68: // right with d key
        ninjaPosition++
        addNinja(ninjaPosition)
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
  }

  // CALLING THE FUNCTIONS
  createGrid(ninjaPosition) // To create the Gameplay Area

  // EVENTS

  document.addEventListener('keydown', moveNinja)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be commented out before submitting project
// ! Important note
// ? Can also use this colour for something