import React, { useState, useEffect } from 'react';
import { FormControl, Input, FormHelperText, UnorderedList, OrderedList, ListItem, FormLabel, Button, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Alert, AlertDescription, AlertTitle, AlertDialogCloseButton, ReactFragment } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';
import { MdDragIndicator } from "react-icons/md";

import { ADD_RECIPE } from '../utils/mutations';
import { setDragging, draggedOver, compare } from '../utils/dragDrop';

import Auth from '../utils/auth';

export default function RecipeForm() {

    //States to store all the logic
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState(1);
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientAmount, setIngredientAmount] = useState(1);
    const [ingredientUnit, setIngredientUnit] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [stepsArray, setSteps] = useState([]);
    const [stepText, setStepText] = useState('');
    const [formError, setFormError] = useState('')

    const [addRecipe] = useMutation(ADD_RECIPE);

    const handleAddIngredient = (e) => {
        if (ingredientName !== ""){
            setIngredients([...ingredients, { ingredientName, ingredientAmount, ingredientUnit }]) 
            setIngredientName('')
            setIngredientAmount(1)
            setIngredientUnit('')
            const amountInput = document.getElementById('amountInput')
            amountInput.setAttribute('aria-valuenow', "1");
            amountInput.setAttribute('aria-vlauetext', "1");
            amountInput.setAttribute('value', "1");
        } else {
            setFormError("You must fill out the ingredient name")
        }
    }

    const ReorderArray = (arr) => {
        const newArr = arr;
        setIngredients(newArr)
        console.log(ingredients)
    }

    const handleAddStep = (e) => {
        if(stepText === ""){
            return setFormError("You must fill out the step description")
        }
        setStepText('')
        setSteps([...stepsArray, { stepText }])
        if (formError === "You must have at least one step!"){
            setFormError("")
        }
    }

    const removeIngrdnt = (ingrdnt) => {
        setIngredients((prevIngrdnts) => prevIngrdnts.filter((item) => item !== ingrdnt))
    }

    const removeStep = (step) => {
        setSteps((prevSteps) => prevSteps.filter((item) => item !== step))
    }

    var dragging, itemDraggedOver;

    // empty array to hold final array of step objects
    const finalStepsArray = []

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(name === ""){
           return setFormError("You must enter a recipe name!")
        }
        if(description === ""){
            return setFormError("You must enter a recipe description!")
        }
        if(ingredients.length === 0){
           return setFormError("You must enter at least one ingredient!")
        }
        if(stepsArray.length === 0){
            return setFormError("You must have at least one step!")
        }
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
            setServings(1)
            setIngredients([]);
            setIngredientName('')
            setIngredientAmount(1);
            setIngredientUnit('');
            setSteps([]);
            setStepText('');

        } catch (err) {
            console.error(err);
        }
    };

    const nameChange = (e) => {
        setName(e.target.value)
        if(formError === "You must enter a recipe name!"){
            setFormError("")
        }
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
        if(formError === "You must enter a recipe description!"){
            setFormError("")
        }
    }

    const servingsChange = (e) => {
        const recipeServings = parseInt(document.getElementById('servingsInput').getAttribute("value"))
        setServings(recipeServings)
    }

    const ingredientNameChange = (e) => {
        setIngredientName(e.target.value)
        if (formError === "You must fill out the ingredient name"){
            setFormError('')
        }
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
        if(formError === "You must fill out the step description"){
            setFormError("")
        }
    }

    return (
        <>
            {Auth.loggedIn() ? (
                <>
                {formError !== "" && 
                    <Alert status='error'>
                        <AlertTitle>Invalid input</AlertTitle>
                        <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                }
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
                                <NumberInput max={1000} min={1} defaultValue={1}>
                                    <NumberInputField id="servingsInput" value={servings} readOnly />
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
                                <FormControl isRequired>
                                    <FormLabel id='recipeLabel'>Ingredient Amount</FormLabel>
                                    <NumberInput max={1000} min={1} defaultValue={1}>
                                        <NumberInputField id="amountInput" placeholder='Ingredient Amount' value={ingredientAmount} readOnly />
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
                                    <UnorderedList styleType='none' id="ingredientList" 
                                    onDrop={(e) => { ReorderArray(compare(e, ingredients, dragging, itemDraggedOver)) }}
                                    onDragOver={(e) => { e.preventDefault()}} >
                                        {ingredients.map((ingrdnt, i) => {
                                            return (
                                                <ListItem key={i} index={i} id='itemStyling' className='ingredientItem' draggable="true" 
                                                onDragStart={(e) => { dragging = setDragging(e, i, ingrdnt)}} 
                                                onDragOver={(e) => { itemDraggedOver = draggedOver(e)} } > 
                                                    {ingrdnt.ingredientName} {ingrdnt.ingredientAmount} {ingrdnt.ingredientUnit} 
                                                    <IconButton aria-label="drag to reorder" id='dragButton' icon={<MdDragIndicator />}></IconButton>
                                                    <Button id='deleteButton' onClick={() => removeIngrdnt(ingrdnt)}>✖️</Button>
                                                </ListItem>
                                            )
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
                                            <ListItem id='itemStyling' className='buttonContainer'>Step {i + 1} - {step.stepText} 
                                                <IconButton aria-label="drag to reorder" id='dragButton' icon={<MdDragIndicator />}></IconButton>
                                                <Button id='deleteButton' onClick={() => removeStep(step)}>✖️</Button>
                                            </ListItem>
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



