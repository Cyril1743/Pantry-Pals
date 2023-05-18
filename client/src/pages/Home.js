import React, { useState, useRef, useEffect } from 'react'
import { Input, Container, UnorderedList, ListItem, Button } from '@chakra-ui/react'
import { QUERY_INGREDIENT_NAME, QUERY_RECIPE_NAME } from '../utils/queries'
import { useLazyQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

export default function Home() {
    const [expanded, makeExpanded] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchIngrdnts, setSearchIngrdnts] = useState([])
    const [currentIngrdnt, setCurrentIngrdnt] = useState('')
    const inputRef = useRef(null)

    //Query for searching by name
    const [searchRecipes] = useLazyQuery(QUERY_RECIPE_NAME, {
        onCompleted: (result) => {
            setSuggestions(result.suggestRecipe)
        }
    })
    const [suggestions, setSuggestions] = useState([])

    //Query for searching by ingredients
    const [searchRecipeIngredients] = useLazyQuery(QUERY_INGREDIENT_NAME, {
        onCompleted: (result) => {
            const { suggestIngredient } = result
            const resultArray = []
            suggestIngredient.forEach((recipe) => {
                resultArray.push(recipe)
            })
            ingrdntsSuggestions.forEach((recipe) => {
                resultArray.push(recipe)
            })

            setIngrdntsSuggestions(resultArray)
        }
    })
    const [ingrdntsSuggestions, setIngrdntsSuggestions] = useState([])

    //UseEffect to handle the click on the initial search
    useEffect(() => {
        if (expanded) {
            inputRef.current.focus()
        }
    }, [expanded])

    //UseEffect for searching by name
    useEffect(() => {
        if (searchName.trim().length > 0) {
            searchRecipes({ variables: { name: searchName } })
        } else {
            setSuggestions([])
        }
    }, [searchRecipes, searchName])

    //UseEffect for searching by ingredient
    useEffect(() => {
        if (searchIngrdnts.length > 0) {
            setIngrdntsSuggestions([])
            searchIngrdnts.forEach((ingredient) => {
                console.log(ingredient)
                searchRecipeIngredients({ variables: { ingredient: ingredient } })
            })

        } else {
            setIngrdntsSuggestions([])
        }
    }, [searchIngrdnts, searchRecipeIngredients])

    const searchNameChange = (e) => {
        if (searchName.trim().length === 0) {

        }
        return setSearchName(e.target.value)
    }

    const searchIngrdntsChange = () => {
        setCurrentIngrdnt('')
        setSearchIngrdnts([...searchIngrdnts, currentIngrdnt])
    }

    const removeIngrdnt = (ingrdnt) => {
        setSearchIngrdnts((prevIngrdnts) => prevIngrdnts.filter((item) => item !== ingrdnt))
    }

    const currentIngrdntChange = (e) => {
        setCurrentIngrdnt(e.target.value)
    }

    return (
        <div>
            {expanded ?
                <Container>
                    <Input ref={inputRef} placeholder='Search by name' onChange={searchNameChange} value={searchName} />
                    <UnorderedList listStyleType='none'>
                        {suggestions.map((recipe) => <ListItem key={recipe._id}><Link to={`/recipe/${recipe._id}`}>{recipe.name} by {recipe.recipeAuthor.username}</Link></ListItem>)}
                    </UnorderedList>
                    <Input placeholder='Search by an Ingredient' onChange={currentIngrdntChange} value={currentIngrdnt} />
                    <Button onClick={searchIngrdntsChange}>
                        <span role='img' aria-label='add'>
                            &#10133;
                        </span>
                    </Button>
                    <UnorderedList styleType='none'>
                        {searchIngrdnts.map((ingrdnt) => {
                            return (
                                <React.Fragment key={ingrdnt}>
                                    <ListItem>{ingrdnt}</ListItem>
                                    <Button onClick={() => removeIngrdnt(ingrdnt)}>
                                        <span role='img' aria-label='delete'>
                                            ✖️
                                        </span>
                                    </Button>
                                </React.Fragment>)
                        })}
                    </UnorderedList>
                    <UnorderedList styleType='none'>
                        {ingrdntsSuggestions.map((recipe) => {
                            return (
                                <ListItem key={recipe._id}>
                                    <Link to={`/recipe/${recipe._id}`}>{recipe.name} by {recipe.recipeAuthor.username}</Link>
                                    <UnorderedList styleType="none">
                                        {recipe.ingredients.map((ingredient) => <ListItem key={ingredient.ingredientName}>{ingredient.ingredientName}</ListItem>)}
                                    </UnorderedList>
                                </ListItem>
                            )
                        })}
                    </UnorderedList>
                </Container>

                :
                <Container>
                    <Input placeholder='Your next craving' value={searchName} readOnly onClick={() => makeExpanded(!expanded)} />
                </Container>
            }
        </div>
    )
}