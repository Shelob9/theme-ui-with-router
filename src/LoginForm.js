import { Label, Input } from '@theme-ui/components'
import { Box } from 'theme-ui'
import { Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
})

function InputField({ errors, id, label, required, formikProps }) {
  const errorId = `${id}-errors`
  let inputProps = {
    id,
    name: id,
    required,
    onChange: formikProps.onChange,
    onBlur: formikProps.onBlur,
    value: formikProps.values[id],
  }
  if (errors) {
    inputProps['aria-describedby'] = errorId
  }
  return (
    <Box as={'div'}>
      <Label htmlFor={id}>
        {label} {required && <Box as={'span'}>*</Box>}
      </Label>
      <Input {...inputProps} mb={3} />
      {errors.hasOwnProperty(id) && <Box as={'span'}>{errors[id]}</Box>}
    </Box>
  )
}

export default function LoginForm(props) {
  const { onLogin } = props
  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ username: 'jared', password: '' }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values))
        onLogin(values)
      }}
      render={({ handleSubmit, handleBlur, handleChange, values, errors }) => (
        <Box as="form" onSubmit={handleSubmit}>
          <Box as={'div'}>
            <Label htmlFor={'username'}>
              Username <Box as={'span'}>*</Box>
            </Label>
            <Input
              id={'username'}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              name="username"
            />
            {errors && errors.username && (
              <Box as={'span'}>{errors.username}</Box>
            )}
          </Box>

          <Box as={'div'}>
            <Label htmlFor={'password'}>
              Password <Box as={'span'}>*</Box>
            </Label>
            <Input
              id={'password'}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
            />
          </Box>
          <Input name="submit" type={'submit'} value={'Login'} mb={3} />
        </Box>
      )}
    />
  )
}
