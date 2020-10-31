import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	z-index: 100;
	background-color: transparent;
	position: absolute;
	top: 4rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Open Sans Condensed', sans-serif;
`;

const InputField = styled.input`
	z-index: 200;
	text-align: center;
	background-color: #fff;
	width: 60%;
	padding: 1rem;
	font-size: 1.5rem;
	font-family: inherit;
	outline-color: #dc681b;
	margin-top: 1rem;
`;

const Label = styled.label`
	color: #fff;
	font-size: 2rem;
	font-weight: 600;
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
