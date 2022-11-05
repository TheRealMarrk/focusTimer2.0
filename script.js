// Time controls and displays
const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")
const playButtton = document.querySelector(".play")
const stopButton = document.querySelector(".stop")
const timeUp = document.querySelector(".fiveMinutesMore")
const timeDown = document.querySelector(".fiveMinutesLess")
const treeClicked = document.querySelector('.clicked')
const treeUnclicked = document.querySelector('.unclicked')
let timeTimeout
const minutesOg = Number(minutesDisplay.textContent)

// Dark mode
const dark = document.querySelector(".dark")
const light = document.querySelector(".light")
const body = document.querySelector("body")

// Sounds controls 
const tree = document.querySelector(".tree")
const rain = document.querySelector(".rain")
const coffeShop = document.querySelector(".coffeShop")
const fireplace = document.querySelector(".fireplace")
const vol = document.querySelector('input')

const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
const floresta = new Audio("./sounds/Floresta.wav")
const chuva = new Audio("./sounds/Chuva.wav")
const cafeteria = new Audio("./sounds/Cafeteria.wav")
const lareira = new Audio("./sounds/Lareira.wav")
const volumeFlorest = document.querySelector('#volume-florest')
const volumeRain = document.querySelector('#volume-rain')
const volumeCoffeShop = document.querySelector('#volume-coffeShop')
const volumeFireplace = document.querySelector('#volume-fireplace')

function florestSound() {
  floresta.loop = true

  floresta.play()
  chuva.pause()
  cafeteria.pause()
  lareira.pause()
}

function rainSound() {
  chuva.loop = true

  chuva.play()
  cafeteria.pause()
  lareira.pause()
  floresta.pause()
}

function coffeShopSound() {
  cafeteria.loop = true

  cafeteria.play()
  floresta.pause()
  chuva.pause()
  lareira.pause()
}

function fireplaceSound() {
  lareira.loop = true

  lareira.play()
  floresta.pause()
  chuva.pause()
  cafeteria.pause()
}

soundStop = () => {
  lareira.pause()
  floresta.pause()
  chuva.pause()
  cafeteria.pause()
}

function volumeDefault() { volumeFlorest.value = 50
}


// Countdown e displays updates
function displayUpdate(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function reset() {
  displayUpdate(minutesOg, 0)
  clearTimeout(timeTimeout)
}

function countdown() {
  timeTimeout =
    setTimeout(function () {
      let minutes = Number(minutesDisplay.textContent)
      let seconds = Number(secondsDisplay.textContent)

      displayUpdate(minutes, 0)

      if (minutes <= 0 && seconds == 0) {
        reset()
        displayUpdate(minutesOg, 0)
        soundStop()
        kitchenTimer.play()
        return
      }

      if (seconds <= 0) {
        seconds = 60
        --minutes
      }

      displayUpdate(minutes, String(seconds - 1))

      countdown()
    }, 1000)
}

function pause() {
  clearTimeout(timeTimeout)
}

// Buttons for time control
playButtton.addEventListener("click", () => {
  countdown()
})

stopButton.addEventListener("click", () => {
  pause()
  displayUpdate(minutesOg, 0)
  soundStop()
})

timeUp.addEventListener("click", () => {
  if (minutesDisplay.textContent <= 55) {
    displayUpdate(
      Number(minutesDisplay.textContent) + 5,
      Number(secondsDisplay.textContent)
    )
  } else {
    displayUpdate(60, 0)
  }
})

timeDown.addEventListener("click", () => {
  if (minutesDisplay.textContent >= 5) {
    displayUpdate(
      Number(minutesDisplay.textContent) - 5,
      Number(secondsDisplay.textContent)
    )
  } else {
    displayUpdate(0, 0)
  }
})


// Sounds
tree.addEventListener("click", () => {
  florestSound()
})
rain.addEventListener("click", () => {
  rainSound()
})
coffeShop.addEventListener("click", () => {
  coffeShopSound()
})
fireplace.addEventListener("click", () => {
  fireplaceSound()
})

// dark mode buttons

dark.addEventListener("click", () => {
  dark.classList.add('hide')
  light.classList.remove('hide')
  body.classList.add("darkMode")
})

light.addEventListener("click", () => {
  light.classList.add('hide')
  dark.classList.remove('hide')
  body.classList.remove('darkMode')
})

// volumes

volumeFlorest.addEventListener("change", () => {
  floresta.volume = Number(volumeFlorest.value)/100
})
volumeRain.addEventListener("change", () => {
  chuva.volume = Number(volumeRain.value)/100
})
volumeCoffeShop.addEventListener("change", () => {
  cafeteria.volume = Number(volumeCoffeShop.value)/100
})
volumeFireplace.addEventListener("change", () => {
  lareira.volume = Number(volumeFireplace.value)/100
})