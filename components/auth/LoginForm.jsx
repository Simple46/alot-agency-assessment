"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full ">
      {error && <Alert type="error" message={error} />}
      <Input
        label="Email"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="**"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="text-right">
        <a
          href="/forgot-password"
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Forgot password
        </a>
      </div>
      <Button type="submit" loading={loading} className="w-full">
        Log In
      </Button>
      <p className="text-center text-sm text-gray-500 mt-4">
        Are you a Student?{" "}
        <a href="/signup" className="text-indigo-600 font-medium">
          Sign In
        </a>
      </p>
    </form>
  );
}
