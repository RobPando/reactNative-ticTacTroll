import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
	const { viewStyle, textStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.title}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		height: 60,
		paddingTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2
	},
	textStyle: {
		fontSize: 18,
		fontFamily: 'Marker Felt'
	}
};

export { Header };
