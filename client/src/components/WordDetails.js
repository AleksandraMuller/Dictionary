import React from 'react';
import { graphql } from 'react-apollo';
import { getWordQuery } from '../queries/queries';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
	color: #fff;
	font-family: 'Open Sans Condensed', sans-serif;
	padding-top: 4rem;
	text-align: center;
	margin: 0 2rem;
`;

const BigHeader = styled.h1`
	color: #fff;
	font-size: 4rem;
	font-family: inherit;
	letter-spacing: 2px;
	margin-bottom: 2rem;
`;

const NoneWordHeader = styled.h1`
	color: #fff;
	font-size: 4rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	margin-top: 5rem;
	height: 100vh;
	text-align: center;
`;

const Span = styled.span`
	text-transform: uppercase;
	font-size: 1rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	display: block;
`;

const Paragraph = styled.p`
	margin-bottom: 1.5rem;
	font-size: 2rem;
`;

const WordDetails = () => {
	const location = useLocation();
	console.log(location.wordDetails);
	const displayWordDetails = () => {
		const word = location.wordDetails;
		console.log(word);

		if (word) {
			console.log(word);
			return (
				<Container>
					<BigHeader>Read more about {word.name}</BigHeader>
					<Paragraph>
						<Span>Term:</Span> {word.name}
					</Paragraph>
					<Paragraph>
						<Span>Description:</Span> {word.description}
					</Paragraph>
					<Paragraph>
						<Span>Link:</Span> <a href={word.link}>{word.link}</a>
					</Paragraph>
					<Paragraph>
						<Span>Developer:</Span> {word.developer.name}
					</Paragraph>
				</Container>
			);
		} else {
			return <NoneWordHeader>No word selected..</NoneWordHeader>;
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
