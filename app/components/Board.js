import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Cell } from './common';
import BoardActions from '../reducers/BoardReducer';

class Board extends Component {
	whatCellState(cellValue, position) {
		if (cellValue === '') {
			return (
				<TouchableWithoutFeedback onPress={() => this.onCellTap(position)} >
					<View style={{ width: 80, height: 80 }}>
					</View>
				</TouchableWithoutFeedback>
			);			
		}

		return <Text style={{ fontSize: 60 }}>{ cellValue }</Text> 
	}

	onCellTap(position) {
		this.props.onCellTap(position)
		this.props.makeAiMove()
	}

	render() {
		const { boardContainer, rowContainer } = styles;
		const { cells } = this.props

		return (
			<View style={boardContainer} >
				<View style={rowContainer} >
					<Cell style={{ borderBottomWidth: 2, borderRightWidth: 2 }}>
						{this.whatCellState(cells.one, Object.keys(cells)[0])}
					</Cell>
					<Cell style={{ borderBottomWidth: 2 }}>
						{this.whatCellState(cells.two, Object.keys(cells)[1])}
					</Cell>
					<Cell style={{ borderBottomWidth: 2, borderLeftWidth: 2 }}>
						{this.whatCellState(cells.three, Object.keys(cells)[2])}
					</Cell>
				</View>

				<View style={rowContainer}>
					<Cell style={{ borderBottomWidth: 2, borderRightWidth: 2 }}>
						{this.whatCellState(cells.four, Object.keys(cells)[3])}
					</Cell>
					<Cell style={{ borderBottomWidth: 2 }}>
						{this.whatCellState(cells.five, Object.keys(cells)[4])}
					</Cell>
					<Cell style={{ borderBottomWidth: 2, borderLeftWidth: 2 }}>
						{this.whatCellState(cells.six, Object.keys(cells)[5])}
					</Cell>
				</View>

				<View style={rowContainer} >
					<Cell style={{ borderRightWidth: 2 }}>
						{this.whatCellState(cells.seven, Object.keys(cells)[6])}
					</Cell>
					<Cell>
						{this.whatCellState(cells.eight, Object.keys(cells)[7])}
					</Cell>
					<Cell style={{ borderLeftWidth: 2 }}>
						{this.whatCellState(cells.nine, Object.keys(cells)[8])}
					</Cell>
				</View>
			</View>
		);
	}
}

const styles = {
	boardContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20
	},
	rowContainer: {
		flexDirection: 'row'
	}
};

const mapStateToProps = ({ ticTacTroll }) => {
	return {
		cells: ticTacTroll.cells,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCellTap: (position) => dispatch(BoardActions.onCellTap(position)),
		makeAiMove: () => dispatch(BoardActions.makeAiMove()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
