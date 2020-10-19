import { gql } from 'apollo-boost';

export const getWordsQuery = gql`
	{
		words {
			id
			name
			description
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
