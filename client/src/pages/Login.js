import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Container, FormControl, FormLabel, Input, FormErrorMessage, Button} from "@chakra-ui/react";
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/style.css';


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

    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async(event) => {
        event.preventDefault()
        if (email !== '' && password !== '') {
            //Use the useMutation hook to validate the form data
            try {
                const { data } = await login({
                    variables: { email, password },
                });
                Auth.login(data.login.token);
            } catch (error) {
                alert("Log in failed. Try again.")
                console.log(error)
            }
            setEmail('')
            setPassword('')
        }
    }

    return (
        <Container className="loginContainer">
            <h1 className="loginTitle">Welcome back!</h1>
            <FormControl m={2} isInvalid={emailError}>
                <FormLabel id="loginLabel" htmlFor="email">Email:</FormLabel>
                <Input
                    id="loginForm"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                />
                {emailError && (
                    <FormErrorMessage>
                        Email is required
                    </FormErrorMessage>
                )
                }
            </FormControl>
            <FormControl m={2} isInvalid={passwordError}>
                <FormLabel id="loginLabel" htmlFor="password">Password:</FormLabel>
                <Input
                    id="loginForm"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    placeholder="Password"
                />
                {passwordError && (
                    <FormErrorMessage>
                        Password is required
                    </FormErrorMessage>
                )
                }
            </FormControl>
            <Button id="loginButton" my={6} onClick={handleFormSubmit}> Login </Button>
        </Container>
    )
}