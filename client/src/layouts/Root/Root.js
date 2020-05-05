import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import Dashboard from '../Dashboard/Dashboard';
import MainContainer from '../MainContainer/MainContainer';
import MainView from '../MainView/MainView';
import AcceptedOrderView from '../AcceptedOrderView/AcceptedOrderView';
import TapeProductionView from '../TapeProductionView/TapeProductionView';
import StretchProductionView from '../StretchProductionView/StretchProductionView';
import Checkout from '../Checkout/Checkout';
import EditOrder from '../EditOrder/EditOrder';

import introspectionQueryResultData from '../../apollo/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    createUploadLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
    }),
  ]),
});

function Root() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Dashboard>
          <Route exact path="/" component={MainContainer} />
          <Route exact path="/new" component={MainView} />
          <Route path="/new/:orderId" component={Checkout} />
          <Route exact path="/orders" component={AcceptedOrderView} />
          <Route path="/orders/:orderId" component={EditOrder} />
          <Route path="/tape" component={TapeProductionView} />
          <Route path="/stretch" component={StretchProductionView} />
          <Route path="/transport" component={MainContainer} />
          <Route path="/raports" component={MainContainer} />
          <Route path="/settings" component={MainContainer} />
        </Dashboard>
      </Router>
    </ApolloProvider>
  );
}

export default Root;
