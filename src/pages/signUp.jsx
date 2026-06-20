import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/Layouts/AuthLayout'
import FormSignUp from '../components/Fragments/FormSignUp'
import { AuthContext } from '../context/authContext'
import AppSnackbar from '../components/Elements/AppSnackbar'

function SignUp() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    })
  }

  const handleRegister = (name, email, password) => {
    const result = register(name, email, password)
    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Account created successfully!',
        severity: 'success'
      })
      setTimeout(() => {
        navigate('/')
      }, 500)
    } else {
      setSnackbar({
        open: true,
        message: result.msg,
        severity: 'error'
      })
    }
  }
  
  return (
    <AuthLayout>
      <FormSignUp onSubmit={handleRegister} />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  )
}

export default SignUp