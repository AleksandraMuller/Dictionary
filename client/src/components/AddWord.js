import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Input from './Input';
import {
	addWordMutation,
	getDevelopersQuery,
	getWordsQuery,
} from '../queries/queries';

const AddWord = (props) => {
	const [wordName, setWordName] = useState('');
	const [wordDescription, setWordDescription] = useState('');
	const [wordLink, setWordLink] = useState('');
	const [wordDeveloper, setWordDeveloper] = useState('');

	console.log(props);

	const displayDevelopers = () => {
		const data = props.getDevelopersQuery;
		console.log(data);
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
		props.addWordMutation({
			variables: {
				name: wordName,
				description: wordDescription,
				link: wordLink,
				developerId: wordDeveloper,
			},
			refetchQueries: [{ query: getWordsQuery }],
		});
	};

	return (
		<div className='App'>
			<form onSubmit={handleSubmit}>
				<Input label='Enter new word:' val={wordName} setVal={setWordName} />
				<Input
					label='Add description: '
					val={wordDescription}
					setVal={setWordDescription}
				/>
				<Input label='Add link:' val={wordLink} setVal={setWordLink} />
				<select
					value={wordDeveloper}
					onChange={(e) => setWordDeveloper(e.target.value)}>
					<option>Select developer</option>
					<option>none</option>
					{displayDevelopers()}
				</select>
			</form>
			<button onClick={(e) => handleSubmit(e)}>Add new word</button>
		</div>
	);
};

export default compose(
	graphql(getDevelopersQuery, { name: 'getDevelopersQuery' }),
	graphql(addWordMutation, { name: 'addWordMutation' })
)(AddWord);

// export default graphql(getDevelopersQuery)(graphql(addWordMutation)(AddWord));
// funcC(funcB(funcA(component)))

// export default compose(
// 	withApollo,
// 	graphql(getDevelopersQuery),
// 	graphql(addWordMutation)
// )(AddWord);
