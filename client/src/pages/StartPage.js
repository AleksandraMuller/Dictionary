import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Anchor, Navbar } from '../styles/Reusables';

import Video from '../components/Video';
import MenuPage from './MenuPage';

const LineContainer = styled.div`
	width: 60%;
	height: 70%;
	border: none;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		border: 1px solid #fff;
	}
	@media (min-width: 1200px) {
	}
	@media (min-width: 1800px) {
	}
`;

const TextContainer = styled.div`
	position: absolute;
	bottom: 20rem;
	left: 2rem;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #fff;
	@media (min-width: 450px) {
		left: 5rem;
	}
	@media (min-width: 767px) {
		left: 7rem;
	}
	@media (min-width: 1200px) {
		bottom: 13rem;
		left: 10rem;
	}
	@media (min-width: 1800px) {
		bottom: 18rem;
		left: 13rem;
	}
`;

const HeaderOne = styled.h1`
	letter-spacing: 3px;
	font-size: 2rem;
	font-weight: 500;
	@media (min-width: 450px) {
		font-size: 3rem;
	}
	@media (min-width: 767px) {
		font-size: 5rem;
	}
	@media (min-width: 1200px) {
		font-size: 7rem;
	}
	@media (min-width: 1800px) {
		font-size: 10rem;
	}
`;

const POne = styled.p`
	letter-spacing: 1px;
	font-size: 1rem;
	font-weight: 400;
	@media (min-width: 450px) {
		font-size: 1.5rem;
	}
	@media (min-width: 767px) {
		font-size: 2rem;
	}
	@media (min-width: 1200px) {
		font-size: 2.5rem;
	}
	@media (min-width: 1800px) {
		font-size: 3.5rem;
	}
`;

const SpanContainer = styled.div`
	display: flex;
	flex-direction: column;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
	}
	@media (min-width: 1200px) {
		flex-direction: row;
	}
`;

const Button = styled.button`
	margin-left: 2rem;
	font-family: 'Open Sans Condensed', sans-serif;
	background-color: transparent;
	color: #fff;
	border: 1px solid #fff;
	padding: 0.5rem 2rem;
	letter-spacing: 1px;
	font-size: 0.7rem;
	cursor: pointer;
	&:hover {
		background-color: #dc681b;
		-moz-box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
		-webkit-box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
		box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
	}
	width: 12rem;
	margin-top: 1.5rem;
	align-self: center;
	@media (min-width: 450px) {
		width: 10rem;
		font-size: 0.8rem;
	}
	@media (min-width: 767px) {
		width: 12rem;
		font-size: 1rem;
	}
	@media (min-width: 1200px) {
		width: 14rem;
		margin-top: 0;
	}
	@media (min-width: 1800px) {
		width: 16rem;
		font-size: 1.5rem;
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
