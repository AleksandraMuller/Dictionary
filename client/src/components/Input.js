import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	z-index: 100;
	background-color: transparent;
	position: absolute;
	top: 9rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Open Sans Condensed', sans-serif;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		top: 6rem;
	}
	@media (min-width: 1200px) {
		top: 4rem;
	}
`;

const InputField = styled.input`
	z-index: 200;
	text-align: center;
	background-color: #fff;
	width: 80%;
	padding: 1rem;
	font-size: 1rem;
	font-family: inherit;
	outline-color: #dc681b;
	margin-top: 1rem;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		font-size: 1.3rem;
		width: 60%;
	}
	@media (min-width: 1200px) {
		font-size: 1.5rem;
	}
	@media (min-width: 1800px) {
		font-size: 2rem;
	}
`;

const Label = styled.label`
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	@media (min-width: 450px) {
		font-size: 1.2rem;
	}
	@media (min-width: 767px) {
		font-size: 1.5rem;
	}
	@media (min-width: 1200px) {
		font-size: 2rem;
	}
	@media (min-width: 1800px) {
		font-size: 3rem;
	}
`;

const Input = ({ val, setVal, label }) => {
	return (
		<Container>
			<Label>{label}:</Label>
			<InputField
				onChange={(e) => setVal(e.target.value)}
				value={val}></InputField>
		</Container>
	);
};

export default Input;
