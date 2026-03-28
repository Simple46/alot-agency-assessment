'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';
import Modal from '@/components/ui/Modal';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [showProcessing, setShowProcessing] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const handleSignup = async (formData) => {
    try {
      const { email, otp } = await signup(formData);
      setPendingEmail(email);
      setShowProcessing(true);
      // Show OTP in alert (mock)
      alert(`Your verification code is: ${otp}`);
      // After modal closes, redirect to OTP page
    } catch (error) {
      throw error; // Let SignupForm handle error
    }
  };

  const handleProcessingClose = () => {
    setShowProcessing(false);
    router.push(`/verify-otp?email=${encodeURIComponent(pendingEmail)}`);
  };

  return (
    <>
      <AuthLayout title="Sign Up" subtitle="Please sign with your details">
        <SignupForm onSignup={handleSignup} />
      </AuthLayout>
      <Modal
        isOpen={showProcessing}
        onClose={handleProcessingClose}
        type="processing"
        autoCloseDelay={2000}
      />
    </>
  );
}