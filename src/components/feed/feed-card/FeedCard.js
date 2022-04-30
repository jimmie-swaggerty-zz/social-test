import React, { useState, useEffect, useContext, useMemo } from 'react'
import DimLoader from '../../../assets/templates/dim-loader/DimLoader'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { store } from '../../../context/StateProvider'
const FeedCard = (props) => {
    const dispatch = useContext(store)?.dispatch
    const state = useContext(store)?.state

    const reacts = useMemo(()=>{
        return state.feed.filter(obj=>obj.postId==props.post.postId)[0].reacts
    },[state.feed])

    const react = (type) =>{
        let post = {...props.post}
        console.log(post)
        let typeData = post.reacts[type]
        console.log(typeData)
        post.reacts[type][1] = !typeData[1]
        return(dispatch({type: 'updatePost', payload:{postId:props.postId,post:post}})) 
    }

    return (
        <>
            {props.post.img ?
                <div className="col-lg-2 col-md-3 col-12">
                    <div className="feed-card card bg-light square">
                        <div className='feed-card-title'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-auto'><img className="feed-card-user-image" src={props.post.profileImg} alt={props.post.userName} /></div>
                                <div className='col-auto'>
                                    <div className='row d-flex'>
                                        <span className='col-12 feed-user-username'>
                                            <Link className='username-link' to={`/${props.post.userName}`}>
                                                {props.post.userName}
                                            </Link>
                                        </span>
                                        <span className='col-12 feed-user-date'>{moment(props.post.createdOn).format("ddd, MMM D")} at {moment(props.post.createdOn).format("h:mma")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className="feed-card-image" src={props.post.img} />
                        <div className='feed-card-specs pt-2'>
                            <span className='feed-reacts'>
                                <span className='react-emoji-button' title={`Loved ${reacts?.heart[0]}`}>
                                    <span className={`react-emoji-icon ${reacts?.heart[1]?'liked':''}`} onClick={e=>{e.preventDefault(); react('heart')}}>&#128525;</span>
                                    {/* <span className='react-emoji-count'>{reacts?.heart[0]}</span> */}
                                </span>
                                <span className='react-emoji-button' title={`Liked ${reacts?.like[0]}`}>
                                    <span className={`react-emoji-icon ${reacts?.like[1]?'liked':''}`} onClick={e=>{e.preventDefault(); react('like')}}>&#128513;</span>
                                    {/* <span className='react-emoji-count'>{reacts?.like[0]}</span> */}
                                </span>
                                <span className='react-emoji-button' title={`Pride ${reacts?.pride}`}>
                                    <span className={`react-emoji-icon ${reacts?.pride[1]?'liked':''}`} onClick={e=>{e.preventDefault(); react('pride')}}>&#127752;</span>
                                    {/* <span className='react-emoji-count'>{reacts?.pride[0]}</span> */}
                                </span>
                                <span className='react-emoji-button' title={`Liked ${reacts?.sad}`}>
                                    <span className={`react-emoji-icon ${reacts?.pride[1]?'liked':''}`} onClick={e=>{e.preventDefault(); react('sad')}}>&#128532;</span>
                                    {/* <span className='react-emoji-count'>{reacts?.sad[0]}</span> */}
                                </span>
                                <span className='react-emoji-count-sum'>{reacts?.heart[0] + reacts?.like[0] + reacts?.pride[0] + reacts?.sad[0]}</span>
                            </span>
                        </div>
                        <hr className='my-2' />
                        <div className='feed-card-body'>
                            <p className='feed-card-descriptior p-2 pb-0'>{props.post.descriptor}</p>
                        </div>
                    </div>
                </div> :
                <DimLoader />}
        </>
    )
}

export default FeedCard