function createUserProfile(user) {
	const { name = 'Anonymous', preferences = {} } = user
	const { theme = 'light' } = preferences
	return `Hello ${name}! Your theme is ${theme}.`
}
// Example Usage:
const user1 = { name: 'Ahmed', preferences: { theme: 'dark' } }
const user2 = { name: 'Salma' }
const user3 = {}
console.log(createUserProfile(user1))
console.log(createUserProfile(user2))
console.log('hi')
console.log(createUserProfile(user3))

console.log('======')
// Task 2

// Part 1 : Unique rules
const userRoles = ['admin', 'editor', 'viewer', 'editor', 'admin']
function getUniqueRules() {
	const uniqueRoles = new Set(userRoles)
	// The task requires returning an array
	// And since this is an ES6 assignment, it makes sense to use Set()
	return [...uniqueRoles]
}
console.log(getUniqueRules(userRoles))
console.log('=====')

// Part 2: User Database
const users = [
	{ id: 'u1', name: 'Nour', email: 'nour@example.com' },
	{ id: 'u2', name: 'Karim', email: 'karim@example.com' },
]
const usersMap = new Map() // Your code here
users.forEach((user) => usersMap.set(user.id, user))
function findByUserId(id) {
	return usersMap.get(id)
}
console.log(findByUserId('u2')) // { id: 'u2', name: 'Karim', email: ,→ 'karim@example.com' }

// Task 3: Safely Update Configuration

const originalConfig = {
	user: 'Admin',
	settings: {
		theme: 'dark',
		notifications: { email: true },
	},
}
function updateTheme(config, newTheme) {
	return {
		...config,
		settings: {
			// You SHOULD spread the old settings to avoid overriding it
			...config.settings,
			theme: newTheme,
		},
	}
}
const newConfig = updateTheme(originalConfig, 'light')
// console.log(newConfig)
// Verification:
console.log('New Config Theme:', newConfig.settings.theme) // light
console.log('Original Config Theme:', originalConfig.settings.theme) // dark

// Task 4: Destructuring
const data = {
	id: 1,
	user: {
		name: 'Ali',
		address: {
			city: 'Cairo',
			postal: '12345',
		},
	},
	items: [
		{ id: 'i1', name: 'Item 1', price: 100 },
		{ id: 'i2', name: 'Item 2', price: 200 },
	],
}
function processData(data) {
	const {
		user: {
			name,
			address: { city, postal = '00000' },
		},
		items: [{ name: itemName, price }, { price: secondItemPrice = 0 }],
	} = data
	console.log(itemName, price)
	return `Username ${name}, 
  You live in ${city},
  1st item name is ${itemName},
  1st item price is ${price},
  postal code is ${postal}
  2nd item price is ${secondItemPrice}
  `
}
console.log(processData(data))
