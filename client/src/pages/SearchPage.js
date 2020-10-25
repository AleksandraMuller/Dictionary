import React, { useState } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Input from '../components/Input';
import { getFilteredWordsQuery } from '../queries/queries';
import hero from '../assets/hero.jpg';

const Container = styled.div`
	background-image: url(${hero});
	background-size: cover;
	opacity: 0.5;
	width: 100%;
	height: 100%;
`;

const MainContainer = styled.div`
	width: 100%;
	height: 100vh;
`;

const SearchPage = (props) => {
	const [searchTerm, setSearchTerm] = useState('');
	console.log(props);

	return (
		<MainContainer>
			<Input
				label='Enter search term'
				val={searchTerm}
				setVal={setSearchTerm}
			/>
			<Container>
				<Query query={getFilteredWordsQuery} variables={{ filter: searchTerm }}>
					{({ loading, error, data }) => {
						if (loading) return <div>Fetching</div>;
						if (error) return <div>Error</div>;

						const termsToRender = data.filterWords;

						return (
							<div>
								{termsToRender !== null &&
									searchTerm !== '' &&
									termsToRender.map((term) => (
										<div key={term.id}>{term.name}</div>
									))}
							</div>
						);
					}}
				</Query>
			</Container>
		</MainContainer>
	);
};

export default SearchPage;
