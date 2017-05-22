import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Cell extends Component {
	
	render() {
		return (
			<View style={[styles.cellStyle, this.props.style]}>
				{this.props.children}
			</View>
		);
	}
}

const styles = {
	cellStyle: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export { Cell };
