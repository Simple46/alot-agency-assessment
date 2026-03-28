import AuthLayout from '@/components/auth/AuthLayout'
import React from 'react'
import ForgetPasswordForm from '@/components/auth/ForgetPasswordForm'

function page() {
  return (
      <AuthLayout title="Forgot Password" subtitle="Enter your email to reset your password"> 
          <ForgetPasswordForm />
          </AuthLayout>
      
  )
}

export default page