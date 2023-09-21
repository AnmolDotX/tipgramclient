import React from 'react'
import Robot from '../assets/robot.gif'

const Welcome = ({currentUser}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 min-h-full'>
        <img className='h-60 rounded-full shadow-emerald-600 shadow-2xl p-2 opacity-50 bg-blend-multiply' src={Robot} alt="Empty screen GIF" />
        <h1 className='text-lg font-semibold tracking-widest'>Welcome <span className='text-xl font-bold text-emerald-600'>{currentUser.username} !</span></h1>
        <h2 className='text-sm font-normal tracking-wider animate-pulse'>Please select a chat to begin messaging</h2>
    </div>
  )
}

export default Welcome