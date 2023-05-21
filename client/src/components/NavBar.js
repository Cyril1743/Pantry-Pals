import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import {CiForkAndKnife} from "react-icons/ci"
import Auth from '../utils/auth';
import '../styles/style.css'


export default function NavBar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };


return (
    <Box className="navBar" position="fixed" top={0} left={0} right={0}  display="flex" justifyContent="space-between" alignItems="center" padding="10px">
      <Heading className="Brand" fontFamily={"Lobster, cursive"} pointerEvents={"none"}>
        Pantry Pals
      </Heading>
      <Box display={{ base: 'none', md: 'flex' }}>
        {Auth.loggedIn() ? (
          <>
            <Button id="navLink" as={Link} to="/" rightIcon={<CiForkAndKnife />} variant="ghost" marginRight="2">
              Home
            </Button>
            <Button id="navLink" as={Link} to="/profile/me" rightIcon={<CiForkAndKnife />} variant="ghost" marginRight="2">
              Profile
            </Button>
            <Button id="navLink" as={Link} onClick={logout} rightIcon={<CiForkAndKnife />} variant="ghost">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button id="navLink" as={Link} to="/" rightIcon={<CiForkAndKnife />} variant="ghost" marginRight="2">
              Home
            </Button>
            <Button id="navLink" as={Link} to="/login" rightIcon={<CiForkAndKnife />} variant="ghost" marginRight="2">
              Login
            </Button>
            <Button id="navLink" as={Link} to="/signUp" rightIcon={<CiForkAndKnife />} variant="ghost">
              Sign Up
            </Button>
          </>
        )}
      </Box>
      <Box display={{ base: 'flex', md: 'none' }}>
        <Menu>
          <MenuButton as={Button} rightIcon={<CiForkAndKnife />} variant="outline">
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/">
              Home
            </MenuItem>
            {Auth.loggedIn() ? (
              <>
                <MenuItem as={Link} to="/profile/me">
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem as={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem as={Link} to="/signUp">
                  Sign Up
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}