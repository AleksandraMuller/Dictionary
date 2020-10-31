import React, { useState } from 'react';
import styled from 'styled-components';

import { Anchor, Navbar } from '../styles/Reusables';
import MenuPage from './MenuPage';
import addDev from '../assets/developerresized.jpg';
import AddDeveloper from '../components/AddDeveloper';

const MainContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

const Container = styled.div`
	background-image: url(${addDev});
	background-size: cover;
	background-position: center;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	filter: blur(6px);
	-webkit-filter: blur(6px);
`;

const AddDeveloperPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<MainContainer>
			{!isOpen && (
				<>
					<AddDeveloper />
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

export default AddDeveloperPage;
