import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1 className="text-3xl">Login</h1>

      <form data-testid="login-form" onSubmit={handleSubmit(onSubmit)}>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'The email is required' })}
          required
        />

        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'The password is required' })}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Login
