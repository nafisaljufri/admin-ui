import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/Layouts/AuthLayout'
import FormSignIn from '../components/Fragments/FormSignIn'
import { AuthContext } from '../context/authContext'
import AppSnackbar from '../components/Elements/AppSnackbar'

function SignIn() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (email, password) => {
    const result = await login(email, password)
    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Login successful!',
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
      <FormSignIn onSubmit={handleLogin} />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  )
}

export default SignIn