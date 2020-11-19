function init() {
  // VARIABLES


  // ELEMENTS
  const grid = document.querySelector('.grid')
  
  const width = 20
  const cellCount = width * width
  const cells = []

  const ninjaClass = 'ninja'
  let ninjaPosition = 0

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
  
  
  
  // CALLING THE FUNCTIONS
  createGrid(ninjaPosition) // To create the Gameplay Area



}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be commented out before submitting project
// ! Important note
// ? Can also use this colour for something