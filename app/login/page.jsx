import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Please sign into your account as a Tutor"
    >
      <LoginForm />
    </AuthLayout>
  );
}
