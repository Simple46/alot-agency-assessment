// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import AuthLayout from '@/components/auth/AuthLayout';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import Alert from '@/components/ui/Alert';

// export default function VerifyOtpPage() {
//   const { verifyOtp } = useAuth();
//   const router = useRouter();
//   //get email not from query params but from router state (passed from signup page)
//   const email = router.query.email || (router.state && router.state.email);
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!email) {
//       router.push('/signup');
//     }
//   }, [email, router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp || otp.length !== 6) {
//       setError('Please enter a 6-digit code');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       await verifyOtp(email, otp);
//       router.push('/upload-profile');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout title="An email has been sent to you" subtitle={`Enter the 6-digit verification code sent to ${email || 'your email'}.`}>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {error && <Alert type="error" message={error} />}
//         <Input
//           label="Verification Code"
//           type="text"
//           placeholder="000000"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//           maxLength={6}
//         />
//         <div className="flex justify-between text-sm">
//           <a href="#" className="text-indigo-600">Resend code</a>
//           <Button type="submit" loading={loading} variant="primary">
//             Submit
//           </Button>
//         </div>
//         <p className="text-xs text-gray-500">*If you do not see the email in your inbox, check your spam folder.</p>
//       </form>
//     </AuthLayout>
//   );
// }