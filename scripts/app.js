function init() {

  // VARIABLES
  const grid = document.querySelector('.grid')
  
  const width = 20
  const cellCount = width * width
  const cells = []

  // FUNCTIONS

  // Creating the Gameplay Area
  function createGrid() {
    // Creating the cells and adding them on the board
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('class', 'grid-div') // setting class to each cell -> space them out evenly & highlight borders
      cell.textContent = i // todo To count the cells for easier navigation during game development
      grid.appendChild(cell) // placing cell on grid
      cells.push(cell) // pushing each cell into the cells array
    }
  }

  
  
  
  // CALLING THE FUNCTIONS
  createGrid() // To create the Gameplay Area




}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be commented out before submitting project
// ! Important note
// ? Can also use this colour for something