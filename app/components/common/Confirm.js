import React, { Component } from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, troll }) => {
	const { cardSectionStyle, textStyle, containerStyle } = styles;

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={() => {}}
		>
			<View style={containerStyle}>
				<CardSection style={cardSectionStyle}>
					{
						troll && <Image source={require('../../images/troll.gif')} style={styles.imageStyle} /> 
					}
					<Text style={textStyle}>{children}</Text>
				</CardSection>

				<CardSection>
					<Button onPress={onAccept}>Play Again.</Button>
				</CardSection>
			</View>
		</Modal>
	);
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'flex-end'
	},
	imageStyle: {
		width: 200,
		height: 200,
	}
};

export { Confirm };