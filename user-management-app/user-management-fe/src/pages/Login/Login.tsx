import React from 'react'

const Login = () => {
  return (
    <>
      <h1 className="text-3xl">Login</h1>
      <form data-testid="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Login
