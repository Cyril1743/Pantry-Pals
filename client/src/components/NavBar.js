import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Heading} from "@chakra-ui/react"
import {CiForkAndKnife} from "react-icons/ci"
import Auth from '../utils/auth';

export default function NavBar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

      const style = {
        display: 'inline'
      }
    return (
        Auth.loggedIn() ?
        <Breadcrumb separator={<CiForkAndKnife />}>
            <BreadcrumbItem>
            <Heading size='md'>Pantry <CiForkAndKnife style={style}/> Pals</Heading>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
                Home
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/profile">
                Profile
            </BreadcrumbLink>
            </BreadcrumbItem>
            {/* contitional rendering to render logout when logged in */}
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} onClick={logout}>
                Logout
            </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        :
        <Breadcrumb separator={<CiForkAndKnife />}>
            <BreadcrumbItem>
            <Heading size='md'>Pantry <CiForkAndKnife style={style}/> Pals</Heading>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
                Home
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/profile">
                Profile
            </BreadcrumbLink>
            </BreadcrumbItem>
            {/* contitional rendering to render login when not logged in */}
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/login">
                Login
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/singUp">
                Sign Up
            </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}