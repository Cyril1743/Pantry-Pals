import React, { useState, useRef, useEffect } from 'react'
import { Input, Container, UnorderedList, ListItem, Button } from '@chakra-ui/react'

export default function Home() {
    const [expanded, makeExpanded] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchIngrdnts, setSearchIngrdnts] = useState([])
    const [currentIngrdnt, setCurrentIngrdnt] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (expanded) {
            inputRef.current.focus()
        }
    }, [expanded])

    const searchNameChange = (e) => {
        return setSearchName(e.target.value)
    }

    const searchIngrdntsChange = () => {
        setCurrentIngrdnt('')
        return setSearchIngrdnts([...searchIngrdnts, currentIngrdnt])
    }

    const removeIngrdnt = (ingrdnt) => {
        const index = searchIngrdnts.indexOf(ingrdnt)
        setSearchIngrdnts(searchIngrdnts.slice(0, index).concat(searchIngrdnts.slice(index + 1)))
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
                    <Input placeholder='Your next craving' onClick={() => makeExpanded(!expanded)} />
                </Container>
            }
        </div>
    )
}