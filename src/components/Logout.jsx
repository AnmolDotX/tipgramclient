import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'

const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear();
        navigate('/register')
    }
  return (
    <button className='m-auto' onClick={handleClick}>
        <BiPowerOff/>
    </button>
  )
}

export default Logout