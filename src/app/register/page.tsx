'use client'
import userRegister from '@/libs/userRegister';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    tel:'',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do NOT match");
      return; // Stop further execution
    }

    try {
      await userRegister(formData.name, formData.email, formData.password, formData.tel);
      // Redirect user to login page after successful registration
      router.push('/api/auth/signin'); 
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error, e.g., display error message to user
    }
  };
  
  // window.location.href = '/api/auth/signin';
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create an Account
        </h2>

        {/* UserName */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 mb-2">
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Tel */}
        <div className="mb-4">
          <label htmlFor="tel" className="block text-gray-400 mb-2">
            Tel.
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Tel."
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
