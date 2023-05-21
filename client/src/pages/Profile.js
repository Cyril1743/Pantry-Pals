import React from 'react'
import { Container } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import '../styles/style.css'

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

export default function Profile() {

    const { username } = useParams()

    const { data } = useQuery(
        username ? QUERY_USER : QUERY_ME,
        {
            variables: { username: username },
        }
    )
    const profile = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getUser().data.username === username) {
        return <Navigate to="/profile/me" />;
    }

    if (!profile.username) {
        return (
          <h4>
            Can not find this profile.
          </h4>
        );
    }

    return (
        <Container>
            <h2>{username ? `${profile.username}'s` : 'Your'} Profile</h2>
        </Container>
    )
}