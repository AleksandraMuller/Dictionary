import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 100vh;
	font-family: 'Open Sans Condensed', sans-serif;
	overflow: hidden;
`;

export const Anchor = styled.a`
	cursor: pointer;
`;

export const Navbar = styled.nav`
	position: absolute;
	top: 3rem;
	right: 2rem;
	writing-mode: vertical-lr;
	text-orientation: mixed;
	color: #fff;
	font-size: 0.9rem;
	font-weight: 600;
	letter-spacing: 3px;
	z-index: 1000000;
	@media (min-width: 450px) {
		font-size: 1.1rem;
	}
	@media (min-width: 767px) {
		font-size: 1.3rem;
	}
	@media (min-width: 1200px) {
		font-size: 1.5rem;
	}
`;
