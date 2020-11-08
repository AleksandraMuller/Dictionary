import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import {
	getWordQuery,
	deleteWordMutation,
	getDevelopersQuery,
	getWordsQuery,
	editWordMutation,
} from '../queries/queries';
import { useLocation } from 'react-router-dom';
import { flowRight as compose } from 'lodash';
import { useHistory } from 'react-router-dom';

import InputAdd from './InputAdd';

import styled from 'styled-components';

import { ReactComponent as DeleteLogo } from '../assets/close-circle.svg';
import { ReactComponent as SettingsLogo } from '../assets/create-outline.svg';

const Container = styled.div`
	color: #fff;
	font-family: 'Open Sans Condensed', sans-serif;
	padding-top: 4rem;
	text-align: center;
	margin: 0 2rem;
`;

const BigHeader = styled.h1`
	color: #fff;
	font-size: 4rem;
	font-family: inherit;
	letter-spacing: 2px;
	margin-bottom: 2rem;
`;

const NoneWordHeader = styled.h1`
	color: #fff;
	font-size: 4rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	margin-top: 5rem;
	height: 100vh;
	text-align: center;
`;

const Span = styled.span`
	text-transform: uppercase;
	font-size: 1rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	display: block;
`;

const Paragraph = styled.p`
	margin-bottom: 1.5rem;
	font-size: 2rem;
`;

const LogoButton = styled.a`
	cursor: pointer;
`;

const LogoButtonSettingsMenu = styled(LogoButton)`
	border-bottom: 1px solid #fff;
	&:hover {
		background-color: #dc681b;
	}
`;

const StyledDeleteLogo = styled(DeleteLogo)`
	fill: #3e0500;
	z-index: 6000;
	width: 40px;
	margin-bottom: 1rem;
	margin-left: -2.5rem;
	&:hover {
		fill: #710900;
	}
`;

const StyledSettingsLogo = styled(SettingsLogo)`
	fill: #fff;
	width: 40px;
	margin-top: -10rem;
	margin-left: 2rem;
	&:hover {
		fill: #dc681b;
	}
`;

const SettingsContainer = styled.div`
	border-top: 1px solid #fff;
	border-left: 1px solid #fff;
	border-right: 1px solid #fff;
	display: flex;
	flex-direction: column;
	background-color: #333;
	margin-left: 2rem;
	width: 10rem;
	text-align: center;
	font-size: 1.3rem;
`;

const SettingsContainerHide = styled(SettingsContainer)`
	visibility: hidden;
`;

const FlexContainerMenu = styled.div`
	display: flex;
	align-items: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: auto;
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

const WordDetails = (props) => {
	const location = useLocation();
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isEditInputOn, setIsEditInputOn] = useState(false);
	const [wordName, setWordName] = useState('');
	const [wordDescription, setWordDescription] = useState('');
	const [wordLink, setWordLink] = useState('');
	const [wordDeveloper, setWordDeveloper] = useState('');
	const [isAdded, setIsAdded] = useState(false);
	let history = useHistory();

	const word = location.wordDetails;
	// const wordIdFromLocation = location.wordDetails.id;

	console.log(props);

	const handleSettingsMenu = () => {
		setIsEditOpen(!isEditOpen);
	};

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

	const handleDelete = (e) => {
		e.preventDefault();
		console.log(word);
		props.deleteWordMutation({
			variables: {
				id: word.id,
			},
			refetchQueries: [{ query: getWordsQuery }],
		});
		history.push('/allResults');
	};

	const handleEditInputs = () => {
		setIsEditInputOn(!isEditInputOn);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('word', word.id);
		console.log('dev', wordDeveloper);
		props.editWordMutation({
			variables: {
				id: word.id,
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

	const displayWordDetails = () => {
		if (word) {
			console.log(word);
			return (
				<Container>
					<FlexContainerMenu>
						<LogoButton onClick={handleSettingsMenu}>
							<StyledSettingsLogo />
						</LogoButton>
						{isEditOpen && (
							<SettingsContainer>
								<LogoButtonSettingsMenu onClick={handleDelete}>
									{/* onClick={() => setIsDeleteTerm(!isDeleteTerm)}> */}
									Delete term
								</LogoButtonSettingsMenu>
								<LogoButtonSettingsMenu onClick={handleEditInputs}>
									Edit term
								</LogoButtonSettingsMenu>
							</SettingsContainer>
						)}
						{!isEditOpen && (
							<SettingsContainerHide>
								<LogoButtonSettingsMenu>Delete term</LogoButtonSettingsMenu>
								<LogoButtonSettingsMenu>Edit term</LogoButtonSettingsMenu>
							</SettingsContainerHide>
						)}
					</FlexContainerMenu>

					{!isEditInputOn && (
						<>
							<BigHeader>Read more about {word.name}</BigHeader>
							<Paragraph>
								<Span>Term:</Span> {word.name}
							</Paragraph>
							<Paragraph>
								<Span>Description:</Span> {word.description}
							</Paragraph>
							<Paragraph>
								<Span>Link:</Span> <a href={word.link}>{word.link}</a>
							</Paragraph>
							<Paragraph>
								<Span>Developer:</Span> {word.developer.name}
							</Paragraph>
						</>
					)}
					{isEditInputOn && (
						<>
							<BigHeader>Edit {word.name}</BigHeader>
							<Form onSubmit={handleSubmit}>
								<InputAdd
									// label='Enter new term'
									val={wordName}
									setVal={setWordName}
									label={word.name}
								/>
								<InputAdd
									// label='Add description'
									val={wordDescription}
									setVal={setWordDescription}
									label={word.description}
								/>
								<InputAdd
									// label='Add link'
									val={wordLink}
									setVal={setWordLink}
									label={word.link}
								/>
								<Select
									value={wordDeveloper}
									onChange={(e) => setWordDeveloper(e.target.value)}>
									<option>Select developer</option>
									{displayDevelopers()}
								</Select>
								<Button onClick={(e) => handleSubmit(e)}>Make changes</Button>
								{isAdded && (
									<AddedContainer>You word has been updated! </AddedContainer>
								)}
							</Form>
						</>
					)}
				</Container>
			);
		} else {
			return <NoneWordHeader>No word selected..</NoneWordHeader>;
		}
	};

	return <div>{displayWordDetails()}</div>;
};

//FIX DEVELOPER ID NONE

// export default graphql(getWordQuery, {
// 	options: ({ wordId }) => {
// 		return {
// 			variables: {
// 				id: wordId,
// 			},
// 		};
// 	},
// })(WordDetails);

export default compose(
	graphql(
		getWordQuery,
		{
			options: ({ wordId }) => {
				return {
					variables: {
						id: wordId,
					},
				};
			},
		},
		{ name: 'getWordQuery' }
	),
	graphql(editWordMutation, { name: 'editWordMutation' }),
	graphql(deleteWordMutation, { name: 'deleteWordMutation' }),
	graphql(getDevelopersQuery, { name: 'getDevelopersQuery' })
)(WordDetails);
