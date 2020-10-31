import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background-color: transparent;
	text-align: center;
	font-family: 'Open Sans Condensed', sans-serif;
`;

const InputField = styled.input`
	width: 100%;
	padding: 1rem 1rem;
	font-size: 1.2rem;
	font-family: inherit;
	outline-color: #dc681b;
`;

const Label = styled.label`
	color: #fff;
`;

const Input = ({ val, setVal, label }) => {
	return (
		<Container>
			{/* <Label>{label}:</Label> */}
			<InputField
				onChange={(e) => setVal(e.target.value)}
				value={val}
				placeholder={label}></InputField>
		</Container>
	);
};

export default Input;
