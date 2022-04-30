import React, { useEffect, useMemo, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../context/StateProvider'
import ProfileService from '../../services/ProfileService'
import FeedBody from '../feed/feed-body/FeedBody'

const ProfilePage = () => {
    const state = useContext(store)?.state
    const dispatch = useContext(store)?.dispatch

    const params = useParams()

    const userProfile = useMemo(() => {
        let hasProfile = state.userList.find(obj => obj.userName == params.userName)
        let profile;
        if (!hasProfile) {
            profile = ProfileService.createUser(params.userName)
            dispatch({ type: 'addUser', payload: profile })
        }
        else {
            profile = state.userList.filter(obj => obj.userName == params.userName)[0]
        }
        return profile
    }, [params, state])

    return (
        <div className='d-flex row mx-0'>
            <div className='col-12'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12'><img className='profile-image' src={userProfile.profileImg} alt={userProfile.userName} /></div>
                    <div className='col-12'><h1 className='profile-username'>{userProfile.userName}</h1></div>
                    <div className='col-12'><p className='profile-bio'>{userProfile.bio}</p></div>
                </div>
            </div>
            <div className='col-12'>
                <FeedBody userName={params.userName}/>
            </div>
        </div>
    )
}
export default ProfilePage
