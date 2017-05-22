import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Confirm } from './common';
import BoardActions from '../reducers/BoardReducer';

class GameMenu extends Component {
	clearBoard() {
		this.props.newGame()
	}

	render() {
		return(
			<View style={styles.gameMenuContainer} >
				<Button onPress={this.clearBoard.bind(this)}>
					New Game
				</Button>

				<Confirm 
					visible={this.props.winnerName !== ''}
					onAccept={this.clearBoard.bind(this)}
					troll={this.props.troll}
				>
					{ this.props.winnerName + " wins. Want to play again?" }
				</Confirm>
				<View/>
			</View>
		);
	}
}

const styles = {
	gameMenuContainer: {
		marginTop: 40,
		flexDirection: 'row',
	}
}

const mapStateToProps = ({ ticTacTroll }) => {
	return {
		winnerName: ticTacTroll.winnerName,
		troll: ticTacTroll.troll
	};
}
const mapDispatchToProps = (dispatch) => {
	return {
		newGame: () => dispatch(BoardActions.newGame())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
