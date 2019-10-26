import { Label, Input } from '@theme-ui/components'
import { Box } from 'theme-ui'
import { Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username Is To Short!')
    .max(25, 'Username Is To Long!')
    .required('Username Is Required'),
  password: Yup.string()
    .min(8, 'Username To Short!')
    .required('Username Is Required'),
})

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
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
            />
            {errors && errors.password && (
              <Box as={'span'}>{errors.password}</Box>
            )}
          </Box>
          <Input name="submit" type={'submit'} value={'Login'} mb={3} />
        </Box>
      )}
    />
  )
}
