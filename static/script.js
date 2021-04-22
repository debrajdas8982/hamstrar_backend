const display = document.querySelector('#displayData')
const fetchButton = document.querySelector('#fetchData')


fetchButton.addEventListener('click', async event=>{
	// console.log('hello')

	try {
		const response = await fetch('/hamstrar')
		const json = await response.json()

		let text = JSON.stringify(json)
		display.innerHTML = text

	} catch {
		console.log('Something went wrong');
		// Note: Don't use a vague error message like this
	}
})
