import React, { useState } from 'react';
import { Box, Container, FormControl, Input, FormHelperText, UnorderedList, OrderedList, ListItem, FormErrorMessage, Alert, AlertTitle, AlertDescription, FormLabel, Button, NumberInput, NumberInputField, Stack } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';

export default function RecipeForm() {

    //States to store all the logic
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState('');
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState('');
    const [ingredientUnit, setIngredientUnit] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepText, setStepText] = useState('');

    const [addRecipe, { error }] = useMutation(ADD_RECIPE);

    const handleAddIngredient = (e) => {
        setIngredientName('')
        setIngredientAmount('')
        setIngredientUnit('')
        setIngredients([...ingredients, {ingredientName, ingredientAmount, ingredientUnit}])
    }
    
    const handleAddStep = (e) => {
        setStepText('')
        setSteps([...steps, {stepText}])
    }

    const removeIngrdnt = (ingrdnt) => {
        setIngredients((prevIngrdnts) => prevIngrdnts.filter((item) => item !== ingrdnt))
    }

    const removeStep = (step) => {
        setSteps((prevSteps) => prevSteps.filter((item) => item !== step))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addRecipe({
                variables: { name, description, servings, ingredients, steps },
            });

            setName('');
            setDescription('');
            setServings('')
            setIngredients([]);
            setIngredientName('')
            setIngredientAmount('');
            setIngredientUnit('');
            setSteps([]);
            setStepText('');

        } catch (err) {
            console.error(err);
        }
    };

    const nameChange = (e) => {
        setName(e.target.value)
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const servingsChange = (e) => {
        setServings(e.target.value)
    }

    const ingredientNameChange = (e) => {
        setIngredientName(e.target.value)
    }

    const ingredientAmountChange = (e) => {
        setIngredientAmount(e.target.value)
    }

    const ingredientUnitChange = (e) => {
        setIngredientUnit(e.target.value)
    }

    const stepChange = (e) => {
        setStepText(e.target.value)
    }
    
    return (
        <Container className="recipeFormContainer">
            {Auth.loggedIn() ? (
                <React.Fragment>
                    <FormControl isRequired>
                        <FormLabel>Recipe name</FormLabel>
                        <Input placeholder='Recipe name' onChange={nameChange} value={name}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder='Short recipe description' onChange={descriptionChange} value={description}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Servings</FormLabel>
                        <NumberInput min={1}>
                            <NumberInputField onChange={servingsChange} value={servings}/>
                        </NumberInput>
                    </FormControl>

                    <Stack direction='column'>
                        <UnorderedList styleType='none'>
                            {ingredients.map((ingrdnt) => {
                                return (
                                    <React.Fragment key={ingrdnt}>
                                        <ListItem>{ingrdnt.ingredientName} {ingrdnt.ingredientAmount} {ingrdnt.ingredientUnit}</ListItem>
                                        <Button onClick={() => removeIngrdnt(ingrdnt)}>
                                            <span role='img' aria-label='delete'>
                                                ✖️
                                            </span>
                                        </Button>
                                    </React.Fragment>)
                            })}
                        </UnorderedList>
                        <Box className='IngredientBox'>
                            <FormControl isRequired>
                                <FormLabel>Ingredient Name</FormLabel>
                                <Input placeholder='Ingredient Name' onChange={ingredientNameChange} value={ingredientName}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Ingredient Amount</FormLabel>
                                <Input placeholder='Ingredient Amount' onChange={ingredientAmountChange} value={ingredientAmount}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Units</FormLabel>
                                <Input onChange={ingredientUnitChange} value={ingredientUnit}/>
                                <FormHelperText>
                                    Leave blank if units are not applicable to this ingredient
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Button onClick={handleAddIngredient} >
                            <span role='img' aria-label='add'>
                                &#10133;
                            </span>
                        </Button>
                        
                    </Stack>


                    <Stack direction='column'>
                        <OrderedList styleType='none'>
                            {steps.map((step, i) => {
                                return (
                                    <React.Fragment key={step}>
                                        <ListItem>Step {i+1} - {step.stepText}</ListItem>
                                        <Button onClick={() => removeStep(step)}>
                                            <span role='img' aria-label='delete'>
                                                ✖️
                                            </span>
                                        </Button>
                                    </React.Fragment>)
                            })}
                        </OrderedList>
                        <Box className='stepBox'>
                        <FormControl isRequired>
                            <FormLabel>Step</FormLabel>
                            <Input onChange={stepChange} value={stepText}/>
                        </FormControl>
                        </Box>
                        <Button onClick={handleAddStep}>
                            <span role='img' aria-label='add'>
                                &#10133;
                            </span>
                        </Button>
                    </Stack>

                    <Button mb={10} onClick={handleFormSubmit}>Publish</Button>

                </React.Fragment>
            ) : (
                <h2>Something went wrong. Please log in to create a recipe.</h2>
            )}
        </Container>
    )
};

// TODO: add these lines to the Profile.js in the pages folder
// import RecipeForm from '../components/RecipeForm'
/* <div>{username ? `List of Recipes` : <RecipeForm />}</div> */

