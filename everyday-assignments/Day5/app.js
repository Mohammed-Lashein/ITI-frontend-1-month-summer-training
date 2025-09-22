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
