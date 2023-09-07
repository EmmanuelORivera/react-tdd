import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './loginSchema'
import { useLoginMutation } from './useLoginMutation'
import { Inputs } from './interfaces/Inputs'
import Loader from '../../components/Loader'
import axios from 'axios'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const mutation = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    mutation.mutate(
      { email, password },
      {
        onError(error) {
          let internalErrorMessage = 'Unexpected error, please try again'
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            internalErrorMessage = 'The email or password are not correct'
          }
          setErrorMessage(internalErrorMessage)
        },
      }
    )
  }

  return (
    <div className="flex flex-col justify-center gap-4 max-w-md mx-auto mt-20">
      <h1 className="text-3xl text-center">Login</h1>

      {mutation.isLoading && <Loader className="mx-auto" />}

      {mutation.isError && (
        <div className="text-center text-red-400">{errorMessage}</div>
      )}

      <form
        className="flex flex-col gap-2"
        data-testid="login-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="font-medium" htmlFor="email">
          Email
        </label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          className="border rounded p-2"
          type="email"
          id="email"
          {...register('email', { required: true })}
          required
        />

        <label className="font-medium" htmlFor="password">
          Password
        </label>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          className="border rounded p-2"
          type="password"
          id="password"
          {...register('password', { required: true })}
          required
        />

        <button
          className="bg-indigo-600 hover:bg-indigo-500 font-medium text-white rounded py-1.5"
          type="submit"
          disabled={mutation.isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
