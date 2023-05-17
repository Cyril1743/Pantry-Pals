import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import {CiForkAndKnife} from "react-icons/ci"
import Auth from '../utils/auth';

export default function NavBar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };
    return (
        <Breadcrumb separator={<CiForkAndKnife />}>
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
            {Auth.loggedIn() ? (
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} onClick={logout}>
                Logout
            </BreadcrumbLink>
            </BreadcrumbItem>
            ) : (
            <Breadcrumb separator={<CiForkAndKnife />}>
                <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/login">
                    Login
                </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/signup">
                    Sign Up
                </BreadcrumbLink>
                </BreadcrumbItem>    
            </Breadcrumb>
            )}
            
        </Breadcrumb>
    )
}