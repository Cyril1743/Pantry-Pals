import React from "react";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from 'react-router-dom'
import { useQuery } from "@apollo/client";
import { QUERY_RECIPE } from "../utils/queries";

export default function Recipe() {
    const { recipeId } = useParams()

    const { loading, data } = useQuery(QUERY_RECIPE, {
        variables: { recipeId },
        onError: (error) => console.log(error)
    })

    if (loading) {
        return <Spinner />
    }

    const recipe = data?.recipe || null
    console.log(recipe)

    if (!recipe) {
        return <p>Something went wrong</p>
    }

    console.log(data)

    return (
        <Container>
            <Heading size="md">{recipe.name}</Heading>
            <p>by: {recipe.recipeAuthor.username}</p>
            <Text>{recipe.description}</Text>
        </Container>
    )
}