import React, {useState, useEffect} from 'react'
import FeedBody from './feed-body/FeedBody'

const FeedFrame = (props) =>{
    return(
        <div className="feed-frame">
            <FeedBody/>
        </div>
    )
}

export default FeedFrame