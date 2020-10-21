import React, { useState } from 'react';
import Input from '../components/Input';

import { graphql, Query } from 'react-apollo';
import { getFilteredWordsQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'lodash';

const MainPage = (props) => {
	const [searchTerm, setSearchTerm] = useState('');
	console.log(searchTerm);

	console.log(props);

	// props.getFilteredWordsQuery({
	// 	variables: {
	// 		filter: searchTerm,
	// 	},
	// 	refetchQueries: [{ query: getFilteredWordsQuery }],
	// });

	// const data = props.data.variables;
	// console.log(data);
	// data.filter = searchTerm;

	console.log(props);
	return (
		<>
			<Input
				label='Enter search term'
				val={searchTerm}
				setVal={setSearchTerm}
			/>
			<Query query={getFilteredWordsQuery} variables={{ filter: searchTerm }}>
				{({ loading, error, data }) => {
					if (loading) return <div>Fetching</div>;
					if (error) return <div>Error</div>;

					const termsToRender = data.filterWords;
					console.log(data);

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
		</>
	);
};

export default MainPage;
