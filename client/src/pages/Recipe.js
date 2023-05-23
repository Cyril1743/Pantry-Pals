import React, { useState } from "react";
import { Container, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, OrderedList, ListItem, UnorderedList, FormControl, Input} from "@chakra-ui/react";
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
    <div>
        <Container className="recipeHeader">
          <h1>{recipe.name}</h1>
          <Text>{recipe.description}</Text>
          <p>By: {recipe.recipeAuthor.username}</p>
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
        <h1 className="stepsHeader">Steps</h1>
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
          <Container className="Comments">
            <Text>No comments yet. </Text>
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
          <Text className="loginMessage">
            You must be logged in to post or comment.<Link className="loginLink" to="/login"> Log in</Link> or{" "}
            <Link className="loginLink" to="/signUp">Sign up</Link>
          </Text>
        )}
      </Container>
    </div>

  );
}