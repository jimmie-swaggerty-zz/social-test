import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { store } from '../../../context/StateProvider'
import ProfileService from '../../../services/ProfileService'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {

    const [isLoader, setIsLoader] = useState(false)
    const state = useContext(store).state
    const dispatch = useContext(store).dispatch

    const initiateFeed = () => {
        setIsLoader(true)
        let initialData = ProfileService.createFeed()
        console.log(initialData)
        dispatch({ type: 'initiateApp', payload: initialData })
        return setIsLoader(false)
    }

    useEffect(() => {
        if (state.feed.length == 0) {
            initiateFeed()
        }
    }, [state])

    return (
        <div>
            <div className="navbar-wrap px-3 bg-primary">
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="top">
                    <div className='d-flex justify-content-center'>
                        <div className='col-auto'>
                            <Navbar.Brand><NavLink to="/">
                                Home</NavLink>
                            </Navbar.Brand>
                        </div>
                    </div>
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-3" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Item>
                                <NavLink className="text-center" to="/">
                                    Home
                                </NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse> */}
                </Navbar>
            </div >
        </div >
    )
}
export default NavBar