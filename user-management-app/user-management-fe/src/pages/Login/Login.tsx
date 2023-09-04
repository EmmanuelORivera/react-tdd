import React from 'react'

const Login = () => {
  return (
    <>
      <h1 className="text-3xl">Login</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />

      <button type="submit">Submit</button>
    </>
  )
}

export default Login
