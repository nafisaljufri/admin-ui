import React from 'react'
import LabeledInput from '../Elements/LabeledInput'
import Checkbox from '../Elements/CheckBox'
import Button from '../Elements/Button'
import { Link } from "react-router-dom";
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

// Custom Field Component using useField
function MyLabeledInput({ label, id, ...props }) {
  const [field, meta] = useField(props)
  return (
    <>
      <LabeledInput label={label} id={id || field.name} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </>
  )
}

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

function FormSignUp({ onSubmit }) {
  return (
    <div>
      <div className="mt-5 mb-2 text-center">
        <h2 className="text-1xl font-bold text-gray-01">Create an Account</h2>
      </div>
      <div className="mt-16">
        <Formik
          initialValues={{
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              onSubmit(values.fullname, values.email, values.password)
              setSubmitting(false)
            }, 500)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <MyLabeledInput
                  name="fullname"
                  label="Full Name"
                  id="fullname"
                  type="text"
                  placeholder="Muchamad Nafis Aljufri"
                />
              </div>
              <div className="mb-6">
                <MyLabeledInput
                  name="email"
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                />
              </div>
              <div className="mb-6">
                <MyLabeledInput
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="mb-6">
                <MyLabeledInput
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="mb-5 flex items-center gap-2">
                <Checkbox id="terms" type="checkbox" name="terms" />
                <label htmlFor="terms" className="text-sm text-gray-01">
                  I agree to the{" "}
                  <span className="text-primary font-bold">Terms and Conditions</span>
                </label>
              </div>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Create an Account'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-gray-03 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary text-sm font-bold cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default FormSignUp
