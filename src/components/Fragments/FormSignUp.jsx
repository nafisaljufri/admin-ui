import React from 'react'
import LabeledInput from '../Elements/LabeledInput'
import Checkbox from '../Elements/CheckBox'
import Button from '../Elements/Button'

function FormSignUp(props) {
  const { onNavigate } = props

  return (
    <div>
        <div className="mt-5 mb-2 text-center">
            <h2 className="text-1xl font-bold text-gray-01">Create an Account</h2>
        </div>
      {/* form start */}
      <div className="mt-16">
        <form action="">
          <div className="mb-6">
            <LabeledInput
              label="Full Name"
              id="fullname"
              type="text"
              placeholder="Muchamad Nafis Aljufri"
              name="fullname"
            />
          </div>
          <div className="mb-6">
            <LabeledInput
              label="Email address"
              id="email"
              type="email"
              placeholder="hello@example.com"
              name="email"
            />
          </div>
          <div className="mb-6">
            <LabeledInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              name="password"
            />
          </div>
          <div className="mb-6">
            <LabeledInput
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
            />
          </div>
          <div className="mb-5 flex items-center gap-2">
            <Checkbox id="terms" type="checkbox" name="terms" />
            <label htmlFor="terms" className="text-sm text-gray-01">
                I agree to the{" "}
                <span className="text-primary font-bold">Terms and Conditions</span>
            </label>
          </div>
          <Button variant="primary">
            Create Account
          </Button>
        </form>
      </div>
      {/* form end */}

      {/* link start */}
      <div className="flex justify-center mt-6">
        <p className="text-gray-03 text-sm">
            Already have an account?{" "}
            <span
            className="text-primary font-bold cursor-pointer"
            onClick={() => onNavigate("signIn")}
            >
            Sign In
            </span>
        </p>
      </div>
      {/* link end */}
    </div>
  )
}

export default FormSignUp