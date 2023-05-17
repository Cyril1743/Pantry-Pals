import React, { useState } from "react";
import { Container, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button } from "@chakra-ui/react";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleEmailChange = (e) => {
        setEmailError(false)
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPasswordError(false)
        setPassword(e.target.value)
    }

    const handleEmailBlur = (e) => {
        if (e.target.value === ''){
            return setEmailError(true)
        }
    }

    const handlePasswordBlur = (e) => {
        if (e.target.value === ''){
            return setPasswordError(true)
        }
    }

    const handleFormSubmit = () => {
        if (email !== '' && password !== '') {
            //TODO: Use the useMutation hook to validate the form data
            setEmail('')
            setPassword('')
            alert("Signed In!")
        }
    }

    return (
        <Container>
            <FormControl isInvalid={emailError} isRequired>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                />
                {emailError ?
                    <FormErrorMessage>
                        Email is required
                    </FormErrorMessage>
                    :
                    <FormHelperText>
                        Enter the email you used to sign up
                    </FormHelperText>
                }
            </FormControl>
            <FormControl isInvalid={passwordError} isRequired>
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    placeholder="Password"
                />
                {passwordError ?
                    <FormErrorMessage>
                        Password is required
                    </FormErrorMessage>
                    :
                    <FormHelperText>
                        Enter your password
                    </FormHelperText>
                }
            </FormControl>
            <Button onClick={handleFormSubmit}> Submit </Button>
        </Container>
    )
}