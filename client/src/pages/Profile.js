import React, { useRef } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import {Accordion, UnorderedList, ListItem, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Button, Spinner } from '@chakra-ui/react'
import { TiDeleteOutline } from 'react-icons/ti'
import { useQuery, useMutation } from '@apollo/client'
import RecipeForm from '../components/RecipeForm'
import '../styles/style.css'
import {REMOVE_RECIPE } from "../utils/mutations";

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


export default function Profile() {
    const [removeRecipe, {loading,}] = useMutation(REMOVE_RECIPE);

    const { username } = useParams();

    const { data, refetch } = useQuery(
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
            refetch()
        } catch (err) {
          console.log(err)
        } 
      }

      if (loading){
        return <Spinner />
      }

    return (
        <>

            <div className='profileContainer'>
                <div>
                    {username && profile.recipe.length > 0 ?
                        <div>
                            <h1 className='recipeHeader'>{username}'s Recipes</h1>
                            <Accordion allowToggle>
                                {profile.recipe.map((recipe, index) => [
                                    <AccordionItem mb={4} key={index}>
                                        <h2 className='accordianStyling'>
                                            <AccordionButton>
                                                <Box style={{fontSize: '20px'}} flex='1' textAlign="left">
                                                    {recipe.name}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            {recipe.description}
                                            <UnorderedList listStyleType="none" className='accordianStyling2'>
                                                {recipe.ingredients.map((ingredient) => <ListItem key={ingredient.ingredientName}>{ingredient.ingredientName}</ListItem>)}
                                            </UnorderedList>
                                            <Link className='accordianStyling3' to={`/recipe/${recipe._id}`} >View Recipe</Link>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ])}
                             </Accordion>   
                        </div>
                        :
                        <div>
                            <div id='recipesButton'>
                            <Button id="myRecipes" ref={btnRef} onClick={onOpen}>
                                My Recipes
                            </Button>
                            </div>
                            <h1 className='createHeader'> Create Your Own Recipe!</h1>
                            <Drawer
                                isOpen={isOpen}
                                placement='left'
                                onClose={onClose}
                            >
                                <DrawerOverlay />
                                <DrawerContent style={{backgroundColor: '#FFFDCA'}}>
                                    <DrawerCloseButton />
                                    <DrawerHeader className='drawerHeader'>Your Recipes</DrawerHeader>
                                    <DrawerBody>
                                        <Accordion allowToggle>
                                            {profile.recipe.map((recipe, index) => {
                                                return (<AccordionItem mb={4} key={index}>
                                                    <h2 className='accordianStyling'>
                                                        <AccordionButton>
                                                            <Box flex='1' textAlign='left'>
                                                                {recipe.name}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        {recipe.description}
                                                        <UnorderedList listStyleType={ 'none' } className='accordianStyling2'>
                                                            {recipe.ingredients.map(ingredient => <ListItem key={ingredient.ingredientName}>{ingredient.ingredientName.charAt(0).toUpperCase() + ingredient.ingredientName.slice(1)}</ListItem>)}
                                                        </UnorderedList>
                                                        <Link className='accordianStyling3' to={`/recipe/${recipe._id}`}>View Recipe</Link>
                                                        <Button className='deleteButton' id={recipe._id} onClick={handleRemoveRecipe}><TiDeleteOutline id={recipe._id}/></Button>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                                )
                                            })}
                                        </Accordion>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                            <RecipeForm />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}