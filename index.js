const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge & rockRightEdge > dodgerLeftEdge ) ||
       (rockLeftEdge >= dodgerLeftEdge & rockRightEdge <= dodgerRightEdge) ||
       (rockLeftEdge < dodgerRightEdge & rockRightEdge > dodgerRightEdge))
          {
            //console.log(`dodger: ${dodgerLeftEdge} - ${dodgerRightEdge}`)
            //console.log(`rock: ${rockLeftEdge} - ${rockRightEdge}`)
            return true }
    else  {
      if (top === 400) {
            //console.log(`rock: ${rockLeftEdge} - ${rockRightEdge} top: ${top}`)
            //console.log(GAME.removeChild(rock))
            //console.log('one')
            //console.log(document.getElementsByClassName('rock').remove)
            //console.log('two')
            //console.log(document.getElementsByClassName('rock'))
            //GAME.removeChild(rock)
            //ROCKS.pop()
            //console.log(document.querySelector(`style=[left\: ${rockLeftEdge}px]`))
            //console.log(document.querySelector(`[attribute~=left: ${rockLeftEdge}px]`))
            console.log('remove:')
            console.log(document.querySelector('.rock'))
            //console.log(document.querySelector('.rock').remove())
            document.querySelector('.rock').remove()
            ROCKS.pop(rock)
            return false
      }
    }
  } //if (top > 360)
  else {
    return false
  }
} //function checkCollision

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  //GAME.appendChild(rock)
  console.log('append:')
  console.log(GAME.appendChild(rock))
  //GAME.appendChild(rock)
  //console.log(`rock: ${rock}`)
  moveRock()
  var topNumbers = rock.style.top.replace('px', '')

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  var lgth = ROCKS.length
  //console.log('ROCKS.push')
  //console.log(ROCKS[lgth - 1])
  return rock

  function moveRock() {
    rock.style.top = `${top += 2}px`
    if (ROCKS.length != 0) {
      if (checkCollision(rock)) {
        endGame()
        return
      }
      else {
        if (topNumbers < 400) {
          window.requestAnimationFrame(moveRock)
        }
        else {
          //console.log('this never executes 2')
          //GAME.removeChild(rock)
          var clRock = document.getElementsByClassName('rock')
          //while(clRock[0]) {
            //if (clRock[0] === null) {
              //console.log('should never hit this code')
            //}
            //else {
              //console.log(clRock[0])
              //**clRock[0].parentNode.removeChild(clRock[0])
              //console.log(clRock[0])
            //}
          //}
        }
      }
    }
  }
}

function endGame() {
  //gameInterval = clearInterval(gameInterval)
  //gameInterval = clearInterval(createRock)
  clearInterval(gameInterval)

  while (ROCKS.length > 0) {
    ROCKS.pop()
  }

/*  var clRock = document.getElementsByClassName('rock')

  while(clRock[0]) {
    if (clRock[0] === null) {
      console.log('should never hit this code')
    }
    else {
      //console.log(clRock[0])
      //console.log(clRock[0].parentNode.removeChild(clRock[0]))
      clRock[0].parentNode.removeChild(clRock[0])
      //console.log(clRock[0])
    }
  }
*/
//  console.log('remove rocks:')
  //while (document.querySelector('.rock')) {
    //console.log(document.querySelector('.rock'))
    //document.querySelector('.rock').remove()
  //}

//  while(clRock[0]) {
//      console.log(clRock[0].parentNode.removeChild(clRock[0]))
//  }

  window.removeEventListener('keydown', moveDodger)
  //alert('YOU LOSE!')
  console.log('you lose')
  //done()
  //document.location.reload()
}

function moveDodger(e) {
     if (e.which === LEFT_ARROW) {
       moveDodgerLeft()
       e.preventDefault()
       e.stopPropagation()
     }
     else if (e.which === RIGHT_ARROW) {
       moveDodgerRight()
       e.preventDefault()
       e.stopPropagation()
     }
}

function moveDodgerLeft() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)

   function stepL() {
     DODGER.style.left = `${left -= 9}px`
   }
   if (left > 0){
     window.requestAnimationFrame(stepL)
   }
 }

function moveDodgerRight() {
   var rightNumbers = DODGER.style.left.replace('px', '')
   var right = parseInt(rightNumbers, 10)

   function stepR() {
     DODGER.style.left = `${right += 9}px`
   }
   if (right < 360){
     window.requestAnimationFrame(stepR)
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger, true)

  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
