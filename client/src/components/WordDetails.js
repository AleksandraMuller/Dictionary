import React from 'react';
import { graphql } from 'react-apollo';
import { getWordQuery } from '../queries/queries';

const WordDetails = (props, { wordId }) => {
	const displayWordDetails = () => {
		const word = props.data.word;

		if (word) {
			console.log(word);
			return (
				<div>
					<h2>{word.name}</h2>
					<p>{word.description}</p>
					<p>{word.developer.name}</p>
					<h2>ALL WORDS</h2>
					<ul>
						{word.developer.word.map((item) => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		} else {
			return <div>No word selected..</div>;
		}
	};

	return <div>{displayWordDetails()}</div>;
};

//FIX DEVELOPER ID NONE

export default graphql(getWordQuery, {
	options: ({ wordId }) => {
		return {
			variables: {
				id: wordId,
			},
		};
	},
})(WordDetails);
