import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const TextContainer = styled.div`
	font-family: 'Open Sans Condensed', sans-serif;
	font-size: 3rem;
	position: absolute;
	top: 7rem;
	left: 6rem;
	white-space: nowrap;
	color: #333;
	cursor: pointer;
	animation: moveOver 5s alternate ease-in-out;
	&: @keyframes moveOver {
		from {
			transform: translate3d(1200px, 0, 0);
		}
	}
`;

const Anchor = styled.a`
	&:hover {
		color: #fff;
	}
`;

const MenuPage = ({ isOpen }) => {
	let history = useHistory();

	return (
		<div className={isOpen ? 'box' : 'box_hide'}>
			<TextContainer>
				<Anchor onClick={() => history.push('/search')}>
					<h2>Search for terms</h2>
				</Anchor>
				<Anchor onClick={() => history.push('/allResults')}>
					<h2>Show all terms</h2>
				</Anchor>
				<Anchor onClick={() => history.push('/add')}>
					<h2>Add new term</h2>
				</Anchor>
				<Anchor onClick={() => history.push('/allResults')}>
					<h2>Add new developer</h2>
				</Anchor>
			</TextContainer>
		</div>
	);
};

export default MenuPage;
