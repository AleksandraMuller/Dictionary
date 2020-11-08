import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const TextContainer = styled.div`
	font-family: 'Open Sans Condensed', sans-serif;
	font-size: 1rem;
	position: absolute;
	top: 7rem;
	left: 3rem;
	white-space: nowrap;
	color: #333;
	cursor: pointer;
	animation: moveOver 5s alternate ease-in-out;
	&: @keyframes moveOver {
		from {
			transform: translate3d(1200px, 0, 0);
		}
	}
	@media (min-width: 450px) {
		font-size: 1.5rem;
		left: 6rem;
	}
	@media (min-width: 767px) {
		font-size: 2rem;
		left: 6rem;
	}
	@media (min-width: 1200px) {
		font-size: 3rem;
		left: 6rem;
	}
`;

const Anchor = styled.a`
	&:hover {
		color: #fff;
	}
`;

const MenuPage = ({ isOpen, setIsOpen }) => {
	let history = useHistory();

	return (
		<div className={isOpen ? 'box' : 'box_hide'}>
			<TextContainer>
				<Anchor
					onClick={() =>
						history.location.pathname === '/'
							? setIsOpen(!isOpen)
							: history.push('/')
					}>
					<h2>Start page</h2>
				</Anchor>
				<Anchor
					onClick={() =>
						history.location.pathname === '/search'
							? setIsOpen(!isOpen)
							: history.push('/search')
					}>
					<h2>Search for terms</h2>
				</Anchor>
				<Anchor
					onClick={() =>
						history.location.pathname === '/allResults'
							? setIsOpen(!isOpen)
							: history.push('/allResults')
					}>
					<h2>Show all terms</h2>
				</Anchor>
				<Anchor
					onClick={() =>
						history.location.pathname === '/add'
							? setIsOpen(!isOpen)
							: history.push('/add')
					}>
					<h2>Add new term</h2>
				</Anchor>
				<Anchor
					onClick={() =>
						history.location.pathname === '/addDeveloper'
							? setIsOpen(!isOpen)
							: history.push('/addDeveloper')
					}>
					{' '}
					<h2>Add new developer</h2>
				</Anchor>
			</TextContainer>
		</div>
	);
};

export default MenuPage;
