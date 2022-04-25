const submitFormOperation = document.querySelector('.form__create_localItem')
const submitFormIncome = document.querySelector('.form__create_Localincome')
const listItems = document.querySelector('.history__list')
const incomeInner = document.querySelector('.income')
const expensesInner = document.querySelector('.expenses')
const totalAmountInner = document.querySelector('.app__total_heading')
let deleteBtns = Array.from(
  document.querySelectorAll('.history__list-item_delete')
)
let createItemName = ''
let createItemSum = 0
let createIncomeSum = 0
let incomeSum = 0
let expensesSum = 0
let totalAmount = 0
let listExpenses = []
const generatorId = () => {
  let resId = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++) {
    resId += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return resId
}

submitFormOperation.localItem_name.addEventListener('input', (event) => {
  // createItemName.push(event.data)
  event.target.style.border = ''
  createItemName = event.target.value
})
submitFormOperation.localItem_sum.addEventListener('input', (event) => {
  // createItemSum.push(event.data)
  event.target.style.border = ''
  createItemSum = event.target.value
})
submitFormIncome.localIncome.addEventListener('input', (event) => {
  event.target.style.border = ''
  createIncomeSum = event.target.value
})

submitFormOperation.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.localName === 'button') {
    if (createItemName !== '' && createItemSum !== 0) {
      if (localStorage.getItem('calc') !== null) {
        listExpenses.push({
          id: generatorId(),
          name: createItemName,
          amount: createItemSum,
        })
        localStorage.setItem('calc', JSON.stringify(listExpenses))
      } else {
        localStorage.setItem(
          'calc',
          JSON.stringify([
            {
              id: generatorId(),
              name: createItemName,
              amount: createItemSum,
            },
          ])
        )
      }
      createItemName = ''
      createItemSum = 0
      submitFormOperation.localItem_name.value = ''
      submitFormOperation.localItem_sum.value = 0
      listExpenses = JSON.parse(localStorage.getItem('calc'))
      listItems.innerHTML = ''
      listExpenses.forEach((item) => {
        let createLi = document.createElement('li')
        createLi.className = 'history__list-item'
        createLi.innerHTML = `<span>${item.name}</span> <span>${item.amount}</span>
        <div class="history__list-item_delete">x</div>`
        listItems.append(createLi)
      })
      listExpenses.forEach((item) => {
        expensesSum += Number(item.amount)
      })
      expensesInner.childNodes[1].innerHTML = `${expensesSum} ₽`
      deleteBtns = Array.from(
        document.querySelectorAll('.history__list-item_delete')
      )
      totalAmount = incomeSum - expensesSum
      totalAmountInner.childNodes[3].innerHTML = `${totalAmount} ₽`
    } else {
      submitFormOperation.localItem_name.style.border = '2px solid red'
      submitFormOperation.localItem_sum.style.border = '2px solid red'
    }
  }
})
submitFormIncome.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.className === 'btn_create__income') {
    if (createIncomeSum !== 0) {
      localStorage.setItem('income', JSON.stringify(createIncomeSum))
      createIncomeSum = 0
      submitFormIncome.localIncome.value = 0
      incomeSum = Number(JSON.parse(localStorage.getItem('income')))
      incomeInner.childNodes[1].innerHTML = `${incomeSum} ₽`
      totalAmount = incomeSum - expensesSum
      totalAmountInner.childNodes[3].innerHTML = `${totalAmount} ₽`
    } else {
      submitFormIncome.localIncome.style.border = '2px solid red'
    }
  }
})

const startedApp = () => {
  if (localStorage.getItem('calc') !== null) {
    listExpenses = JSON.parse(localStorage.getItem('calc'))
    listExpenses.forEach((item) => {
      let createLi = document.createElement('li')
      createLi.className = 'history__list-item'
      createLi.innerHTML = `<span>${item.name}</span> <span>${item.amount}</span>
      <div class="history__list-item_delete">x</div>`
      listItems.append(createLi)
    })
    console.log(listExpenses)
    listExpenses.forEach((item, index) => {
      expensesSum += Number(item.amount)
    })
    expensesInner.childNodes[1].innerHTML = `${expensesSum} ₽`
    deleteBtns = Array.from(
      document.querySelectorAll('.history__list-item_delete')
    )
  } else {
  }
  if (localStorage.getItem('income') !== null) {
    incomeSum = Number(JSON.parse(localStorage.getItem('income')))
    incomeInner.childNodes[1].innerHTML = `${incomeSum} ₽`
  } else {
  }
  totalAmount = incomeSum - expensesSum
  totalAmountInner.childNodes[3].innerHTML = `${totalAmount} ₽`
}
startedApp()
window.addEventListener('click', () => {
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
      listExpenses = listExpenses.filter((item, i) => i !== index)
      localStorage.setItem('calc', JSON.stringify(listExpenses))
      listExpenses = JSON.parse(localStorage.getItem('calc'))
      listItems.innerHTML = ''
      listExpenses.forEach((item) => {
        let createLi = document.createElement('li')
        createLi.className = 'history__list-item'
        createLi.innerHTML = `<span>${item.name}</span> <span>${item.amount}</span>
        <div class="history__list-item_delete">x</div>`
        listItems.append(createLi)
      })
      expensesSum = 0
      listExpenses.forEach((item, index) => {
        expensesSum += item.amount
      })
      expensesInner.childNodes[1].innerHTML = `${expensesSum} ₽`
      deleteBtns = Array.from(
        document.querySelectorAll('.history__list-item_delete')
      )
      totalAmount = incomeSum - expensesSum
      totalAmountInner.childNodes[3].innerHTML = `${totalAmount} ₽`
    })
  })
})
