import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formElement = event.currentTarget

    const formData = new FormData(formElement)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email) {
      toast.error('The email is required')
    }
    if (!password) {
      toast.error('The password is required')
    }
  }

  return (
    <>
      <h1 className="text-3xl">Login</h1>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </>
  )
}

export default Login
