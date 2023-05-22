import React, { useState } from "react";
<<<<<<< Updated upstream
import { Container, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, OrderedList, ListItem, UnorderedList, FormControl, Input} from "@chakra-ui/react";
=======
import { Container, Heading, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, OrderedList, ListItem, Divider, UnorderedList, FormControl, Input, Button } from "@chakra-ui/react";
>>>>>>> Stashed changes
import { useParams, Link } from 'react-router-dom'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_RECIPE } from "../utils/queries";
import '../styles/style.css'
import auth from "../utils/auth";
import { ADD_COMMENT } from "../utils/mutations";

export default function Recipe() {
<<<<<<< Updated upstream
  const { recipeId } = useParams()
  const [comment, setComment] = useState('')
=======
    const { recipeId } = useParams()
    const [comment, setComment] = useState('')

>>>>>>> Stashed changes


<<<<<<< Updated upstream
  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { recipeId },
    onError: (error) => console.log(error)
  })

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  if (loading) {
    return <Spinner />
  }
=======
    const [addComment, { error }] = useMutation(ADD_COMMENT)

    //TODO: Use a mutation hook to push the comment into the database
    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        if (comment.length > 1) {
            addComment({ variables: { recipeId: recipeId, commentText: comment } })
        }

    }

    if (loading) {
        return <Spinner />
    }

    const recipe = data?.recipe || null
>>>>>>> Stashed changes

  const recipe = data?.recipe || null
  console.log(recipe)

<<<<<<< Updated upstream
  if (!recipe) {
    return <p>Something went wrong</p>
  }

  console.log(data)

  return (
    <div>
        <Container className="recipeHeader">
          <h1>{recipe.name}</h1>
          <Text>{recipe.description}</Text>
          <p>By: {recipe.recipeAuthor.username}</p>
=======
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
                        {recipe.ingredients.map((ingredient, index) => {
                            return (<Tr key={index}>
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
            <Heading size="md">Comments:</Heading>
            {recipe?.comments ? (
                <Container>
                    <UnorderedList>
                        {recipe.comments.map((comment) => {
                            return (<ListItem key={comment._id}>
                                <UnorderedList>
                                    <ListItem>{comment.commentAuthor} said this at {comment.createdAt}</ListItem>
                                    <ListItem>{comment.commentText}</ListItem>
                                </UnorderedList>
                            </ListItem>
                            )
                        })}
                    </UnorderedList>
                </Container>
            ) : (
                <Container>
                    <Text>No comments yet. Add yours below</Text>
                </Container>
            )
            }{auth.loggedIn() ? (
                <Container>
                <FormControl>
                    <Input
                        type="textarea"
                        value={comment}
                        placeholder="Thoughts?"
                        onChange={handleCommentChange}
                    />
                </FormControl>
                <Button onClick={handleCommentSubmit}>Submit</Button>
                </Container>
            ) : (
                <Text>You must be logged in to post. <Link to="/login">Log in</Link> or <Link to='/signUp'>Sign up</Link></Text>
            )}
>>>>>>> Stashed changes
        </Container>
            <Container className="ingredientsContainer">
              <TableContainer className="measurementStyling">
                <Table>
                  <Thead className="measurementFields">
                    <Tr>
                      <Th>Ingredient:</Th>
                      <Th>Amount:</Th>
                      <Th>Measurement:</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recipe.ingredients.map((ingredient) => (
                      <Tr key={ingredient.ingredientName}>
                        <Td>
                          {ingredient.ingredientName.charAt(0).toUpperCase() +
                            ingredient.ingredientName.slice(1)}
                        </Td>
                        <Td>{ingredient.ingredientAmount}</Td>
                        <Td>
                          {ingredient.ingredientUnit.charAt(0).toUpperCase() +
                            ingredient.ingredientUnit.slice(1)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Container>
      <Container className="stepsContainer">
        <h1 className="stepsHeader">Steps:</h1>
        <OrderedList className="stepsList">
          {recipe.steps.map((step) => (
            <ListItem key={step.order}>{step.stepText}</ListItem>
          ))}
        </OrderedList>
      </Container>
      <Container>
        {recipe?.comments ? (
          <Container>
            <UnorderedList>
              {recipe.comments.map((comment) => (
                <ListItem key={comment.createdAt}>
                  <UnorderedList>
                    <ListItem>
                      {comment.commentAuthor} said this at {comment.createdAt}
                    </ListItem>
                    <ListItem>{comment.commentText}</ListItem>
                  </UnorderedList>
                </ListItem>
              ))}
            </UnorderedList>
          </Container>
        ) : (
          <Container>
            <Text>No comments yet. Add yours below</Text>
          </Container>
        )}
        {auth.loggedIn() ? (
          <FormControl>
            <Input
              type="textarea"
              value={comment}
              placeholder="Thoughts?"
              onChange={handleCommentChange}
            />
          </FormControl>
        ) : (
          <Text>
            You must be logged in to post. <Link to="/login">Log in</Link> or{" "}
            <Link to="/signUp">Sign up</Link>
          </Text>
        )}
      </Container>
    </div>

  );
}