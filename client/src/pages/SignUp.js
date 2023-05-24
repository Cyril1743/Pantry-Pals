import React, { useState } from "react";
import { Container, FormControl, Input, FormErrorMessage, Alert, AlertTitle, AlertDescription, FormLabel, Button } from "@chakra-ui/react";
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import '../styles/style.css'

export default function SignUp() {
    const [addUser] = useMutation(ADD_USER);
    const [queryUser] = useLazyQuery(QUERY_USER);

    //States to store all the logic
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [uniqueUsernameError, setUniqueUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    //Handling the form input logic
    const handleEmailBlur = (e) => {
        if (e.target.value === '') {
            setEmailError(true);
        }
    }

    const handlePasswordBlur = (e) => {
        if (e.target.value === '') {
            setPasswordError(true);
        }
    }

    const handleUsernameBlur = (e) => {
        if (e.target.value === '') {
            setUsernameError(true);
        }
    }

    const handleEmailChange = (e) => {
        setEmailError(false);
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordError(false);
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        if (e.target.value !== '') {
            const targetUsername = e.target.value;
            queryUser({
                variables: { username: targetUsername },
            })
                .then((response) => {
                    const userData = response.data && response.data.user;
                    const username = userData?.username || '';
                    if (username !== '') {
                        setUniqueUsernameError(true);
                    }
                    setUsernameError(false);
                    setUsername(targetUsername);
                })
                .catch((error) => {
                    // Handle error from the query
                    console.error(error);
                });
        }
    };


    const handleFormSubmit = async (e) => {
        // Use the useMutation hook to process form data
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: { email, username, password },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            alert("Sign up failed. Please try again.");
            console.error(e);
        }
        setEmail('');
        setPassword('');
        setUsername('');
    }

    return (
        <Container className="signUpContainer">
            {uniqueUsernameError &&
                <Alert>
                    <AlertTitle>Invalid Username</AlertTitle>
                    <AlertDescription>We're sorry, but the username you selected is taken!</AlertDescription>
                </Alert>
            }
            <h1 className="loginTitle">Sign Up!</h1>
            <FormControl m={2} isInvalid={emailError}>
                <FormLabel id="signupLabel" htmlFor="email">Email:</FormLabel>
                <Input
                    id="signupForm"
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
                <FormLabel id="signupLabel" htmlFor="username">Username:</FormLabel>
                <Input
                    id="signupForm"
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
                <FormLabel id="signupLabel" htmlFor="password">Password:</FormLabel>
                <Input
                    id="signupForm"
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
            <Button id="signupButton" my={6} onClick={handleFormSubmit}>Sign Up</Button>
        </Container>
    )
}