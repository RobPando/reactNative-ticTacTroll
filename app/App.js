import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import TicTacTroll from './components/TicTacTroll';
import { Header } from './components/common';

class App extends Component {
	render() {
		return (
			<Provider store={createStore(reducers)}>
				<View>
					<Header title="Tic Tac Troll" />
					<TicTacTroll />
				</View>
			</Provider>
		);
	}
}

export default App;
