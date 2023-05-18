import React from "react";
import { Container } from "@chakra-ui/react";
import { useParams } from 'react-router-dom'

export default function Recipe() {
    const { recipeId } = useParams()

    //TODO: Add the useQuery hook to get the recipe by its id

    return (
        <Container>
            <p>Nothing here!</p>
        </Container>
    )
}