import React from 'react'
import { Container } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

export default function Profile() {

    const { username } = useParams()

    const { data } = useQuery(
        username ? QUERY_USER : QUERY_ME,
        {
            variables: { username: username },
        }
    );
    
    console.log(data)
    const profile = data?.me || data?.user || {};
    console.log(profile)

    if (Auth.loggedIn() && Auth.getUser().data.username === username) {
        return <Navigate to="/profile/me" />;
    }

    if (!profile?.username) {
        return (
          <h4>
            Log in to see your profile page.
          </h4>
        );
    }

    return (
        <Container>
            <h2>{username ? `${profile.name}'s` : 'Your'} Profile</h2>
        </Container>
    )
}