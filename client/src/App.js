import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NavBar from './components/NavBar'
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from "./pages/SignUp"

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
})


export default function App() {


  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <NavBar />

          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile/:username' element={<Profile />} />
           
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}
