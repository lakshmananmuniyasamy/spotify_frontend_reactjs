import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const TopNavbar = () => {
  return (
    <>
         <Navbar expand="lg" className="p-0 navbar-dark" style={{position: "sticky", top:0}} >
            <Container fluid>
              <Navbar.Brand href=""><MdArrowBackIos /></Navbar.Brand>
              <Navbar.Brand href=""><MdArrowForwardIos /></Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-2 px-5"
                  style={{ maxHeight: '100px' }}
                  navbarScroll>
                  <Nav.Link href="#action1">Premium</Nav.Link>
                  <Nav.Link href="#action2">Support</Nav.Link>
                  <Nav.Link href="#action2">Download</Nav.Link>
                </Nav>
                <Link to="/signup"><Button style={{borderRadius:"20px"}} variant="outline-light">Sign up</Button></Link>
                &nbsp;
                <Link to="/signin"><Button style={{borderRadius:"20px"}} variant="outline-light">Sign in</Button></Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    </>
  )
}
