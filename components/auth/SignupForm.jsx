'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';

export default function SignupForm({ onSignup }) {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return 'Full name required';
    if (!form.phone.trim()) return 'Phone number required';
    if (!form.email.includes('@')) return 'Valid email required';
    const pass = form.password;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!strongRegex.test(pass)) return 'Password must contain upper, lower, special char and min 8 chars';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) return setError(errMsg);
    setError('');
    setLoading(true);
    try {
      const { email, otp } = await onSignup({ name: form.name, phone: form.phone, email: form.email, password: form.password });
      // Store email temporarily for OTP page
      sessionStorage.setItem('pendingSignupEmail', email);
      // Show OTP in alert (mock)
      alert(`Your verification code is: ${otp}`);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && <Alert type="error" message={error} />}
      <Input label="Name" name="name" placeholder="First name, middle name, last name" value={form.name} onChange={handleChange} required />
      <Input label="Phone Number" name="phone" placeholder="Enter your mobile number" value={form.phone} onChange={handleChange} required />
      <Input label="Email" name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
      <Input label="Password" name="password" type="password" placeholder="....." value={form.password} onChange={handleChange} required />
      <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="....." value={form.confirmPassword} onChange={handleChange} required />
      <p className="text-xs text-gray-500 mt-1">*Password must contain Upper case, lowercase and special character. It must be at least 8 characters.</p>
      <Button type="submit" loading={loading} className="w-full">
        Sign Up
      </Button>
    </form>
  );
}