import AuthLayout from '@/components/auth/AuthLayout'
import React from 'react'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

function ResetPassPage() {
  return (
      <AuthLayout title="Reset Password" subtitle="Enter your new password"> 
          <ResetPasswordForm />
          </AuthLayout>
      
  )
}

export default ResetPassPage