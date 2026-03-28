'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');
    if (emailParam) setEmail(emailParam);
    if (tokenParam) setToken(tokenParam);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !token) return setError('Missing reset credentials. Please request a new reset link.');
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!strongRegex.test(newPassword)) return setError('Password must contain upper, lower, special char and min 8 chars');
    if (newPassword !== confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    try {
      await resetPassword(email, newPassword, token);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return <Alert type="success" message="Password changed successfully! Redirecting to login..." />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <Alert type="error" message={error} />}
      <Input label="New Password" type="password" placeholder="Type your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      <Input label="Retype Password" type="password" placeholder="Retype your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <p className="text-xs text-gray-500">*Password must contain Upper case, lowercase and special character. *It must be at least 8 characters.</p>
      <Button type="submit" loading={loading} className="w-full">
        Save Password
      </Button>
    </form>
  );
}