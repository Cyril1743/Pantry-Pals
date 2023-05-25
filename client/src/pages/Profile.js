import React from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Container, UnorderedList, ListItem, Button } from '@chakra-ui/react'
import RecipeForm from '../components/RecipeForm'
import '../styles/style.css'
import {REMOVE_RECIPE } from "../utils/mutations";

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

export default function Profile() {
    const [removeRecipe] = useMutation(REMOVE_RECIPE);

    const { username } = useParams();

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

    const handleRemoveRecipe = async (e) => {
        e.preventDefault()
        try {
            const deleteRecipeID = e.target.getAttribute('id')
            await removeRecipe({ variables: { recipeId: deleteRecipeID } })
        } catch (err) {
          console.log(err)
        } 
      }

    return (
        <>
        <div className='profileContainer'>
            <div>
                {username && profile.recipe.length>0 ? 
                    <Container>
                        <h1>{username}'s Recipes</h1>
                        <UnorderedList styleType='none'>
                            {profile.recipe.map((recipe) => (
                                <ListItem key={recipe._id}>
                                    <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Container>
                : 
                    <Container>
                        <h1>My Recipes</h1>
                        <UnorderedList styleType='none'>
                            {profile.recipe.map((recipe) => (
                                <ListItem key={recipe._id}>
                                    <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
                                    <Button className='deleteButton' id={`${recipe._id}`} onClick={handleRemoveRecipe}>✖️</Button>
                                </ListItem>
                            ))}
                        </UnorderedList>


                            <RecipeForm />
                        </Container>
                    }
                </div>
            </div>
        </>
    );
}