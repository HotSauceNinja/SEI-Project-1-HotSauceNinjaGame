function init() {
  // todo ===================================VARIABLES===================================
  const foods = ['pizza', 'fries', 'egg', 'drumstick']  
  
  // todo ELEMENTS
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
  // const forkClass = 'fork'

  // Establish number of foods per row and their start position
  const numberOfFoodsPerRow = gridWidth - Math.floor(gridWidth / 2.5)
  const foodStartPositionOnRow = (gridWidth - numberOfFoodsPerRow) / 2

  // Establish the position a food item must reach to trigger game over 
  const gameOverPosition = (gridLength - 2) * gridWidth

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

    // ! Bit below might be useful but not using for now
    // // using math random generate random forks 
    // // random number 
    // const foodsObjectArrayNumber = Math.ceil(Math.random() * (foodsObjectArray.length - 1))
    // console.log({ foodsObjectArrayNumber })

    // const positionOnGridNumber = Math.floor(Math.random() * foodsObjectArray[foodsObjectArrayNumber].positionOnGrid.length)
    // console.log({ positionOnGridNumber })

    // const randomShot = foodsObjectArray[foodsObjectArrayNumber].positionOnGrid[positionOnGridNumber]

    // console.log({ randomShot })
    // shootFork(randomShot + (gridWidth * foodsObjectArrayNumber))
    // ! bit ends here
  }

  // Check if item is at the end of the grid
  function checkIfEndOfRow(position) {
    const horizontalPosition = position % gridWidth

    // if item is at right end of row
    if (horizontalPosition === gridWidth - 1) {
      console.log('right end')
      return true

    // if item is at left end of row
    } else if (horizontalPosition % 10 === 0) {
      console.log('left end')
      return true
    }

    return false
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
        console.log('Hot Sauce enter!')
        addHotSauce(ninjaPosition)
        addNinjaAfterThrow(ninjaPosition)
        break
      case 32: // Shoot with space key
        console.log('Hot Sauce space!')
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
    
    if (position >= 0) {
      cells[position].classList.add(hotsauceClass)
      removeHotSauce(position + gridWidth)
    } else {
      cells[position + gridWidth].classList.add(hotsauceClass)
      // removeHotSauce(position + gridWidth)
    }
    
  }

  function addHotSauce(position) {
    // when player presses key put the image of hot sauce on position above player
    cells[position - gridWidth].classList.add(hotsauceClass)
    removeHotSauce(position)
  
    //put timer so that bottle keeps going up 
    counter(position)
  }
  
  function counter (hotsaucePosition) {
    let count = 0
    const timerIdOne = window.setInterval(() => {
      // repeat bottle movement and increase count each time
      hotsaucePosition = hotsaucePosition - gridWidth
      moveHotSauce(hotsaucePosition) 

      //if hotsaucePosition includes foodsClass
      if (cells[hotsaucePosition].classList.contains('foodsClass')) {

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

        // the remove both food item and bottle from the grid 
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

  // todo HOT SAUCE BOTTLE HITS FOOD

  // if hot sauce bottle hits food, 
  // remove food and hotsauce classes
  // make food element falsy and make it not show up on grid 
  // replace them with a boom class on a 1 second counter
  // increase score with 100


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

  // ! HERE DOWN - shoot forks function - to do after having sucesfully shot ships
  // function shootFork (position) {
  //   console.log({ forkClass })
  //   cells[position].classList.add(forkClass)
  // }
  // shootFork()
  // ! HERE UP

  // todo FOODS MOVEMENT SECTION
  // move foods to the right
  
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
  // move foods to the left
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
  // move foods to down
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
  // when element reaches gameOverPosition (row before last), end game // todo I don't think this function is working
  function stopMoving() { 
    // if any index number >= gameOverPosition stop movement and pop item out of array
    for (let i = 1; i < foodsObjectArray.length; i++) {
      for (let j = 0; j < foodsObjectArray[i].positionOnGrid.length; j++) {       
        if (foodsObjectArray[i].positionOnGrid[j] >= gameOverPosition) {
          console.log('STOP') // todo replace with calling function to pop element out
          foodsObjectArray[i].positionOnGrid.pop(foodsObjectArray[i].positionOnGrid[j])
        }
      }
    } 
  }

  //todo ===================================TIMERS===================================
  // ? Do I put timeouts below in the createGrid function?

  function foodsBlockMovement() {
    let trackTime = 0

    // let min = foodsObjectArray[foodsObjectArray.length - 1].positionOnGrid[0]
    // let max = foodsObjectArray[foodsObjectArray.length - 1].positionOnGrid[0]

    // let newArray = foodsObjectArray[foodsObjectArray.length - 1].positionOnGrid

    for (let i = 1; i < foodsObjectArray.length; i++) {
      console.log(foodsObjectArray[i].positionOnGrid[0])
    }

      // for (let i = 0; i < duplicateArray.length - 1; i++) {
      //   duplicateArray[i] = duplicateArray[i] % 10
      // }      
      // let duplicateArray = item.positionOnGrid.forEach(element => {
      //   element = element % gridWidth        
      // })

      // console.log({ duplicateArray })
      // minValue = Math.min(duplicateArray)
      // maxValue = Math.max(duplicateArray) 

      // if (minValue < min) {
      //   min = minValue
      // } else if (maxValue > max) {
      //   max = maxValue
      // }
    // })
  }

  foodsBlockMovement()

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

  // set timeout move four right
  setTimeout(foodsMoveOneRight, 9000)
  setTimeout(foodsMoveOneRight, 10000)
  setTimeout(foodsMoveOneRight, 11000)
  setTimeout(foodsMoveOneRight, 12000)

  // set timeout move one down
  setTimeout(foodsMoveOneDown, 13000)

  // set timeout move four left
  setTimeout(foodsMoveOneLeft, 14000)
  setTimeout(foodsMoveOneLeft, 15000)
  setTimeout(foodsMoveOneLeft, 16000)
  setTimeout(foodsMoveOneLeft, 17000)

  // set timeout move one down
  setTimeout(foodsMoveOneDown, 18000)

  // set timeout move four right
  setTimeout(foodsMoveOneRight, 19000)
  setTimeout(foodsMoveOneRight, 20000)
  setTimeout(foodsMoveOneRight, 21000)
  setTimeout(foodsMoveOneRight, 22000)

  // set timeout move one down
  setTimeout(foodsMoveOneDown, 23000)

  // set timeout move four left
  setTimeout(foodsMoveOneLeft, 24000)
  setTimeout(foodsMoveOneLeft, 25000)
  setTimeout(foodsMoveOneLeft, 26000)
  setTimeout(foodsMoveOneLeft, 27000)

  stopMoving() // I don't think this function is working ...

  // const timerId = setInterval(() => {
  //   //   console.log('do action every second', i)
  // }, 100)

  // setTimeout(() => {
  //   clearInterval(timerId)
  // }, 9000) // stop after 5 seconds
  

  // todo =================================CALLING THE FUNCTIONS=================================
  createGrid(ninjaPosition) // To create the Gameplay Area


  // todo ===================================EVENTS===================================

  document.addEventListener('keydown', moveNinja)
  // document.addEventListener('keyup', throwHotSauce)

}

window.addEventListener('DOMContentLoaded', init)

// Explaining what following code does
// todo Developer notes, code to be taken out before submitting project
// ! Important note, remember to take this out
// ? Can also use this colour for something