/* 
  I am following the conventions present in validatorjs project. Fully mimicing the project would be hard and
  also time consuming, so I dug into the source code of earlier versions to be able to make a simple 
  implementation of it.

  Note that this FormValidator is not required at all, but instead I wanted to try creating a FormValidator.

  Link to the github repo: 
  https://github.com/mikeerickson/validatorjs
*/

export class FormValidator {
  errorsCount = 0;
  data;
  rules;
  errors = {};

  constructor(data, rules) {
    this.data = data;
    this.rules = rules;
  }

  validate() {
    for (const [fieldName, fieldRules] of Object.entries(this.rules)) {
      /* 
        In order to create a generic validator, the formElementsNames should never be hardcoded.  
        But since I don't want to have long object keys to conform with the field names, and since
        I want to select the elements automatically using the dynamic queryselector below, I created
        the  formElementsNames object. 

        When we seek generic solutions, the abstraction we provide tends to add more complexity, which is
        unnecessary here.
      */
      const formElementsNames = {
        title: 'book_title',
        author: 'book_author',
        pagesNumber: 'book_pages_number',
      }
      const field = document.querySelector(`input[name=${formElementsNames[fieldName]}]`)
      /* 
        Since a checbox doesn't have a value but instead a checked property,
        we are making sure that the stored value is for a form element not a checkbox
      */
      const fieldValue = field.type !== 'checkbox' && field.value

      const fieldIsRequiredButHasNoValue = fieldRules.required && !fieldValue

      if(fieldIsRequiredButHasNoValue) {
        this.errors[fieldName] = `${fieldName} is required`
      }
      
      if(fieldRules.min !== undefined) {
        const isValueLessThanTheMinimumNumberSpecified = Number(fieldValue) < fieldRules.min 

        if(isValueLessThanTheMinimumNumberSpecified) {
          this.errors[fieldName] = `${fieldName} must be at least ${fieldRules.min}`
        }
      }

      if(fieldRules.max !== undefined) {
        const isValueGreaterThanTheMaximumNumberSpecified =  Number(fieldValue) > fieldRules.max

        if(isValueGreaterThanTheMaximumNumberSpecified) {
        this.errors[fieldName] = `${fieldName} must be at most ${fieldRules.min}`
        }
      }
    }
  }
  get errorCount() {
    /* 
      Here I count the fields that contain errors. If a field has more than one error, 
      which is not possible with our implementation since the methods are implemented to expect one error 
      for each field, the implementation would differ from the one done here and it would dig more in 
      validatorjs to see how they implement it.

      I think they increment errorCount on each encountered error (but I am not sure).
    */
    return Object.keys(this.errors).length
  }
  check() {
    this.validate()
    if(Object.keys(this.errors).length > 0) {
      console.log('validation errs!');
      console.log(this.errors);
    }

    return this.errorCount === 0
  }
  fails() {
    return !this.check()
  }
  passes() {
    return this.check()
  }
}
