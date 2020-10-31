import React, { useState } from 'react';
import WordList from '../components/WordList';
import MenuPage from './MenuPage';
import styled from 'styled-components';
import mountainResized from '../assets/mountainresized.jpg';

import { Navbar, Anchor } from '../styles/Reusables';

const Container = styled.div`
	background-image: url(${mountainResized});
	background-size: cover;
	opacity: 0.4;
	width: 100%;
	height: 100%;
`;

const MainContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
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
