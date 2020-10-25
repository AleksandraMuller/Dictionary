import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import StartPage from './pages/StartPage';
import ShowAllResultsPage from './pages/ShowAllResultsPage';
import AddTermPage from './pages/AddTermPage';

//apollo client setup

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
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
				</Switch>
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default App;
