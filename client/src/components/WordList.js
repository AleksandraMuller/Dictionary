import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getWordsQuery } from '../queries/queries';
import WordDetails from './WordDetails';

const WordList = (props) => {
	const [selectedWord, setSelectedWord] = useState('');
	const displayWords = () => {
		const data = props.data;
		if (data.loading) {
			return <div>Loading words...</div>;
		} else {
			return data.words.map((word) => {
				return (
					<button key={word.id} onClick={(e) => setSelectedWord(word.id)}>
						{word.name}
					</button>
				);
			});
		}
	};
	return (
		<div className='App'>
			<div>{displayWords()}</div>
			<div>
				<WordDetails wordId={selectedWord} />
			</div>
		</div>
	);
};

export default graphql(getWordsQuery)(WordList);
