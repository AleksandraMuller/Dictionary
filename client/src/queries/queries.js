import { gql } from 'apollo-boost';

export const getWordsQuery = gql`
	{
		words {
			id
			name
			link
			description
			developer {
				id
				name
			}
		}
	}
`;

export const getFilteredWordsQuery = gql`
	query($filter: String) {
		filterWords(filter: $filter) {
			id
			name
			link
			description
			developer {
				id
				name
			}
		}
	}
`;

export const getDevelopersQuery = gql`
	{
		developers {
			id
			name
		}
	}
`;

export const addWordMutation = gql`
	mutation(
		$name: String!
		$description: String!
		$link: String!
		$developerId: String!
	) {
		addWord(
			name: $name
			description: $description
			link: $link
			developerId: $developerId
		) {
			name
			id
		}
	}
`;

export const addDeveloperMutation = gql`
	mutation($name: String!, $link: String!) {
		addDeveloper(name: $name, link: $link) {
			name
			id
		}
	}
`;

export const deleteWordMutation = gql`
	mutation($id: ID) {
		deleteWord(id: $id) {
			name
			id
		}
	}
`;

export const editWordMutation = gql`
	mutation(
		$id: ID
		$name: String!
		$description: String!
		$link: String!
		$developerId: String!
	) {
		updateWord(
			id: $id
			name: $name
			description: $description
			link: $link
			developerId: $developerId
		) {
			id
			name
			description
			link
			developer {
				id
			}
		}
	}
`;

export const getWordQuery = gql`
	query($id: ID) {
		word(id: $id) {
			id
			name
			description
			link
			developer {
				id
				name
				word {
					name
				}
			}
		}
	}
`;
