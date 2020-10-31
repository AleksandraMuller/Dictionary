import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { addDeveloperMutation, getDevelopersQuery } from '../queries/queries';
import styled from 'styled-components';

import InputAdd from './InputAdd';

const Container = styled.div`
	position: absolute;
	left: 35%;
	margin-left: -35px;
	top: 15%;
	margin-top: -15px;
	background-color: transparent;
	z-index: 5000;
	color: #fff;
	font-family: 'Open Sans Condensed', sans-serif;
`;

const BigHeader = styled.h1`
	font-size: 4rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	margin-bottom: 1rem;
`;

const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	font-family: inherit;
	margin-top: 2rem;
	font-size: 1rem;
	font-weight: 600;
	border: none;
	background-color: #dc681b;
	color: #fff;
	cursor: pointer;
	letter-spacing: 2px;
	&:hover {
		background-color: transparent;
		color: #dc681b;
		border: 1px solid #dc681b;
		-moz-box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
		-webkit-box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
		box-shadow: 5px 5px 5px rgba(220, 104, 27, 0.6);
	}
`;

const AddedContainer = styled.div`
	text-align: center;
	margin-top: 1rem;
`;

const AddDeveloper = (props) => {
	console.log(props);
	const [developerName, setDeveloperName] = useState('');
	const [wordLink, setWordLink] = useState('');
	const [isAdded, setIsAdded] = useState(false);

	console.log(developerName, wordLink);
	const handleSubmit = (e) => {
		e.preventDefault();
		developerName !== '' &&
			props.addDeveloperMutation({
				variables: {
					name: developerName,
					link: wordLink,
				},
				refetchQueries: [{ query: getDevelopersQuery }],
			});
		setIsAdded(true);
		setDeveloperName('');
		setWordLink('');
		setTimeout(() => {
			setIsAdded(false);
		}, 3000);
	};
	return (
		<Container>
			{' '}
			<BigHeader>Add new developer</BigHeader>
			<FlexContainer>
				<InputAdd
					label='Enter new developer'
					val={developerName}
					setVal={setDeveloperName}
				/>
				<InputAdd label='Enter link' val={wordLink} setVal={setWordLink} />
				<Button onClick={(e) => handleSubmit(e)}>Add developer</Button>
				{isAdded && <AddedContainer>Developer has been added!</AddedContainer>}
			</FlexContainer>
		</Container>
	);
};

export default compose(
	graphql(getDevelopersQuery, { name: 'getDevelopersQuery' }),
	graphql(addDeveloperMutation, { name: 'addDeveloperMutation' })
)(AddDeveloper);
