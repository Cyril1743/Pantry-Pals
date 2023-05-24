import React, { useState } from 'react';
import { FormControl, Input, FormHelperText, UnorderedList, OrderedList, ListItem, FormLabel, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack } from "@chakra-ui/react";
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
    const [stepsArray, setSteps] = useState([]);
    const [stepText, setStepText] = useState('');

    const [addRecipe, { error }] = useMutation(ADD_RECIPE);

    const handleAddIngredient = (e) => {
        setIngredientName('')
        setIngredientAmount('')
        setIngredientUnit('')
        setIngredients([...ingredients, { ingredientName, ingredientAmount, ingredientUnit }])
    }

    const handleAddStep = (e) => {
        setStepText('')
        setSteps([...stepsArray, { stepText }])
    }

    const removeIngrdnt = (ingrdnt) => {
        setIngredients((prevIngrdnts) => prevIngrdnts.filter((item) => item !== ingrdnt))
    }

    const removeStep = (step) => {
        setSteps((prevSteps) => prevSteps.filter((item) => item !== step))
    }

    // empty array to hold final array of step objects
    const finalStepsArray = []

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const finalSteps = () => {
                stepsArray.forEach((step, i) => {
                    finalStepsArray.push({ stepText: step.stepText, order: i + 1 })
                })
            }

            finalSteps()

            const data = await addRecipe({
                variables: { name, description, servings, ingredients, steps: finalStepsArray },
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
        const recipeServings = parseInt(document.getElementById('servingsInput').getAttribute("value"))
        setServings(recipeServings)
    }

    const ingredientNameChange = (e) => {
        setIngredientName(e.target.value)
    }

    const ingredientAmountChange = (e) => {
        const recipeIngAmnt = parseInt(document.getElementById('amountInput').getAttribute("value"))
        setIngredientAmount(recipeIngAmnt)
    }

    const ingredientUnitChange = (e) => {
        setIngredientUnit(e.target.value)
    }

    const stepChange = (e) => {
        setStepText(e.target.value)
    }

    return (
        <>
            {Auth.loggedIn() ? (
                <>
                    <div className="row">
                        <div className='column'>
                            <FormControl id="recipeStyling" isRequired>
                                <FormLabel id='recipeLabel'>Recipe name</FormLabel>
                                <Input placeholder='Recipe name' onChange={nameChange} value={name} />
                            </FormControl>
                        </div>
                        <div className='column'>
                            <FormControl id="recipeStyling" isRequired>
                                <FormLabel id='recipeLabel'>Description</FormLabel>
                                <Input placeholder='Short recipe description' onChange={descriptionChange} value={description} />
                            </FormControl>
                        </div>
                        <div className='column'>
                            <FormControl id="recipeStyling" isRequired>
                                <FormLabel id='recipeLabel'>Servings</FormLabel>
                                <NumberInput max={1000} min={1}>
                                    <NumberInputField id="servingsInput" value={servings}/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper onClick={servingsChange} />
                                        <NumberDecrementStepper onClick={servingsChange} />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </div>
                    </div>

                    <Stack direction='column'>
                        <div className="row">
                            <div className='column'>
                                <FormControl id='recipeStyling' isRequired>
                                    <FormLabel id='recipeLabel'>Ingredient Name</FormLabel>
                                    <Input placeholder='Ingredient Name' onChange={ingredientNameChange} value={ingredientName} />
                                </FormControl>
                            </div>
                            <div className='column'>
                                <FormControl id='recipeStyling' isRequired>
                                    <FormLabel id='recipeLabel'>Ingredient Amount</FormLabel>
                                    <NumberInput max={1000} min={1}>
                                        <NumberInputField id="amountInput" placeholder='Ingredient Amount' value={ingredientAmount} />
                                        <NumberInputStepper >
                                            <NumberIncrementStepper onClick={ingredientAmountChange} />
                                            <NumberDecrementStepper onClick={ingredientAmountChange} />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </div>
                            <div className='column'>
                                <FormControl id='recipeStyling'>
                                    <FormLabel id='recipeLabel'>Units</FormLabel>
                                    <Input onChange={ingredientUnitChange} value={ingredientUnit} />
                                    <FormHelperText>
                                        Leave blank if units are not applicable to this ingredient
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <div className='row2'>
                                <div className='column4'>
                                    <Button id='addIngredientButton' onClick={handleAddIngredient}>Add Ingredient</Button>
                                </div>
                                <div id="addedIngredients" className='column4'>
                                <h1 className="ingredientsTitle">Ingredients Added:</h1>
                                    <UnorderedList styleType='none'>
                                        {ingredients.map((ingrdnt, i) => {
                                            return (
                                                <div key={i} className='ingredientItem'>
                                                    <ListItem id='itemStyling' className='buttonContainer'> {ingrdnt.ingredientName} {ingrdnt.ingredientAmount} {ingrdnt.ingredientUnit} <Button id='deleteButton' onClick={() => removeIngrdnt(ingrdnt)}>✖️</Button></ListItem>
                                                </div>)
                                        })}
                                    </UnorderedList>
                                </div>
                            </div>
                        </div>
                    </Stack>
                    <div className="row2">
                        <div className='column4'>
                                <FormControl id="recipeStyling" isRequired>
                                    <FormLabel id='recipeLabel'>Step</FormLabel>
                                    <Input onChange={stepChange} value={stepText} />
                                    <FormHelperText>
                                        Break down each step of the process then click 'Add Step'
                                    </FormHelperText>
                                </FormControl>
                                <Button id="addIngredientButton" mt={3} onClick={handleAddStep}>Add Step</Button>
                        </div>
                        <div id='addedSteps' className='column4'>
                            <h1 className='ingredientsTitle'>Steps Added:</h1>
                            <OrderedList styleType='none'>
                                {stepsArray.map((step, i) => {
                                    return (
                                        <div key={i}>
                                            <ListItem id='itemStyling' className='buttonContainer'>Step {i + 1} - {step.stepText} <Button id='deleteButton' onClick={() => removeStep(step)}>✖️</Button></ListItem>
                                        </div>)
                                })}
                            </OrderedList>
                            </div>
                    </div>

                    <Button id="publishRecipe" mb={1} onClick={handleFormSubmit}>Publish Recipe</Button>
                </>
            ) : (
                <h2>Something went wrong. Please log in to create a recipe.</h2>
            )}
        </>
    )
};



