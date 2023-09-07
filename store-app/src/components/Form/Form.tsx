import { TextField, NativeSelect, InputLabel, Button } from '@mui/material'
import React from 'react'

const Form = () => {
  return (
    <>
      <h1>Create Product</h1>

      <form>
        <TextField label="name" id="name" />
        <TextField label="size" id="size" />
        <InputLabel variant="standard" htmlFor="type">
          Type
        </InputLabel>
        <NativeSelect
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
        <Button>Submit</Button>
      </form>
    </>
  )
}

export default Form
