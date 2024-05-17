import React from 'react'
import CrearePost from './CrearePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

function Feed() {
  const {tweets}=useSelector(store=>store.tweet)
  return (
    <div className='w-[55%] border border-gray-200'>
      <div>
        <CrearePost/>
        {
          tweets?.map((tweet)=><Tweet  key={tweet?._id} tweet={tweet}/>)
        }
      </div>
    </div>
  )
}

export default Feed
