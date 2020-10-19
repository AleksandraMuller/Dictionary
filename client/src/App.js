import React, { useState } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import WordList from './components/WordList';

import { useSelector, useDispatch } from 'react-redux';
import { addWords } from './redux/word/word.action';
import AddWord from './components/AddWord';

//apollo client setup

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
});

const App = () => {
	const [wordName, setWordName] = useState('');
	const [wordDescription, setWordDescription] = useState('');
	const [wordLink, setWordLink] = useState('');

	const dispatch = useDispatch();

	const handleAddWord = () => {
		dispatch(
			addWords({ name: wordName, description: wordDescription, link: wordLink })
		);
	};

	return (
		<ApolloProvider client={client}>
			<div className='App'>
				<AddWord />
				{/* <button onClick={handleAddWord}>Add new word</button> */}
				<WordList />
			</div>
		</ApolloProvider>
	);
};

export default App;
