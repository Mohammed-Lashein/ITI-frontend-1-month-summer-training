// Assignment 1
const showMyNameBtn = document.querySelector('.show-my-name')
function showMyName() {
	alert('My name is Mohammed')
}
showMyNameBtn.addEventListener('click', showMyName)
// =======
var var1 = 'str'
console.log(var1)
var1 = 2
console.log(var1)
// ====
function sum(a, b) {
	return a + b
}
console.log(sum(2, 1))
// =====
const mynum = 12
const isPositive = mynum > 0
const isNegative = mynum < 0
const equalsZero = mynum === 0

if (isPositive) {
	// do some colculations
} else if (isNegative) {
	// do some  other colculations
} else {
	// it is zero!
}

// =====
for (let i = 1; i <= 10; i++) {
	console.log(i)
}
// =====
const myColor = 'red'
switch (myColor) {
	case 'red':
		console.log('color is red')
		break
	case 'green':
		console.log('color is green')
		break
	case 'blue':
		console.log('color is blue')
		break
	default:
		console.log('color is other')
}
// ======
console.log(undefined + 1)
console.log(window.pudding) // non-existing property on window class

// Querying the DOM for a non-existing element to get null is suggested by Gemini :)
const notExistingElement = document.querySelector('.shakeAndBake')
console.log(notExistingElement)
// =====

function tryConvertingToANumber(string) {
	const numberFromStringConversion = parseInt(string)
	if (Number.isInteger(numberFromStringConversion)) {
		console.log('number to string conversion succeeded')
		console.log(numberFromStringConversion)
	}
	if (isNaN(numberFromStringConversion)) {
		console.log('number to string conversion failed')
		console.log(numberFromStringConversion)
	}
}
tryConvertingToANumber('12') // succeeds
tryConvertingToANumber('12pu') // succeeds
tryConvertingToANumber('po12') // fails
// =====
const obj = { a: 1, b: 2 }
console.log(obj.c)
// ======
function doesNotReturnAValue() {}
console.log(doesNotReturnAValue())
// ====
const anotherNum = 12

if (anotherNum > 0) {
	// it is +ve
	if (anotherNum % 2 === 0) {
		// it is also even
		console.log('the number is +ve and even')
	}
}
// ======
let accumulator = 0
for (let i = 0; i < 100; i++) {
	accumulator += i
}
console.log('accumulator now is: ', accumulator)

// Assignment 2
console.log('=======')
console.log('assignment 2 start')
console.log('=======')

// 2
const confirmModalBtn = document.querySelector('.show-confirm-modal')
function showConfirmModal() {
	const userHasConfirmed = confirm('Do you want to proceed?')
	if (userHasConfirmed) {
		alert('You chose to proceed')
	} else {
		alert('Action canceled')
	}
}
confirmModalBtn.addEventListener('click', showConfirmModal)

// 3
var num = 10
num % 2 === 0 ? console.log('hi') : console.log('hello')

// 4. User age
const ageModal = document.querySelector('.show-age-modal')
function handleUserAge() {
	while (true) {
		const age = prompt('Enter your age')

    if(age === null) {
      // The user pressed cancel
      break
    }

		const ageInNumber = parseInt(age)

		if (isNaN(ageInNumber)) {
			alert('Please enter a valid age')
			continue // if not valid, don't break and re-prompt (continue will reshow the prompt)
		}
		if (ageInNumber < 1) {
			alert('Age must be greater than 1')
			continue
		}

		switch (true) {
			case (ageInNumber > 1 && ageInNumber <= 10):
				console.log('child')
				break
      case ageInNumber >= 11 && ageInNumber <= 18:
        console.log('teenager')
        break
      case ageInNumber >= 18 && ageInNumber <= 50:
        console.log('Grown up')
        break
      case ageInNumber >= 50 && ageInNumber <= 100:
        console.log('Old')
        break
      default: 
      console.log('wrong age value')
      break
		}
    /* 
      If we reached here, then the user has entered a correct age value,
      then break from the while loop
    */
    break 
	}
}

ageModal.addEventListener('click', handleUserAge)

