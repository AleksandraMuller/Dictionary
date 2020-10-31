import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getWordsQuery } from '../queries/queries';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const HeaderOne = styled.h1`
	color: #fff;
	font-size: 4rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	text-align: center;
`;

const Container = styled.div`
	color: #fff;
	position: absolute;
	z-index: 50000;
	font-family: 'Open Sans Condensed', sans-serif;
	top: 5rem;
`;

const FlexContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 0 3rem;
`;

const Button = styled.button`
	color: #fff;
	background-color: #333;
	width: 10rem;
	height: 4rem;
	border: none;
	margin: 1rem;

	cursor: pointer;
	font-family: 'Open Sans Condensed', sans-serif;
	font-size: 1.5rem;
	&:hover {
		background-color: #dc681b;
	}
`;

const WordList = (props) => {
	const [selectedWord, setSelectedWord] = useState('');
	let history = useHistory();

	const handleWord = (word) => {
		setSelectedWord(word);
		console.log(word);
		history.push({
			pathname: '/details',
			wordDetails: word,
		});
	};
	const displayWords = () => {
		const data = props.data;
		if (data.loading) {
			return <div>Loading words...</div>;
		} else {
			return data.words.map((word) => {
				return (
					<Button key={word.id} onClick={() => handleWord(word)}>
						{word.name}
					</Button>
				);
			});
		}
	};
	return (
		<Container>
			{' '}
			<HeaderOne>All available terms:</HeaderOne>
			<FlexContainer>{displayWords()}</FlexContainer>
		</Container>
	);
};

export default graphql(getWordsQuery)(WordList);
