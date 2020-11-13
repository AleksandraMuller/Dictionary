import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getWordsQuery, deleteWordMutation } from '../queries/queries';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { flowRight as compose } from 'lodash';

import { ReactComponent as DeleteLogo } from '../assets/close-circle.svg';
import { ReactComponent as SettingsLogo } from '../assets/create-outline.svg';

const HeaderOne = styled.h1`
	color: #fff;
	font-size: 1.5rem;
	font-family: 'Open Sans Condensed', sans-serif;
	letter-spacing: 2px;
	text-align: center;
	margin-bottom: 2rem;
	margin-top: 1rem;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		font-size: 3rem;
	}
	@media (min-width: 1200px) {
		font-size: 4rem;
	}
	@media (min-width: 1800px) {
		font-size: 5rem;
	}
`;

const Container = styled.div`
	color: #fff;
	position: absolute;
	z-index: 50000;
	font-family: 'Open Sans Condensed', sans-serif;
	top: 3rem;
`;

const FlexContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

const Button = styled.button`
	color: #fff;
	background-color: #333;
	width: 14rem;
	height: 4rem;
	border: none;
	margin: 1rem;

	cursor: pointer;
	font-family: 'Open Sans Condensed', sans-serif;
	font-size: 1.5rem;
	&:hover {
		background-color: #dc681b;
	}
`;

const ButtonContainer = styled.div``;

const LogoButton = styled.a`
	cursor: pointer;
`;

const LogoButtonSettingsMenu = styled(LogoButton)`
	// border-bottom: 1px solid #fff;
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
	width: 30px;
	margin-top: -10rem;
	margin-left: 2rem;
	&:hover {
		fill: #dc681b;
	}
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
	}
	@media (min-width: 1200px) {
		width: 40px;
	}
	@media (min-width: 1800px) {
		width: 60px;
	}
`;

// const StyledSettingsSmallLogo = styled(SettingsLogo)`
// 	fill: #fff;
// 	width: 35px;
// 	margin-left: -2.1rem;
// 	margin-bottom: -2rem;
// 	&:hover {
// 		fill: #dc681b;
// 	}
// `;

const SettingsContainer = styled.div`
	border: 1px solid #fff;
	// border-left: 1px solid #fff;
	// border-right: 1px solid #fff;
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
	flex-direction: column;
	align-items: flex-start;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		flex-direction: row;
		align-items: center;
	}
	@media (min-width: 1200px) {
	}
	@media (min-width: 1800px) {
	}
`;

const WordList = (props) => {
	const [selectedWord, setSelectedWord] = useState('');
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isEditedTerm, setIsEditedTerm] = useState(false);
	const [isDeleteTerm, setIsDeleteTerm] = useState(false);

	let history = useHistory();

	const handleWord = (word) => {
		setSelectedWord(word);
		console.log(word);
		history.push({
			pathname: '/details',
			wordDetails: word,
		});
	};

	const handleDelete = (e, id) => {
		e.preventDefault();
		console.log(id);
		props.deleteWordMutation({
			variables: {
				id: id,
			},
			refetchQueries: [{ query: getWordsQuery }],
		});
	};

	const handleSettingsMenu = () => {
		setIsEditOpen(!isEditOpen);
	};

	// const handleEdit = (e, id, word) => {
	// 	e.preventDefault();
	// 	console.log(id);
	// 	history.push({
	// 		pathname: '/details',
	// 		wordDetails: word,
	// 	});
	// };

	const displayWords = () => {
		const data = props.getWordsQuery;
		if (data.loading) {
			return <div>Loading words...</div>;
		} else {
			return data.words.map((word) => {
				return (
					<ButtonContainer>
						<Button key={word.id} onClick={() => handleWord(word)}>
							{word.name}
						</Button>
						{isDeleteTerm && (
							<LogoButton onClick={(e) => handleDelete(e, word.id)}>
								<StyledDeleteLogo />
							</LogoButton>
						)}
						{/* {isEditedTerm && (
							<LogoButton>
								<StyledSettingsSmallLogo
									onClick={(e) => handleEdit(e, word.id, word)}
								/>
							</LogoButton>
						)} */}
					</ButtonContainer>
				);
			});
		}
	};
	return (
		<Container>
			{' '}
			<FlexContainerMenu>
				<LogoButton onClick={handleSettingsMenu}>
					<StyledSettingsLogo />
				</LogoButton>
				{isEditOpen && (
					<SettingsContainer>
						<LogoButtonSettingsMenu
							onClick={() => setIsDeleteTerm(!isDeleteTerm)}>
							Delete term
						</LogoButtonSettingsMenu>
						{/* <LogoButtonSettingsMenu
							onClick={() => setIsEditedTerm(!isEditedTerm)}>
							Edit term
						</LogoButtonSettingsMenu> */}
					</SettingsContainer>
				)}
				{!isEditOpen && (
					<SettingsContainerHide>
						<LogoButtonSettingsMenu>Delete term</LogoButtonSettingsMenu>
						{/* <LogoButtonSettingsMenu>Edit term</LogoButtonSettingsMenu> */}
					</SettingsContainerHide>
				)}
			</FlexContainerMenu>
			<HeaderOne>All available terms:</HeaderOne>
			<FlexContainer>{displayWords()}</FlexContainer>
		</Container>
	);
};

export default compose(
	graphql(getWordsQuery, { name: 'getWordsQuery' }),
	graphql(deleteWordMutation, { name: 'deleteWordMutation' })
)(WordList);
