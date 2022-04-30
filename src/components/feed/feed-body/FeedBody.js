import React, { useEffect, useState, useContext, useMemo } from 'react'
import { store } from '../../../context/StateProvider'
import ProfileService from '../../../services/ProfileService'
import FeedCard from '../feed-card/FeedCard'

const FeedBody = (props) => {
    const state = useContext(store).state
    const dispatch = useContext(store).dispatch
    const [isLoader, setIsLoader] = useState(false)
    const [pagination, setPagination] = useState({ start: 0, end: 20 })

    const posts = useMemo(() => {
        if (props.userName) {
            let hasPosts = state.feed.find(obj => obj.userName == props.userName)
            if (hasPosts) {
                return state.feed.filter(obj => obj.userName == props.userName)
            }
            else{
                let user = state.userList.filter(obj=> obj.userName == props.userName)
                let posts = ProfileService.createPosts(user,20)
                dispatch({type:'addPosts',payload:posts})
                return posts
            }
        }
        else {
            return state.feed
        }
    }, [props.userName,state.feed])
    return (
        <div className="card bg-dark">
            <div className="row d-flex g-3">
                {posts.length > 0 && posts.slice(pagination.start, pagination.end).map(post => {
                    return (
                        <FeedCard post={post} />
                    )
                })}
            </div>
        </div>
    )
}

export default FeedBody