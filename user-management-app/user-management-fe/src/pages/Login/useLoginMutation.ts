import axios from 'axios'
import { useMutation } from 'react-query'
import { Inputs } from './interfaces/Inputs'

const loginService = async (email: string, password: string) => {
  return axios.post('/login', { email, password })
}

export const useLoginMutation = () => {
  return useMutation((payload: Inputs) =>
    loginService(payload.email, payload.password)
  )
}
