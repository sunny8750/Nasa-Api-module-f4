
//alert("hii")

let API_KEY = 'id8gF6azl8pNb6aTNROIUxgbUzHJg5vaV25fofAD';

function getCurrentImageOfTheDay() {
	let today = new Date().toISOString().slice(0, 10); // get today's date in yyyy-mm-dd format
	fetch(`https://api.nasa.gov/planetary/apod?date=${today}&api_key=${API_KEY}`)
		.then(response => response.json())
		.then(data => {
			let imageContainer = document.getElementById('current-image-container');
			imageContainer.innerHTML = `<h2>picture of the day :-${ today }</h2><img src="${data.url}"><br><h3><b>${data.title}</b></h3><p>${data.explanation}</p>`;
		})
		.catch(error => console.error(error));
}

function getImageOfTheDay(date) {
	fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
		.then(response => response.json())
		.then(data => {
			let imageContainer = document.getElementById('current-image-container');
			imageContainer.innerHTML = `<h2>picture of the day :-${ date }</h2><img src="${data.url}"><br> <h3><b>${data.title}</b></h3><p>${data.explanation}</p>`;
			saveSearch(date);
			addSearchToHistory();
		})
		.catch(error => console.error(error));
}

function saveSearch(date) {
	let searches = JSON.parse(localStorage.getItem('searches')) || [];
	searches.push(date);
	localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
	let searchHistory = document.getElementById('search-history');
	let searches = JSON.parse(localStorage.getItem('searches')) || [];
	searchHistory.innerHTML = '';
	searches.forEach(search => {
		let listItem = document.createElement('li');
		listItem.textContent = search;
		listItem.addEventListener('click', () => {
			getImageOfTheDay(search);
		});
		searchHistory.appendChild(listItem);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	getCurrentImageOfTheDay();
	addSearchToHistory();

	let searchForm = document.getElementById('search-form');
	searchForm.addEventListener('submit', event => {
		event.preventDefault();
		let searchInput = document.getElementById('search-input');
		getImageOfTheDay(searchInput.value);
		searchInput.value = '';
	});
});
