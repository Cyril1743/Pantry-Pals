import React, { useState } from "react";
import { Container, FormControl, Input, FormHelperText, FormErrorMessage, Alert, AlertTitle, AlertDescription, FormLabel, Button } from "@chakra-ui/react";

export default function SignUp() {

    //States to store all the logic
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [uniqueUsernameError, setUniqueUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    //Handling the form input logic
    const handleEmailBlur = (e) => {
        if (e.target.value === '') {
            setEmailError(true)
        }
    }

    const handlePasswordBlur = (e) => {
        if (e.target.value === '') {
            setPasswordError(true)
        }
    }

    const handleUsernameBlur = (e) => {
        if (e.target.value === '') {
            setUsernameError(true)
        }
    }

    const handleEmailChange = (e) => {
        setEmailError(false)
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPasswordError(false)
        setPassword(e.target.value)
    }

    const handleUsernameChange = (e) => {
        //TODO: Add logic to check if the username has been taken
        setUsernameError(false)
        setUsername(e.target.value)
    }

    const handleFormSubmit = (e) => {
        //TODO: Use the useMutation hook to process form data
        e.preventDefault()
        setEmail('')
        setPassword('')
        setUsername('')
        alert("New user made")
    }

    return (
        <Container className="signUpContainer">
                <FormControl m={2} isInvalid={emailError}>
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder="Email"
                    />
                    {emailError && (
                        <FormErrorMessage>
                            Email is required.
                        </FormErrorMessage>
                    )
                    }
                </FormControl>
                <FormControl m={2} isInvalid={usernameError}>
                    <FormLabel htmlFor="username">Username:</FormLabel>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        onBlur={handleUsernameBlur}
                        placeholder="Username"
                    />
                    {usernameError && (
                        <FormErrorMessage>
                            Username is required.
                        </FormErrorMessage>
                    )
                    }
                </FormControl>
                <FormControl m={2} isInvalid={passwordError}>
                    <FormLabel htmlFor="password">Password:</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        placeholder="Password"
                    />
                    {passwordError && (
                        <FormErrorMessage>
                            Password is required.
                        </FormErrorMessage>
                    )
                    }
                </FormControl>
                <Button m={2} onClick={handleFormSubmit}>Submit</Button>
        </Container>
    )
}