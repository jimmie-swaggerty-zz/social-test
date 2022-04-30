import React, { createContext, useReducer } from 'react'

const initialState = {
    userList: [],
    feed: []
}

export const store = createContext(initialState)

const { Provider } = store

const StateProvider = (props) => {
     
    const { children } = props

    // Example of sign in/sign out functionality
    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === "reset") {
            return initialState
        }
        if (action.type === "setUserList") {
            let newState = { ...state }
            newState.userList = action.payload
            return { ...newState }
        }
        if (action.type === "setFeed") {
            let newState = { ...state }
            newState.feed = action.payload
            return { ...newState }
        }
        if(action.type === "initiateApp"){
            return { ...action.payload }
        }
        if (action.type === "updatePost") {
            let newState = { ...state }
            let postId = action.payload.postId
            let index = state.feed.indexOf(obj=>obj.postId === postId)
            newState.feed[index] = action.payload.post
            return { ...newState }
        }
        if (action.type === "addPosts") {
            let newState = { ...state }
            newState.feed = [...state.feed, ...action.payload]
            return { ...newState }
        }
        if (action.type === "addUser") {
            let newState = { ...state }
            newState.userList = [...state.userList, action.payload]
            return { ...newState }
        }
        if (action.type === "updateUser") {
            let newState = { ...state }
            let userId = action.payload.userId
            let index = state.userList.indexOf(obj=>obj.userId === userId)
            newState.userList[index] = action.payload.user
            return { ...newState }
        }
        if (action.type === "reset") {
            return {initialState}
        }
    }, initialState)

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default StateProvider