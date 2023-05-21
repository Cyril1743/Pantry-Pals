import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client"
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';


import Home from './pages/Home';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from "./pages/SignUp"
import Recipe from './pages/Recipe';

const httpLink = createHttpLink({
  uri: "/graphql",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    <div className='background'>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router >
          <NavBar />

          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile/:username' element={<Profile />} />
            <Route path='/profile/me' element={<Profile />} />
            <Route path='/recipe/:recipeId' element={<Recipe />} />
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
    </div>
  );
}
