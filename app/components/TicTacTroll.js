import React from 'react';
import { View } from 'react-native';
import Board from './Board';
import GameMenu from './GameMenu';

const TicTacTroll = () => {
	return (
		<View>
			<Board />
			<GameMenu />
		</View>
	);
};

export default TicTacTroll;
