import { createReducer, createActions } from 'reduxsauce';
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	onCellTap: ['position'],
	makeAiMove: null,
	newGame: null,
});

export const BoardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
	cells: { 
		one: '',
		two: '',
		three: '',
		four: '',
		five: '',
		six: '',
		seven: '',
		eight: '',
		nine: ''
	},
	winnerName: '',
	troll: false
}

/* ------------- Reducers ------------- */

export const onCellTap = (state, { position }) => {
	const { cells } = state
	return { ...state, cells: { ...state.cells, [position]: 'o' } }
}

export const makeAiMove = (state) => {
	const { cells } = state
	let emptyCells = getFieldOf(cells)
	let playersPicks = getFieldOf(cells, 'o')
	let aiPicks = getFieldOf(cells, 'x')
	let cellNumber = null
	const cornerFields = ['one', 'three', 'seven', 'nine']
	const crossFields = ['two', 'four', 'six', 'eight']

	if (emptyCells.length == 0) {
		const troll = Math.random()
		cellNumber = smartAiChoice(Object.keys(cells), aiPicks)
		if (troll > 0.5) {
			return { ...state,cells: { ...state.cells, [cellNumber]: 'x' }, winnerName: 'Troll', troll: true }
		}

		return { ...state, winnerName: 'Nobody' }
	}

	if (playersPicks.length >= 2) {
		cellNumber = smartAiChoice(emptyCells, aiPicks)
		if (cellNumber == null){
			cellNumber = smartAiChoice(emptyCells, playersPicks)
		} else {
			return { ...state, cells: { ...state.cells, [cellNumber]: 'x' }, winnerName: 'Troll' }
		}
	}

	if (cellNumber == null) {
		if (aiPicks.length == 0) {	
			cellNumber = emptyCells.includes('five') ? 'five' : randomAiChoice(emptyCells, cornerFields)
		} else {
			if (playersPicks.includes('five')) { 
				cellNumber =  randomAiChoice(emptyCells, cornerFields) 
			} else if (playersPicks.includes('six', 'eight') && emptyCells.includes('nine')) { 
				cellNumber = 'nine'
			} else if (playersPicks.includes('four', 'eight') && emptyCells.includes('seven')) {
				cellNumber = 'seven'
			} else if (aiPicks.includes('five')) {
				cellNumber = randomAiChoice(emptyCells, crossFields)
			} else {
				cellNumber = randomAiChoice(emptyCells, cornerFields)
			}
		}
	}
	return { ...state, cells: { ...state.cells, [cellNumber]: 'x' } }
}

export const newGame = () => {
	return INITIAL_STATE;
}

/* ------------- Hookup Reducers To Types ------------- */

export const BoardReducer = createReducer(INITIAL_STATE, {
	[Types.ON_CELL_TAP]: onCellTap,
	[Types.MAKE_AI_MOVE]: makeAiMove,
	[Types.NEW_GAME]: newGame,
})

/* ------------- Helper Methods ------------- */

const getFieldOf = (cells, value = '') => {
	let tempScope = []
	_.map(cells, (val, key) => {
		if (val === value) {
			tempScope.push(key)
		}
	})
	return tempScope
}

const smartAiChoice = (emptyCells, picks) => {
	let tempPick = null
	const winningCells = [
		['one', 'two', 'three'],
		['four', 'five', 'six'],
		['seven', 'eight', 'nine'],
		['one', 'four', 'seven'],
		['two', 'five', 'eight'],
		['three', 'six', 'nine'],
		['one', 'five', 'nine'],
		['seven', 'five', 'three']
	]

	for (i = 0; i < winningCells.length; i++) {
		let danger = 0
		for (j = 0; j < winningCells[i].length; j++) {
			if (picks.includes(winningCells[i][j])) {
				danger++
			} else {
				tempPick = winningCells[i][j]
			}
		}

		if (danger == 2 && emptyCells.includes(tempPick)) {
			return tempPick
		}
	}
	return undefined
}

const randomAiChoice = (emptyCells, choices) => {
	for (i = 0; i < choices.length; i++) {
		if (emptyCells.includes(choices[i])) {
			return choices[i]
		}
	}
	return emptyCells[Math.floor(Math.random() * emptyCells.length)]
}
