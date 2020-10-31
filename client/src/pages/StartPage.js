import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Anchor, Navbar } from '../styles/Reusables';

import Video from '../components/Video';
import MenuPage from './MenuPage';

const LineContainer = styled.div`
	width: 60%;
	height: 70%;
	border: 1px solid #fff;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const TextContainer = styled.div`
	position: absolute;
	bottom: 13rem;
	left: 10rem;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #fff;
`;

const HeaderOne = styled.h1`
	letter-spacing: 3px;
	font-size: 7rem;
	font-weight: 500;
`;

const POne = styled.p`
	letter-spacing: 1px;
	font-size: 2.5rem;
	font-weight: 400;
`;

const SpanContainer = styled.div`
	display: flex;
`;

const Button = styled.button`
	margin-left: 2rem;
	font-family: 'Open Sans Condensed', sans-serif;
	background-color: transparent;
	color: #fff;
	border: 1px solid #fff;
	padding: 0.5rem 2rem;
	letter-spacing: 1px;
	font-size: 1rem;
	cursor: pointer;
	&:hover {
		background-color: #dc681b;
		-moz-box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
		-webkit-box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
		box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
	}
`;

const StartPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	let history = useHistory();

	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Container>
			{!isOpen && (
				<>
					<Video />
					<LineContainer />
					<TextContainer>
						<HeaderOne>Coding Dictionary</HeaderOne>
						<SpanContainer>
							<POne>Explore, learn and add new coding terms</POne>
							<Button onClick={() => history.push('/search')}>
								Start searching now
							</Button>
						</SpanContainer>
					</TextContainer>
				</>
			)}
			<Anchor onClick={handleClick}>
				<Navbar>{isOpen ? 'close' : 'menu'}</Navbar>
			</Anchor>
			<MenuPage isOpen={isOpen} setIsOpen={setIsOpen} />
		</Container>
	);
};

export default StartPage;
