import React, { useState } from 'react';
import WordDetails from '../components/WordDetails';
import styled from 'styled-components';
import MenuPage from './MenuPage';
import { Navbar, Anchor } from '../styles/Reusables';

const Container = styled.div`
	background-color: #000;
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
`;

const DetailsPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Container>
			{!isOpen && <WordDetails />}
			<Anchor onClick={handleClick}>
				<Navbar>{isOpen ? 'close' : 'menu'}</Navbar>
			</Anchor>
			<MenuPage isOpen={isOpen} setIsOpen={setIsOpen} />
		</Container>
	);
};

export default DetailsPage;
