import React, { useState } from 'react';
import AddWord from '../components/AddWord';
import MenuPage from './MenuPage';

import styled from 'styled-components';
import { Navbar, Anchor } from '../styles/Reusables';
import addWord from '../assets/addwordresized.jpg';

const Container = styled.div`
	background-image: url(${addWord});
	background-size: cover;
	width: 100%;
	min-height: 100%;
	opacity: 0.5;
`;

const MainContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

const AddTermPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<MainContainer>
			{!isOpen && (
				<>
					<AddWord />
					<Container></Container>
				</>
			)}
			<Anchor onClick={() => setIsOpen(!isOpen)}>
				<Navbar>{isOpen ? 'close' : 'menu'}</Navbar>
			</Anchor>
			<MenuPage isOpen={isOpen} setIsOpen={setIsOpen} />
		</MainContainer>
	);
};

export default AddTermPage;
