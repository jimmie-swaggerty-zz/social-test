import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { store } from '../../../context/StateProvider'
import ProfileService from '../../../services/ProfileService'

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
        if (state.feed.length==0) {
            initiateFeed()
        }
    }, [state])

    return (
        <div></div>
    )
}
export default NavBar