'use strict'
const gameBoard = document.querySelector('.wrapper')
let gameTiles = document.querySelectorAll('.tile')
const settingsBtn = document.querySelector('.settingsBtn')
const settings = document.querySelector('.settings')
const gameBoard1 = document.querySelector('.value1')
const gameBoard2 = document.querySelector('.value2')
const gameBoard3 = document.querySelector('.value3')
const gameBoard4 = document.querySelector('.value4')
const acceptBtn = document.querySelector('.accept button')
const randomTile = document.querySelector('.randomTile')
const sortTile = document.querySelector('.sortTile')
const error = document.querySelector('.error p')

let gameSetUp = [
	[gameTiles[0], gameTiles[1], gameTiles[2]],
	[gameTiles[3], gameTiles[4], gameTiles[5]],
	[gameTiles[6], gameTiles[7], gameTiles[8]],
]

const gameRandomValue = [
	'0px 0px',
	'-100px 0px',
	'-200px 0px',
	'0px -100px',
	'-100px -100px',
	'-200px -100px',
	'0px -200px',
	'-100px -200px',
	// '-200px -200px',
]

let uniqueRandom = []
let max = 8
let randomInterval
let protectTemp = 'false'
let chooseBoardValue = 0

const random = () => {
	const unique = Math.floor(Math.random() * max)

	if (!uniqueRandom.includes(unique)) {
		uniqueRandom.push(unique)
	}

	if (uniqueRandom.length === 8) {
		clearInterval(randomInterval)
		gameSetUp[0][0].style.backgroundPosition = gameRandomValue[uniqueRandom[0]]
		gameSetUp[0][1].style.backgroundPosition = gameRandomValue[uniqueRandom[1]]
		gameSetUp[0][2].style.backgroundPosition = gameRandomValue[uniqueRandom[2]]
		//
		gameSetUp[1][0].style.backgroundPosition = gameRandomValue[uniqueRandom[3]]
		gameSetUp[1][1].style.backgroundPosition = gameRandomValue[uniqueRandom[4]]
		gameSetUp[1][2].style.backgroundPosition = gameRandomValue[uniqueRandom[5]]
		//
		gameSetUp[2][0].style.backgroundPosition = gameRandomValue[uniqueRandom[6]]
		gameSetUp[2][1].style.backgroundPosition = gameRandomValue[uniqueRandom[7]]
		uniqueRandom = []
	}
}

randomTile.addEventListener('click', () => {
	if (uniqueRandom.length === 0) {
		randomTile.classList.add('chooseClick')
		sortTile.classList.remove('chooseClick')

		moveElementToSortAndRender()
		randomInterval = setInterval(random, 25)
	}
})

const gameRender = () => {
	for (const [rowIndex, rowElement] of gameSetUp.entries()) {
		for (const [columnIndex, columnElement] of rowElement.entries()) {
			columnElement.style.top = `${rowIndex * 100}px`
			columnElement.style.left = `${columnIndex * 100}px`
			columnElement.style.backgroundPositionX = `-${columnIndex * 100}px`
			columnElement.style.backgroundPositionY = `-${rowIndex * 100}px`
		}
	}
}

gameRender()

const moveElementToSortAndRender = () => {
	let x = 2
	let y = 2
	let emptyX, emptyY

	for (const [rowIndex, rowElement] of gameSetUp.entries()) {
		for (const [columnIndex, columnElement] of rowElement.entries()) {
			if (columnElement.innerText === '') {
				emptyX = rowIndex
				emptyY = columnIndex
			}
		}
	}

	moveElement(gameSetUp[x][y], gameSetUp[emptyX][emptyY])

	const gameTemp = gameSetUp[x][y]
	gameSetUp[x][y] = gameSetUp[emptyX][emptyY]
	gameSetUp[emptyX][emptyY] = gameTemp
}

const sort = () => {
	sortTile.classList.add('chooseClick')
	randomTile.classList.remove('chooseClick')

	moveElementToSortAndRender()
	gameRender()
}

sortTile.addEventListener('click', sort)

const moveElement = (element1, element2) => {
	const tempTop = element1.style.top
	const tempLeft = element1.style.left

	element1.style.top = element2.style.top
	element1.style.left = element2.style.left
	element2.style.top = tempTop
	element2.style.left = tempLeft
}

