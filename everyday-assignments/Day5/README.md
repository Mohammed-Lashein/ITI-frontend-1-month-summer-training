# JS assignments 1st bundle

### Regarding `handleUserAge`
Given the `handleUserAge` function: 
```js
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

		switch (ageInNumber) {
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
	}
}
ageModal.addEventListener('click', handleUserAge)
```
On entering a correct number, the default case is the one getting executed. What is going on?  
After asking claude, he told me that my `switch` statement has a problem:  
The `switch` statement is passed a number, while each `case` that checks against `ageInNumber` return `true`. And `true` will never be equal to a number, that's why the `default` case is always running regardless of any number I enter.   
What is the solution then?  
```js
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
    // change ageInNumber to true
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
	}
}

ageModal.addEventListener('click', handleUserAge)
```