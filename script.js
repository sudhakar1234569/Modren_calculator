class Calculator{
    constructor(previousButton,currentButton){
            this.previousButton = previousButton
            this.currentButton  = currentButton
            this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){ 
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
       if(number === '.' && this.currentOperand.includes('.')) return
       this.currentOperand = this.currentOperand.toString() + number.toString()
       
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
       this.operation = operation
       this.previousOperand = this.currentOperand
       this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand =''
    }
    getDisplayNumber(number){
         const stringNumber = number.toString()
         const integerDigits = parseFloat(stringNumber.split('.')[0])
         const decimalDigits = stringNumber.split('.')[1]
         const floatNumber = parseFloat(number)
         if(isNaN(floatNumber)) return ''
         return floatNumber.toLocaleString('en')
    }
    updateDisplay(){
      
       this.currentButton.innerText = this.getDisplayNumber(this.currentOperand)
       if(this.operation != null){
        this.previousButton.innerText = this.previousOperand
       }
       else{
        this.previousButton.innerText =''
       }
      

        
    }
}




const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')

const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousButton = document.querySelector('[data-previous-operand]')
const currentButton = document.querySelector('[data-current-operand]')

const calculator  = new Calculator(previousButton,currentButton)

numberButton.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})