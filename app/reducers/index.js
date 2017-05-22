import { combineReducers } from 'redux';
import { BoardReducer } from './BoardReducer';

export default combineReducers({
	ticTacTroll: BoardReducer
});
