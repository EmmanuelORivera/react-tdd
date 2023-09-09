import { TextField, NativeSelect, InputLabel, Button } from '@mui/material'
import React, { useState } from 'react'
import ProductServices from '../../services/ProductService'
import { CREATED_STATUS } from '../../consts/httpStatus'

type InputsForm = {
  name: string
  size: string
  type: string
}
const Form = () => {
  const [formErrors, setFormErrors] = useState<InputsForm>({
    name: '',
    size: '',
    type: '',
  })
  const [formData, setFormData] = useState<InputsForm>({
    name: '',
    size: '',
    type: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateFormError = (
    fieldName: keyof InputsForm,
    errorMessage: string
  ) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [fieldName]: errorMessage,
    }))
  }
  const validateForm = () => {
    if (!formData.name) {
      updateFormError('name', 'The name is required')
    }

    if (!formData.size) {
      updateFormError('size', 'The size is required')
    }

    if (!formData.type) {
      updateFormError('type', 'The type is required')
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    validateForm()

    const response = await ProductServices.saveProduct(formData)

    if (response.status === CREATED_STATUS) {
      setIsSuccess(true)
    }
    setIsLoading(false)
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const { name, value } = e.target

    setFormErrors((prevError) => ({
      ...prevError,
      [name]: value.length ? '' : `The ${name} is required`,
    }))
  }
  return (
    <>
      <h1>Create Product</h1>

      {isSuccess && <p>Product Stored</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          name="name"
          label="name"
          id="name"
          helperText={formErrors.name}
        />

        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          name="size"
          label="size"
          id="size"
          helperText={formErrors.size}
        />

        <InputLabel variant="standard" htmlFor="type">
          Type
        </InputLabel>
        <NativeSelect
          onChange={handleChange}
          defaultValue=""
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </NativeSelect>

        {formErrors.type && <p>{formErrors.type}</p>}
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default Form
