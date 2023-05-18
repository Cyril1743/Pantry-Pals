import React, { useState, useRef, useEffect } from 'react'
import { Input, Container, UnorderedList, ListItem, Button } from '@chakra-ui/react'
import { QUERY_RECIPE_NAME } from '../utils/queries'
import { useLazyQuery } from '@apollo/client'

export default function Home() {
    const [expanded, makeExpanded] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchIngrdnts, setSearchIngrdnts] = useState([])
    const [currentIngrdnt, setCurrentIngrdnt] = useState('')
    const inputRef = useRef(null)
    const [searchRecipes, { loading, data}] = useLazyQuery(QUERY_RECIPE_NAME, {
        onCompleted: (result) => {
            setSuggestions(result.suggestRecipe)
        }
    })
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        if (expanded) {
            inputRef.current.focus()
        }
    }, [expanded])

    useEffect(() => {
        if (searchName.trim().length > 0) {
            searchRecipes({variables: {name: searchName}})
        } else {
            setSuggestions([])
        }
    }, [searchRecipes, searchName])

    const searchNameChange = (e) => {
        if (searchName.trim().length === 0){
            
        }
        return setSearchName(e.target.value)
    }

    const searchIngrdntsChange = () => {
        setCurrentIngrdnt('')
        return setSearchIngrdnts([...searchIngrdnts, currentIngrdnt])
    }

    const removeIngrdnt = (ingrdnt) => {
       setSearchIngrdnts((prevIngrdnts) => prevIngrdnts.filter((item) => item !== ingrdnt))
    }

    const currentIngrdntChange = (e) => {
        setCurrentIngrdnt(e.target.value)
    }

    //TODO: Use the useQuery function to find recipes with the ingredients listed
    const handleSearch = () => {
        alert("Searching")
    }

    return (
        <div>
            {expanded ?
                <Container>
                    <Input ref={inputRef} placeholder='Search by name' onChange={searchNameChange} value={searchName} />
                    <UnorderedList listStyleType='none'>
                        {suggestions.map((recipe) => <ListItem key={recipe._id}>{recipe.name}</ListItem>)}
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
                    <Button onClick={handleSearch}>Search</Button>
                </Container>

                :
                <Container>
                    <Input placeholder='Your next craving' value={searchName} readOnly onClick={() => makeExpanded(!expanded)} />
                </Container>
            }
        </div>
    )
}