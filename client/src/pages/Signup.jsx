import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    email: '', password: '', username: ''
  })

  const handleinp = (e) => {
    const { name, value } = e.target
    setuser({ ...user, [name]: value })
  }

  const subdata = async (e) => {
    e.preventDefault()
    const data = await axios.post('http://localhost:9999/signup', user)
    localStorage.setItem('token', data.data.token)
    navigate('/signin')
  }


  return (
    <>
      <h4>User SignUp </h4>
      <input type='email' name="email" id="" value={user.email} onChange={handleinp} />
      <input type="password" name="password" id="" value={user.password} onChange={handleinp} />
      <input type="text" name="username" min={6} max={12} id="" value={user.username} onChange={handleinp} />
      <button type="submit" onClick={subdata} >Submit</button>
      <p>I have already have an account <Link to="/signin">SignIn</Link></p>
    </>
  )
}

export default Signup
