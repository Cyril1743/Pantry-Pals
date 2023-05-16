import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@chakra-ui/react"

export default function NavBar() {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
                Home
            </BreadcrumbLink>
            {/* TODO:Add contitional rendering to render login when not logged in */}
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/login">
                Login
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/profile">
                Profile
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/logout">
                Logout
            </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}