//src/components/auth/SignupForm.tsx
'use client';
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';

const SignupForm = () => {
  const { signup, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for email and password */}
      <button type="submit" disabled={loading}>Sign Up</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignupForm;