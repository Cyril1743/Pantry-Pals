import React, { useState } from "react";
import { Container, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, OrderedList, ListItem, UnorderedList, FormControl, Input, Button, Center } from "@chakra-ui/react";
import { useParams, Link } from 'react-router-dom'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_RECIPE } from "../utils/queries";
import '../styles/style.css';
import auth from "../utils/auth";
import { ADD_COMMENT, REMOVE_RECIPE, REMOVE_COMMENT } from "../utils/mutations";

export default function Recipe() {
  const { recipeId } = useParams();
  const [comment, setComment] = useState('');

const {data, loading, refetch} = useQuery(QUERY_RECIPE, {variables: {recipeId: recipeId}});
    const [addComment] = useMutation(ADD_COMMENT);
    const [removeComment] = useMutation(REMOVE_COMMENT);
    const [removeRecipe] = useMutation(REMOVE_RECIPE);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    // mutation hook to push the comment into the database
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.length > 1) {
            addComment({ variables: { recipeId: recipeId, commentText: comment } });
            setComment('');
            refetch().then(() => {console.log("Data refetched")});
        }
    }

    const handleRemoveComment = async (e) => {
      e.preventDefault()
      try {
        await removeComment({ variables: { recipeId: recipe._id, commentId: comment._id } })
      } catch (err) {
        console.log(err)
      } 
    }

    const handleRemoveRecipe = async (e) => {
      e.preventDefault()
      try {
        await removeRecipe({ variables: { recipeId: recipe._id } })
      } catch (err) {
        console.log(err)
      } 
    }

  }

  if (loading) {
    return <Spinner />
  }

  const recipe = data?.recipe || null

  if (!recipe) {
    return <p>Something went wrong</p>
  }

  return (
    <div>
        <Container className="recipeHeader">
          <h1>{recipe.name}</h1>
          <Text>{recipe.description}</Text>
          <p>By: {recipe.recipeAuthor.username}</p>
          {auth.loggedIn() && auth.getUser().data.username === recipe.recipeAuthor.username ? (
            <Button className='deleteButton' onClick={() => handleRemoveRecipe(recipe._id)}>✖️</Button>
          ) : (
            <Link to={'/profile/'+ recipe.recipeAuthor.username}>See more recipes by this author</Link>
          )}
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
        <h1 className='stepsHeader'>Comments</h1>
        {recipe?.comments ? (
          <Container>
            <UnorderedList className="stepsList" listStyleType="none">
              {recipe.comments.map((comment, index) => (
                <ListItem key={index}>
                  <UnorderedList listStyleType="none">
                    <ListItem id='commentStyling'>
                      {comment.commentAuthor.username} at {comment.createdAt}
                    </ListItem>
                    <ListItem color={'#FF9191'}>{comment.commentText}</ListItem>
                    {auth.loggedIn() && auth.getUser().data.username === comment.commentAuthor.username} ? (
                      <Button className='deleteButton' onClick={() => handleRemoveComment(recipe._id, comment._id)}>✖️</Button>
                    )
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
          <React.Fragment id='commentContainer'>
            <FormControl mt={3} id='commentForm'>
              <Input
                type="textarea"
                value={comment}
                placeholder="Let them know if you loved their recipe!"
                onChange={handleCommentChange}
              />
            </FormControl>
            <Center >
              <Button id='commentButton' onClick={handleCommentSubmit}>Comment</Button>
            </Center>
          </React.Fragment>
        ) : (
          <Text mt={6} className="loginMessage">
            You must be logged in to post or comment.<Link className="loginLink" to="/login"> Log in</Link> or{" "}
            <Link className="loginLink" to="/signUp">Sign up</Link>
          </Text>
        )}
      </Container>
    </div>

  );
}