import _ from 'lodash';
import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} from 'graphql';
import Word from '../models/Word';
import Developer from '../models/Developer';

const WordType = new GraphQLObjectType({
	name: 'Word',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		link: { type: GraphQLString },
		developer: {
			type: DeveloperType,
			resolve(parent, args) {
				// console.log(parent);
				// return _.find(developers, { id: parent.developerId });
				return Developer.findById(parent.developerId);
			},
		},
	}),
});

const DeveloperType = new GraphQLObjectType({
	name: 'Developer',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		link: { type: GraphQLString },
		word: {
			type: new GraphQLList(WordType),
			resolve(parent, args) {
				// return _.filter(words, { developerId: parent.id });
				return Word.find({ developerId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		word: {
			type: WordType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(words, { id: args.id });
				//to get code from db or other source
				return Word.findById(args.id);
			},
		},
		developer: {
			type: DeveloperType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(developers, { id: args.id });
				//to get code from db or other source
				return Developer.findById(args.id);
			},
		},
		words: {
			type: new GraphQLList(WordType),
			resolve(parent, args) {
				// return words;
				return Word.find({});
			},
		},
		developers: {
			type: new GraphQLList(DeveloperType),
			resolve(parent, args) {
				// return developers;
				return Developer.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDeveloper: {
			type: DeveloperType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				link: {
					type: new GraphQLNonNull(GraphQLString),
				},
			},
			resolve(parent, args) {
				let developer = new Developer({
					name: args.name,
					link: args.link,
				});
				return developer.save();
			},
		},
		addWord: {
			type: WordType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				description: {
					type: new GraphQLNonNull(GraphQLString),
				},
				link: {
					type: new GraphQLNonNull(GraphQLString),
				},
				developerId: {
					type: new GraphQLNonNull(GraphQLString),
				},
			},
			resolve(parent, args) {
				let word = new Word({
					name: args.name,
					description: args.description,
					link: args.link,
					developerId: args.developerId,
				});
				return word.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
