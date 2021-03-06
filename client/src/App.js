import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import StartPage from './pages/StartPage';
import ShowAllResultsPage from './pages/ShowAllResultsPage';
import AddTermPage from './pages/AddTermPage';
import DetailsPage from './pages/DetailsPage';
import AddDeveloperPage from './pages/AddDeveloperPage';

//apollo client setup

const client = new ApolloClient({
	uri: 'https://dictionaryforweb.herokuapp.com/graphql',
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Switch>
					{' '}
					<Route path='/' exact component={StartPage} />
					<Route path='/search' exact component={SearchPage} />
					<Route path='/allResults' exact component={ShowAllResultsPage} />
					<Route path='/add' exact component={AddTermPage} />
					<Route path='/details' exact component={DetailsPage} />
					<Route path='/addDeveloper' exact component={AddDeveloperPage} />
				</Switch>
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default App;