// 5. Count the number of vowels
console.log('Count the number of vowels')
function countVowels(word) {
  let vowelsCount = 0
  const vowels = 'aeiou'
  const lowercasedWord = word.toLowerCase()
  for(let i = 0; i < lowercasedWord.length; i++) {
    if(vowels.includes(lowercasedWord[i])) {
      vowelsCount++
    }
  }
  return vowelsCount
}
// 6. 24 to 12 hour format . With claude help
function convertTo12HourFormat(hour) {
  if(isNaN(hour)) {
    // the user pressed cancel, so hour = null
    // but we immediately used parseInt(), so parseInt(null) will return NaN
    return
  }
  if(hour < 0 || hour > 23) {
    throw new Error("Hour must be between 0 and 23")
  }
  let hourIn12HourFormat
  let period = "AM"

  if(hour === 0) {
    // midnight
    hourIn12HourFormat = 12
  }
  if(hour > 0 && hour < 12) {
    // between 1 AM and 11 AM
    hourIn12HourFormat = hour
  }
  if(hour === 12) {
    // noon time
    hourIn12HourFormat = 12
    period = "PM"
  }
  if(hour > 12) {
    // afternoon
    hourIn12HourFormat = hour - 12
    period = "PM"
  }

  return `${hourIn12HourFormat} ${period}`
}
function showHourConversionModal() {
const hour =  parseInt(prompt("Enter the hour you want to convert"))
console.log(convertTo12HourFormat(hour))
}
const timeConverterBtn = document.querySelector(".time-converter")
timeConverterBtn.addEventListener('click', showHourConversionModal)
// console.log(convertTo12HourFormat(hour))

// 7. 
function upperCaseFirstLetter(string) {
  let firstLetterUppercased = string[0].toUpperCase()
  let stringWithFirstLetterUppercased = firstLetterUppercased + string.slice(1)
  return stringWithFirstLetterUppercased
}
// 8. Favorite color 
const favoriteColorModalBtn = document.querySelector('.favorite-color')
favoriteColorModalBtn.addEventListener('click', showFavoriteColorModal)
function showFavoriteColorModal() {
  while(true) {
    // prompt the user to type their favorite color
    const favColor = prompt('Type your favorite color')
    // get that fav color and ask it in a confirm
    const confirmChoice = confirm("Do you confirm your choice: " + favColor + "?")
    // if the user confirmed, alert the chosen color
    if(confirmChoice) {
      alert("Your chosen fav color is: " + favColor)
      break
    } else {
      console.log("Let's try again")
      continue
    }
    // if cancelled, display let's try again (maybe the loop trick will be used again)
  }
}

// 9. Prompt the user to enter a password
const passwordPromptBtn = document.querySelector('.show-password-prompt')
function showPasswordPrompt() {
  while(true) {
    const password = prompt("Enter your password: ")
    if(password) {
      console.log("Thanks for entering your password")
      break
    } else {
      continue
    }
  }
} 
passwordPromptBtn.addEventListener('click', showPasswordPrompt)

// 10. date comparison. With Claude help
const firstDate = new Date('2024-05-05').getTime()
const secondDate = new Date('2025-05-05').getTime()

console.log(secondDate > firstDate)

// 11. calc number of days between two given dates
function calculateDaysBetween(earlierDate, latterDate) {
  // declare the dates
  // get their timestamps
  const timestamp1 = earlierDate.getTime()
  const timestamp2 = latterDate.getTime()

  // calculate the difference between timestamps
  const timestampsDifference = timestamp2 - timestamp1
  // calculate amount of ms in a day
  const millisecondsInADay = 24 * 60 * 60 * 1000
  // 24hrs in a day * 60mins in an hour * 60seconds in a minute * 1000 milliseconds in a second

  // Last step, divide the timestamps difference by the amount of ms in a day
  const daysInBetween = Math.floor(timestampsDifference / millisecondsInADay)
  return daysInBetween
}
// console.log(calculateDaysBetween(new Date('2024-05-05'), new Date('2024-05-06')))

// 12. calculateSumOfEvenNumbersBetween(min, max)
function calculateSumOfEvenNumbersBetween(min, max) {
  let sumOfEvenNumbers = 0
  for(let i = min; i < max; i++) {
    if(i % 2 === 0) {
      // even number
      sumOfEvenNumbers += i 
    }
  }
  return sumOfEvenNumbers
}
// console.log(calculateSumOfEvenNumbersBetween(1, 5)) // 6

// 13. extract "World"
console.log("Hello World!".slice(6, 11))

// 14. round number
console.log(Math.round(5.678))

// 15. Divisible by both 3 and 5 
function isDivisibleByBoth3And5(number) {
  if(number % 3 === 0 && number % 5 === 0) {
    return true
  } else {
    return false
  }
}
// console.log(isDivisibleByBoth3And5(30)) // true
// console.log(isDivisibleByBoth3And5(15)) // true
// console.log(isDivisibleByBoth3And5(12)) // false
