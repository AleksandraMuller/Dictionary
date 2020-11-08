import React, { useState } from 'react';
import WordList from '../components/WordList';
import MenuPage from './MenuPage';
import styled from 'styled-components';
import mountainResized from '../assets/mountainresized.jpg';

import { Navbar, Anchor } from '../styles/Reusables';

const Container = styled.div`
	background-image: url(${mountainResized});
	background-size: cover;
	// background-repeat: repeat-y;
	opacity: 0.4;
	min-width: 100%;
	min-height: 300vh;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		min-height: 200vh;
	}
	@media (min-width: 1200px) {
		min-height: 100vh;
	}
	@media (min-width: 1800px) {
	}
`;

const MainContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	// overflow: hidden;
`;

const ShowAllResultsPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<MainContainer>
			{!isOpen && (
				<>
					<WordList />
					<Container></Container>
				</>
			)}
			<Anchor onClick={handleClick}>
				<Navbar>{isOpen ? 'close' : 'menu'}</Navbar>
			</Anchor>
			<MenuPage isOpen={isOpen} setIsOpen={setIsOpen} />
		</MainContainer>
	);
};

export default ShowAllResultsPage;
