import React from "react";
import { Container, Heading, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, OrderedList, ListItem, Divider } from "@chakra-ui/react";
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
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>
                                Name:
                            </Th>
                            <Th>
                                Amount:
                            </Th>
                            <Th>
                                Measurement:
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipe.ingredients.map((ingredient) => {
                           return( <Tr>
                                <Td>{ingredient.ingredientName}</Td>
                                <Td>{ingredient.ingredientAmount}</Td>
                                <Td>{ingredient.ingredientUnit}</Td>
                            </Tr>
                        )})}
                    </Tbody>
                </Table>
            </TableContainer>
            <Divider />
            <Heading size="sm">Steps:</Heading>
            <OrderedList>
                {recipe.steps.map(step => <ListItem key={step.order}>{step.stepText}</ListItem>)}
            </OrderedList>
        </Container>
    )
}