gameBoard.addEventListener('click', e => {
	const target = e.target

	let x, y
	let emptyX, emptyY

	for (const [rowIndex, rowElement] of gameSetUp.entries()) {
		for (const [columnIndex, columnElement] of rowElement.entries()) {
			if (target === columnElement) {
				x = rowIndex
				y = columnIndex
			}
			if (columnElement.innerText === '') {
				emptyX = rowIndex
				emptyY = columnIndex
			}
		}
	}

	if (e.target.textContent !== '') {
		if (
			(x === emptyX && (y + 1 === emptyY || y - 1 === emptyY)) ||
			(y === emptyY && (x + 1 === emptyX || x - 1 === emptyX))
		) {
			moveElement(gameSetUp[x][y], gameSetUp[emptyX][emptyY])

			const gameTemp = gameSetUp[x][y]
			gameSetUp[x][y] = gameSetUp[emptyX][emptyY]
			gameSetUp[emptyX][emptyY] = gameTemp
		}
	}
	// console.log(`x: ${x}, y: ${y}`)
	// console.log(`emptyX: ${emptyX}, emptyY: ${emptyY}`)
})

gameBoard1.addEventListener('click', () => {
	gameBoard2.classList.remove('chooseClick')
	gameBoard3.classList.remove('chooseClick')
	gameBoard4.classList.remove('chooseClick')
	gameBoard1.classList.toggle('chooseClick')
	chooseBoardValue = 1
})
gameBoard2.addEventListener('click', () => {
	gameBoard1.classList.remove('chooseClick')
	gameBoard3.classList.remove('chooseClick')
	gameBoard4.classList.remove('chooseClick')
	gameBoard2.classList.toggle('chooseClick')
	chooseBoardValue = 2
})
gameBoard3.addEventListener('click', () => {
	gameBoard1.classList.remove('chooseClick')
	gameBoard2.classList.remove('chooseClick')
	gameBoard4.classList.remove('chooseClick')
	gameBoard3.classList.toggle('chooseClick')
	chooseBoardValue = 3
})
gameBoard4.addEventListener('click', () => {
	gameBoard1.classList.remove('chooseClick')
	gameBoard2.classList.remove('chooseClick')
	gameBoard3.classList.remove('chooseClick')
	gameBoard4.classList.toggle('chooseClick')
	chooseBoardValue = 4
})

settingsBtn.addEventListener('click', () => {
	settingsBtn.classList.remove('settingsBtnShow')
	settings.classList.remove('settingsHide')
	for (const [index, tile] of gameTiles.entries()) {
		if (index <= 7) {
			tile.classList.remove('tileShow')
		}
	}
})

// && randomTile.classList.contains('chooseClick') && sortTile.classList.contains('chooseClick')

acceptBtn.addEventListener('click', () => {
	if (
		(chooseBoardValue !== 0 &&
			gameBoard1.classList.contains('chooseClick') &&
			(randomTile.classList.contains('chooseClick') || sortTile.classList.contains('chooseClick'))) ||
		(chooseBoardValue !== 0 &&
			gameBoard2.classList.contains('chooseClick') &&
			(randomTile.classList.contains('chooseClick') || sortTile.classList.contains('chooseClick'))) ||
		(chooseBoardValue !== 0 &&
			gameBoard3.classList.contains('chooseClick') &&
			(randomTile.classList.contains('chooseClick') || sortTile.classList.contains('chooseClick'))) ||
		(chooseBoardValue !== 0 &&
			gameBoard4.classList.contains('chooseClick') &&
			(randomTile.classList.contains('chooseClick') || sortTile.classList.contains('chooseClick')))
	) {
		gameBoard1.classList.remove('chooseClick')
		gameBoard2.classList.remove('chooseClick')
		gameBoard3.classList.remove('chooseClick')
		gameBoard4.classList.remove('chooseClick')

		error.classList.remove('errorShow')
		settingsBtn.classList.add('settingsBtnShow')
		settings.classList.add('settingsHide')

		randomTile.classList.remove('chooseClick')
		sortTile.classList.remove('chooseClick')

		for (const [index, tile] of gameTiles.entries()) {
			if (index <= 7) {
				tile.classList.add('tileShow')
			}
		}
	} else {
		error.classList.add('errorShow')
	}

	switch (chooseBoardValue) {
		case 1:
			for (const [index, tile] of gameTiles.entries()) {
				if (index <= 7) {
					tile.style.backgroundImage = "url('img1.png')"
				}
			}
			break
		case 2:
			for (const [index, tile] of gameTiles.entries()) {
				if (index <= 7) {
					tile.style.backgroundImage = "url('img2.png')"
				}
			}
			break
		case 3:
			for (const [index, tile] of gameTiles.entries()) {
				if (index <= 7) {
					tile.style.backgroundImage = "url('img3.png')"
				}
			}
			break
		case 4:
			for (const [index, tile] of gameTiles.entries()) {
				if (index <= 7) {
					tile.style.backgroundImage = "url('img4.png')"
				}
			}
			break
	}
})
