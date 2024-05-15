import React from 'react'
import CrearePost from './CrearePost'
import Tweet from './Tweet'

function Feed() {
  return (
    <div className='w-[55%] border border-gray-200'>
      <div>
        <CrearePost/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
      </div>
    </div>
  )
}

export default Feed
