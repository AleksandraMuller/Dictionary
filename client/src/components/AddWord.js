import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import styled from 'styled-components';
import InputAdd from './InputAdd';
import {
	addWordMutation,
	getDevelopersQuery,
	getWordsQuery,
} from '../queries/queries';

const Container = styled.div`
	position: absolute;
	left: 40%;
	margin-left: -40px;
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
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const AddedContainer = styled.div`
	text-align: center;
	margin-top: 1rem;
`;

const Select = styled.select`
	padding: 1rem 1rem;
	font-size: 1rem;
	font-family: inherit;
	outline-color: #dc681b;
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

const AddWord = (props) => {
	const [wordName, setWordName] = useState('');
	const [wordDescription, setWordDescription] = useState('');
	const [wordLink, setWordLink] = useState('');
	const [wordDeveloper, setWordDeveloper] = useState('');
	const [isAdded, setIsAdded] = useState(false);

	const displayDevelopers = () => {
		const data = props.getDevelopersQuery;
		if (data.loading) {
			return <option disabled>Loading developers...</option>;
		} else {
			return data.developers.map((dev) => {
				return (
					<option key={dev.id} value={dev.id}>
						{dev.name}
					</option>
				);
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		wordName !== '' &&
			props.addWordMutation({
				variables: {
					name: wordName,
					description: wordDescription,
					link: wordLink,
					developerId: wordDeveloper,
				},
				refetchQueries: [{ query: getWordsQuery }],
			});
		setIsAdded(true);
		setWordName('');
		setWordLink('');
		setWordDescription('');
		setWordDeveloper('');
		setTimeout(() => {
			setIsAdded(false);
		}, 3000);
	};

	return (
		<Container>
			<BigHeader>Add new term</BigHeader>
			<Form onSubmit={handleSubmit}>
				<InputAdd label='Enter new term' val={wordName} setVal={setWordName} />
				<InputAdd
					label='Add description'
					val={wordDescription}
					setVal={setWordDescription}
				/>
				<InputAdd label='Add link' val={wordLink} setVal={setWordLink} />
				<Select
					value={wordDeveloper}
					onChange={(e) => setWordDeveloper(e.target.value)}>
					<option>Select developer</option>
					{displayDevelopers()}
				</Select>
				<Button onClick={(e) => handleSubmit(e)}>Add new term</Button>
				{isAdded && <AddedContainer>You word has been added! </AddedContainer>}
			</Form>
		</Container>
	);
};

export default compose(
	graphql(getDevelopersQuery, { name: 'getDevelopersQuery' }),
	graphql(addWordMutation, { name: 'addWordMutation' })
)(AddWord);
