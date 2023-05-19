import React, { useState } from "react";
import { Container, Heading, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, OrderedList, ListItem, Divider, UnorderedList, FormControl, Input } from "@chakra-ui/react";
import { useParams, Link } from 'react-router-dom'
import { useQuery } from "@apollo/client";
import { QUERY_RECIPE } from "../utils/queries";
import '../styles/style.css'
import auth from "../utils/auth";

export default function Recipe() {
    const { recipeId } = useParams()
    const [comment, setComment] = useState('')
    

    const { loading, data } = useQuery(QUERY_RECIPE, {
        variables: { recipeId },
        onError: (error) => console.log(error)
    })

    //TODO: Use a mutation hook to push the comment into the database
    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

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
                            return (<Tr>
                                <Td>{ingredient.ingredientName}</Td>
                                <Td>{ingredient.ingredientAmount}</Td>
                                <Td>{ingredient.ingredientUnit}</Td>
                            </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Divider />
            <Heading size="sm">Steps:</Heading>
            <OrderedList>
                {recipe.steps.map(step => <ListItem key={step.order}>{step.stepText}</ListItem>)}
            </OrderedList>
            {recipe?.comments ?
                <Container>
                    <UnorderedList>
                        {recipe.comments.map((comment) => {
                            return (<ListItem>
                                <UnorderedList>
                                    <ListItem>{comment.commentAuthor} said this at {comment.createdAt}</ListItem>
                                    <ListItem>{comment.commentText}</ListItem>
                                </UnorderedList>
                            </ListItem>
                            )
                        })}
                    </UnorderedList>
                </Container>
                :
                <Container>
                    <Text>No comments yet. Add yours below</Text>
                </Container>
            }{auth.loggedIn() ?
                <FormControl>
                    <Input
                        type="textarea"
                        value={comment}
                        placeholder="Thoughts?"
                        onChange={handleCommentChange}
                    />
                </FormControl>

                :
                <Text>You must be logged in to post. <Link to="/login">Log in</Link> or <Link to='/signUp'>Sign up</Link></Text>
            }
        </Container>
    )
}