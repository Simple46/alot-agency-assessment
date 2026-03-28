'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert'; 
import { useRouter } from 'next/navigation'




export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      // setMessage(`Reset link sent! (mock token: ${res.token})`);
      // navigate to reset password page with token (in real app)
      // router.push(`/reset-password?token=${res.token}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}
      <Input label="Email" type="email" placeholder="Hannahibukun628@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div className="flex gap-3">
        <Button type="submit" loading={loading} className="flex-1">
          Reset Password
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = '/login')} className="flex-1">
          Back
        </Button>
      </div>
    </form>
  );
}