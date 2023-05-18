import React, { useState } from 'react';
import { Container, FormControl, Input, FormHelperText, FormErrorMessage, Alert, AlertTitle, AlertDescription, FormLabel, Button } from "@chakra-ui/react";
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
    
    <Container className="recipeContainer">
        {Auth.loggedIn() ? (
            <h2>The form will go here</h2>
        ) : (
            <h2>Oops, you need to log in to create a recipe!</h2>
        )} 
    </Container>
)
};

export default RecipeForm;