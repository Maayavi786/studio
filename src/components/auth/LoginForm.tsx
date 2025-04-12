//src/components/auth/LoginForm.tsx
'use client';
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for email and password */}
      <button type="submit" disabled={loading}>Log In</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default LoginForm;