const form = document.getElementById("form-inputs");
const concept = document.getElementById("concept");
const amount = document.getElementById("amount");
const income = document.getElementById("income");
const spend = document.getElementById("spend");
const savings = document.getElementById("savings");
const list = document.getElementById("list");

let movements = JSON.parse(localStorage.getItem('movements')) ?? [];

startApp()

form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (concept.value  === ''|| amount.value === '') {
		alert('Introduce concepto y cantidad')
	} else {const movement = {
			concept: concept.value,
			amount: amount.value,
			id: movements.length + 1,
		}

	concept.value = '';
	amount.value = '';

	movements.push(movement);

	addToList(movement);
	updateValues();
	updateLocalStorage();

	}
})

function addToList(movement) {
	const newElement = document.createElement('li')
	newElement.classList.add('income-spend')

	newElement.innerHTML = `
		${movement.concept} 
		<span>${Number(movement.amount).toFixed(2)}€
		<button class="delete-btn" onclick="deleteMovement(${movement.id})">X</button>
		</span>
	`
	list.appendChild(newElement)
}

function updateValues() {

	const amounts = movements.map(movement => Number(movement.amount))
	
	const totalIncomes = (amounts.filter(amount => amount > 0)).reduce((acc, newIncome)=> acc + newIncome, 0).toFixed(2)
	income.innerText = `${totalIncomes} €`

	const totalSpend = amounts.filter(amount => amount < 0).reduce((acc, newSpend)=> acc + newSpend, 0).toFixed(2)
	spend.innerText = `${totalSpend} €`

	const totalSavings = amounts.reduce((acc, sig)=> acc + sig, 0).toFixed(2)
	savings.innerText = `${totalSavings} €`
}

function deleteMovement(id) {
	
	movements = movements.filter(movement => id !== movement.id )
	updateLocalStorage()
	startApp()
}

function updateLocalStorage() {

	localStorage.setItem('movements', JSON.stringify(movements));	
}

function startApp() {
	list.innerHTML = ''
	movements.forEach(addToList)
	updateValues()
}