import React, { useState } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Input from '../components/Input';
import MenuPage from './MenuPage';
import { Navbar, Anchor } from '../styles/Reusables';
import { getFilteredWordsQuery } from '../queries/queries';
import heroResized from '../assets/heroresized.jpg';

const Container = styled.div`
	background-image: url(${heroResized});
	background-size: cover;
	opacity: 0.5;
	width: 100%;
	height: 100%;
`;

const MainContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

const TermContainer = styled.div`
	position: absolute;
	top: 15rem;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

const TermButton = styled.button`
	color: #fff;
	background-color: #333;
	width: 10rem;
	height: 4rem;
	border: none;
	cursor: pointer;
	font-family: 'Open Sans Condensed', sans-serif;
	font-size: 1.5rem;
	margin: 1rem;
	&:hover {
		background-color: #dc681b;
	}
`;

const SearchPage = (props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	console.log(props);
	let history = useHistory();

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleDetailsWord = (e, word) => {
		e.preventDefault();
		console.log(word);
		history.push({
			pathname: '/details',
			wordDetails: word,
		});
	};

	return (
		<MainContainer>
			{!isOpen && (
				<>
					<Container></Container>
					<Input
						label='Enter search term'
						val={searchTerm}
						setVal={setSearchTerm}
					/>
					<Query
						query={getFilteredWordsQuery}
						variables={{ filter: searchTerm }}>
						{({ loading, error, data }) => {
							if (loading) return <div>Fetching</div>;
							if (error) return <div>Error</div>;

							const termsToRender = data.filterWords;

							return (
								<TermContainer>
									{termsToRender !== null &&
										searchTerm !== '' &&
										termsToRender.map((term) => (
											<TermButton
												key={term.id}
												onClick={(e) => handleDetailsWord(e, term)}>
												{term.name}
											</TermButton>
										))}
								</TermContainer>
							);
						}}
					</Query>
				</>
			)}
			<Anchor onClick={handleClick}>
				<Navbar>{isOpen ? 'close' : 'menu'}</Navbar>
			</Anchor>
			<MenuPage isOpen={isOpen} setIsOpen={setIsOpen} />{' '}
		</MainContainer>
	);
};

export default SearchPage;
