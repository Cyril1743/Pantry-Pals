import React, { useState } from 'react';
import { Box, Container, FormControl, Input, FormHelperText, FormErrorMessage, Alert, AlertTitle, AlertDescription, FormLabel, Button, NumberInput, NumberInputField, Stack } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const RecipeForm = () => {

    //States to store all the logic
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState('');
    const [ingredientUnit, setIngredientUnit] = useState('');
    const [stepOrder, setStepOrder] = useState('');
    const [stepText, setStepText] = useState('');


    const [addRecipe, { error }] = useMutation(ADD_RECIPE);

    const handleAddIngredient = () => {}

    const handleAddStep = () => {}

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addRecipe({
                variables: { name, description, servings, ingredientName, ingredientAmount, ingredientUnit, stepOrder, stepText },
            });

            setName('');
            setDescription('');
            setServings('')
            setIngredientName('');
            setIngredientAmount('');
            setIngredientUnit('');
            setStepOrder('');
            setStepText('');

        } catch (err) {
            console.error(err);
        }
    };

    return (

        <Container className="recipeFormContainer">
            {Auth.loggedIn() ? (
                <React.Fragment>
                    <FormControl isRequired>
                        <FormLabel>Recipe name</FormLabel>
                        <Input placeholder='Recipe name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder='Short recipe description' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Servings</FormLabel>
                        <NumberInput min={1}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>

                    <Stack direction='column'>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Ingredient Name</FormLabel>
                                <Input placeholder='Ingredient Name' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Ingredient Amount</FormLabel>
                                <Input placeholder='Ingredient Amount' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Units</FormLabel>
                                <Input />
                                <FormHelperText>
                                    Leave blank if units are not applicable to this ingredient
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Button onClick={handleAddIngredient}>
                            <span role='img' aria-label='add'>
                                &#10133;
                            </span>
                        </Button>
                    </Stack>


                    <Stack direction='column'>
                        <FormControl isRequired>
                            <FormLabel>Step</FormLabel>
                            <Input />
                        </FormControl>
                        <Button onClick={handleAddStep}>
                            <span role='img' aria-label='add'>
                                &#10133;
                            </span>
                        </Button>
                    </Stack>

                    <Button onClick={handleFormSubmit}>Publish</Button>

                </React.Fragment>
            ) : (
                <h2>Oops, you need to log in to create a recipe!</h2>
            )}
        </Container>
    )
};

export default RecipeForm;