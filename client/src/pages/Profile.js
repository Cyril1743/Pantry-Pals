import React, { useRef } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {Accordion, Container, UnorderedList, ListItem, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Button } from '@chakra-ui/react'
import { TiDeleteOutline } from 'react-icons/ti'
import { useQuery, useMutation } from '@apollo/client'
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

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

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
                    {username && profile.recipe.length > 0 ?
                        <Container>
                            <h1>{username}'s Recipes</h1>
                            <Accordion>
                                {profile.recipe.map((recipe, index) => [
                                    <AccordionItem key={index}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex='1' textAlign="left">
                                                    {recipe.name}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            {recipe.description}
                                            <UnorderedList listStyleType="none">
                                                {recipe.ingredients.map((ingredient) => <ListItem key={ingredient.ingredientName}>{ingredient.ingredientName}</ListItem>)}
                                            </UnorderedList>
                                            <Link to={`/recipe/${recipe._id}`} >View Recipe</Link>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ])}
                             </Accordion>   
                        </Container>
                        :
                        <Container>
                            {console.log(profile)}
                            <h1>My Recipes</h1>
                            <Button ref={btnRef} onClick={onOpen}>
                                My Recipes
                            </Button>
                            <Drawer
                                isOpen={isOpen}
                                placement='left'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader>Your Recipes</DrawerHeader>
                                    <DrawerBody>
                                        <Accordion>
                                            {profile.recipe.map((recipe) => {
                                                return (<AccordionItem>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'>
                                                                {recipe.name}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        {recipe.description}
                                                        <UnorderedList listStyleType="none">
                                                            {recipe.ingredients.map(ingredient => <ListItem key={ingredient.ingredientName}>{ingredient.ingredientName}</ListItem>)}
                                                        </UnorderedList>
                                                        <Link to={`/recipe/${recipe._id}`}>View Recipe</Link>
                                                        <Button className='deleteButton' id={recipe._id} onClick={handleRemoveRecipe}><TiDeleteOutline /></Button>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                                )
                                            })}
                                        </Accordion>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                            <RecipeForm />
                        </Container>
                    }
                </div>
            </div>
        </>
    );
}