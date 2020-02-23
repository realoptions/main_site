import React, { useState } from 'react'
import { NavLink as Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

import Logo from '../Logo.js'
import { HOME, DEVELOPERS, PRODUCTS, DEMO } from '../routes/names'
import { menuBarHeight } from '../styles/menu'

export const AppMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Logo
          height={menuBarHeight}
          width={menuBarHeight}
          className="logo-primary"
        />
      </NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!open)} />
      <Collapse isOpen={open} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to={HOME} tag={Link}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={PRODUCTS} tag={Link}>
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <a className="nav-link" href={DEVELOPERS}>
              Developers
            </a>
          </NavItem>
          <NavItem>
            <NavLink to={DEMO} tag={Link}>
              Demo
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default AppMenu
