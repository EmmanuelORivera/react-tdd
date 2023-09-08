import { TextField, NativeSelect, InputLabel, Button } from '@mui/material'
import React, { useState } from 'react'

const Form = () => {
  const [formErrors, setFormErrors] = useState({ name: '', size: '', type: '' })
  const [formData, setFormData] = useState({ name: '', size: '', type: '' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: 'The name is required',
      }))
    }

    if (!formData.size) {
      setFormErrors((prevState) => ({
        ...prevState,
        size: 'The size is required',
      }))
    }

    if (!formData.type) {
      setFormErrors((prevState) => ({
        ...prevState,
        type: 'The type is required',
      }))
    }
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
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}

export default Form
