// 1.
const arr = [10, 20, 30]
const [x, y, z = 100] = arr
console.log(x, y, z)
// 2.
const obj = {
	a: 5,
	b: 10,
}
const { a: foo, b: bar = 20 } = obj
console.log(foo, bar)

// 3.
let user = {
	id: 42,
	profile: {
		name: 'Omar',
		contacts: [
			{ type: 'email', value: 'omar@mail.com' },
			{ type: 'phone', value: '123456' },
		],
	},
}

const {
	profile: {
		name,
		contacts: [{ value: email }, { value: phone }],
	},
} = user
console.log(name, email, phone)

console.log('======')
// 4. 
const myobj = {foo: 1}
const myobjCopy = myobj
myobjCopy.foo = 2
console.log(myobj.foo) // 2 . Same reference

console.log('======')
// 5. 
const obj1 = {pudding: 'chocolate'}
const obj2 = Object.assign({}, obj1)
obj2.pudding = 'vanilla'
console.log(obj1.pudding) // chocolate
console.log('======')

// 6. structuredClone
const clone = structuredClone(obj1)
clone.pudding = 'banana'
console.log(clone)
console.log(obj1) // not affected
console.log('======')

// 7. 
const [a, b, c, d = 'not provided'] = [undefined, 2, 3]
console.log(a, b, c, d)
console.log('======')

// 8. clone using spread
const clonedWithSpread = {
  ...user,
  id: 12
}
console.log(clonedWithSpread.id) // 12
console.log(user.id) // unchanged
console.log('======')

// 9. 
function compareByReference(obj1, obj2) {
  return obj1 === obj2
}
console.log(compareByReference(obj1, obj2)) // false
console.log(compareByReference(myobj, myobjCopy)) // true
console.log('======')

// 10. 
const mangoObj = JSON.parse(JSON.stringify(obj1))
mangoObj.pudding = 'mango'
console.log(mangoObj) 
console.log(obj1) // unchanged
console.log('======')

// 11. structuredClone with circular reference
const deepCloneWithCircularReference = structuredClone(myobjCopy)
deepCloneWithCircularReference.foo = 'watermelon'
console.log(deepCloneWithCircularReference)
console.log(myobjCopy) // unaffected
console.log('======')

// 12. 
const canBeModified = {hello: 'world'}
canBeModified.newproperty = 'hi there'
// canBeModified = {foo: 'bar'} // error

// 13. 
const uniqueSymbol = Symbol('my nice key')
const objHavingASymbol = {
  [uniqueSymbol]: 'hola'
}
console.log(objHavingASymbol[uniqueSymbol])
console.log(Object.keys(objHavingASymbol)) // []
console.log('======')

// 14. 
const symbol1 = Symbol.for('mykey')
const symbol2 = Symbol.for('mykey')
console.log(symbol1 === symbol2)
console.log('======')

// 15. 
const nested = {
  a: 1,
  otherProps: {
    b: 2
  }
}
console.log(nested.otherProps?.b) // 2
console.log('======')

// 16. boring
// 17. generator
function* myGenerator() {
  yield 1;
  yield 2
}
const it = myGenerator()
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log('======')

// 18. 
function* generatorWillThrowAnError() {
  return 'hi string!'
}
const it2 = generatorWillThrowAnError()
console.log(it2.next())
// console.log(it2.throw(new Error("err!!!!")))
console.log('======')

// 19. 
function* generatorEndingEarly() {
  yield 1;
  yield 2;
  // I will return before reaching it
  yield 3;
}
const it3 = generatorEndingEarly()
console.log(it3.next())
console.log(it3.next())
console.log(it3.return('early return!'))
