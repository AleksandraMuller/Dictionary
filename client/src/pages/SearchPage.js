import React, { useState } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import Input from '../components/Input';
import MenuPage from './MenuPage';
import { Navbar, Anchor } from '../styles/Reusables';
import {
	getFilteredWordsQuery,
	deleteWordMutation,
	getWordsQuery,
} from '../queries/queries';
import heroResized from '../assets/heroresized.jpg';
import { ReactComponent as DeleteLogo } from '../assets/close-circle.svg';
import { ReactComponent as SettingsLogo } from '../assets/create-outline.svg';

const Container = styled.div`
	background-image: url(${heroResized});
	background-size: cover;
	background-repeat: repeat;
	opacity: 0.5;
	width: 100%;
	min-height: 100%;
	position: fixed;
	background-color: #000;
`;

const MainContainer = styled.div`
	width: 100%;
	min-height: 300vh;
	overflow: hidden;
	@media (min-width: 450px) {
	}
	@media (min-width: 767px) {
		min-height: 200vh;
	}
	@media (min-width: 1200px) {
		min-height: 100vh;
	}
	@media (min-width: 1800px) {
	}
`;

const TermContainer = styled.div`
	position: absolute;
	top: 15rem;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

const TermButton = styled.button`
	color: #fff;
	background-color: #333;
	width: 14rem;
	height: 4rem;
	border: none;
	cursor: pointer;
	font-family: 'Open Sans Condensed', sans-serif;
	font-size: 1.5rem;
	margin: 1rem;
	&:hover {
		background-color: #dc681b;
	}
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

const ButtonContainer = styled.div``;

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

const Wrapper = styled.div`
	color: #fff;
	position: absolute;
	z-index: 50000;
	font-family: 'Open Sans Condensed', sans-serif;
	top: 3rem;
`;

const SearchPage = (props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteTerm, setIsDeleteTerm] = useState(false);

	console.log(props);
	let history = useHistory();

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleDetailsWord = (e, word) => {
		e.preventDefault();
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
			refetchQueries: [
				{ query: getFilteredWordsQuery, variables: { filter: searchTerm } },
				{ query: getWordsQuery },
			],
		});
	};

	const handleSettingsMenu = () => {
		setIsEditOpen(!isEditOpen);
	};

	return (
		<MainContainer>
			{!isOpen && (
				<>
					<Container></Container>

					<Input
						label='Enter search term'
						val={searchTerm}
						setVal={setSearchTerm}
					/>
					<Query
						query={getFilteredWordsQuery}
						variables={{ filter: searchTerm }}>
						{({ loading, error, data }) => {
							if (loading) return <div>Fetching</div>;
							if (error) return <div>Error</div>;

							const termsToRender = data.filterWords;

							return (
								<TermContainer>
									{termsToRender !== null &&
										searchTerm !== '' &&
										termsToRender.map((term) => (
											<ButtonContainer>
												<TermButton
													key={term.id}
													onClick={(e) => handleDetailsWord(e, term)}>
													{term.name}
												</TermButton>
												{isDeleteTerm && (
													<LogoButton onClick={(e) => handleDelete(e, term.id)}>
														<StyledDeleteLogo />
													</LogoButton>
												)}
											</ButtonContainer>
										))}
								</TermContainer>
							);
						}}
					</Query>
					<Wrapper>
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
									{/* <LogoButtonSettingsMenu>Edit term</LogoButtonSettingsMenu> */}
								</SettingsContainer>
							)}
							{!isEditOpen && (
								<SettingsContainerHide>
									<LogoButtonSettingsMenu>Delete term</LogoButtonSettingsMenu>
									{/* <LogoButtonSettingsMenu>Edit term</LogoButtonSettingsMenu> */}
								</SettingsContainerHide>
							)}
						</FlexContainerMenu>
					</Wrapper>
				</>
			)}
			<Anchor onClick={handleClick}>
				<Navbar>{isOpen ? 'close' : 'menu'}</Navbar>
			</Anchor>
			<MenuPage isOpen={isOpen} setIsOpen={setIsOpen} />{' '}
		</MainContainer>
	);
};

export default compose(
	graphql(getWordsQuery, { name: 'getWordsQuery' }),
	graphql(deleteWordMutation, { name: 'deleteWordMutation' })
)(SearchPage);
