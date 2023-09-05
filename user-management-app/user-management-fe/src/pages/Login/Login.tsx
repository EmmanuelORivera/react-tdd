import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './loginSchema'
import { useLoginMutation } from './useLoginMutation'
import { Inputs } from './interfaces/Inputs'

const Login = () => {
  const mutation = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    mutation.mutate({ email, password })
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
          {...register('email', { required: true })}
          required
        />

        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
          required
        />

        <button type="submit" disabled={mutation.isLoading}>
          Submit
        </button>
      </form>
    </>
  )
}

export default Login
