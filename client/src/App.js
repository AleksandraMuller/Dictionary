import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import WordList from './components/WordList';

import AddWord from './components/AddWord';
import MainPage from './pages/MainPage';
import ShowAllResultsPage from './pages/ShowAllResultsPage';
import AddTermPage from './pages/AddTermPage';

//apollo client setup

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div className='App'>
				<MainPage />
				<ShowAllResultsPage />
				<AddTermPage />
				<AddWord />
				<WordList />
			</div>
		</ApolloProvider>
	);
};

export default App;
