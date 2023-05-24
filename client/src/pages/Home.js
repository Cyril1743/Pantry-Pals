import React, { useState, useRef, useEffect } from 'react';
import { Input, Container, UnorderedList, ListItem, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'
import { QUERY_INGREDIENT_NAME, QUERY_RECIPE_NAME } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../utils/actions';
import { useIngredientContext } from '../utils/ingredientContext';
import '../styles/style.css';

export default function Home() {
  const [searchName, setSearchName] = useState('');
  const [searchIngrdnts, setSearchIngrdnts] = useState([]);
  const [currentIngrdnt, setCurrentIngrdnt] = useState('');
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef(null)

  //Initialize the context variable
  const { state, dispatch } = useIngredientContext()

  //Query for searching by name
  const [searchRecipes] = useLazyQuery(QUERY_RECIPE_NAME, {
    onCompleted: (result) => {
      setSuggestions(result.suggestRecipe);
    }
  })
  const [suggestions, setSuggestions] = useState([]);

  //Query for searching by ingredients
  const [searchRecipeIngredients] = useLazyQuery(QUERY_INGREDIENT_NAME, {
    onCompleted: (result) => {
      const { suggestIngredient } = result;
      const resultArray = [];
      suggestIngredient.forEach((recipe) => {
        resultArray.push(recipe);
      })
      ingrdntsSuggestions.forEach((recipe) => {
        resultArray.push(recipe);
      })

      setIngrdntsSuggestions(resultArray);
    }
  })
  const [ingrdntsSuggestions, setIngrdntsSuggestions] = useState([]);

  useEffect(() => {
    if (state.length > 0){
      setSearchIngrdnts(state)
    }
  }, [state])

  useEffect(() => {
    if (inputRef.current && expanded) {
      inputRef.current.focus()
    }
  }, [expanded])

  //UseEffect for searching by name
  useEffect(() => {
    if (searchName.trim().length > 0) {
      searchRecipes({ variables: { name: searchName } });
    } else {
      setSuggestions([]);
    }
  }, [searchRecipes, searchName]);

  //UseEffect for searching by ingredient
  useEffect(() => {
    if (searchIngrdnts.length > 0) {
      setIngrdntsSuggestions([]);
      searchRecipeIngredients({ variables: { ingredients: searchIngrdnts } });

    } else {
      setIngrdntsSuggestions([]);
    }
  }, [searchIngrdnts, searchRecipeIngredients]);

  const searchNameChange = (e) => {
    return setSearchName(e.target.value);
  }

  const searchIngrdntsChange = () => {
    setCurrentIngrdnt('');
    setSearchIngrdnts([...searchIngrdnts, currentIngrdnt]);
    dispatch({type: ADD_INGREDIENT, payload: currentIngrdnt})
  }

  const removeIngrdnt = (ingrdnt) => {
    setSearchIngrdnts((prevIngrdnts) => prevIngrdnts.filter((item) => item !== ingrdnt));
    dispatch({type: REMOVE_INGREDIENT, payload: ingrdnt})
  }

  const currentIngrdntChange = (e) => {
    setCurrentIngrdnt(e.target.value);
  }

  return (
    expanded ? (
      <div>
        <div className='row' id='homePage'>
          <div className='column3'>
            <form>
              <Input id="recipeSearch" ref={inputRef} placeholder='Search by name' onChange={searchNameChange} value={searchName} />
            </form>
          </div>
          <div className='column3'>
            <form>
              <Input id="loginForm" placeholder='Search by an Ingredient' onChange={currentIngrdntChange} value={currentIngrdnt} />
              <Button onClick={searchIngrdntsChange}>
                <span role='img' aria-label='add'>
                  <FaPlus />
                </span>
              </Button>
            </form>
          </div>
          <UnorderedList id='ingrdntsRecipes'>
            {suggestions.map((recipe) => (
              <ListItem key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`} id='navLink'>{recipe.name} by {recipe.recipeAuthor.username}</Link>
              </ListItem>
            ))}
          </UnorderedList>
          <UnorderedList styleType='none'>
            {searchIngrdnts.map((ingrdnt) => (
              <React.Fragment key={ingrdnt}>
                <ListItem>{ingrdnt}</ListItem>
                <Button onClick={() => removeIngrdnt(ingrdnt)}>
                  <span role='img' aria-label='delete'>
                    <TiDeleteOutline />
                  </span>
                </Button>
              </React.Fragment>
            ))}
          </UnorderedList>
          <UnorderedList styleType='none'>
            {ingrdntsSuggestions.map((recipe) => (
              <ListItem key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`} id='navLink'>{recipe.name} </Link>
                <p> by {recipe.recipeAuthor.username}</p>
              </ListItem>
            ))}
          </UnorderedList>
        </div>
      </div >
    ) : (
      <div>
        <div className='row' id='homePage'>
          <div className='column3'>
            <form>
            <Input id="homeInput" type='text' readOnly onClick={() => setExpanded(!expanded)} placeholder='Your next obsession' value={searchName} />
          </form>
          </div>
        </div>
      </div>
    )
  );
}