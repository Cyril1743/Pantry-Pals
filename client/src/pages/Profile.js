import React from 'react'
import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export default function Profile() {
    //TODO: Use the useQuery hook to get profile info

    const { username } = useParams()

    return (
        <Container>
            Nothing here for now
        </Container>
    )
}