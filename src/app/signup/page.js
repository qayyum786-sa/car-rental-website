"use client";
import React, { useState, useEffect } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    address: '',
    stateId: '',
    cityId: '',
    zipcode: '',
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/states')
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (formData.stateId) {
      fetch(`http://localhost:3000/api/v1/cities?stateId=${formData.stateId}`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch(() => setCities([]));
    } else {
      setCities([]);
      setFormData((prev) => ({ ...prev, cityId: '' }));
    }
  }, [formData.stateId]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.mobile)) errs.mobile = 'Mobile must be 10 digits';
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      errs.email = 'Email is invalid';
    if (formData.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.stateId) errs.stateId = 'Please select a state';
    if (!formData.cityId) errs.cityId = 'Please select a city';
    if (!formData.zipcode.trim()) errs.zipcode = 'Zipcode is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData };

    try {
      const res = await fetch('http://localhost:3000/api/v1/providers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        sessionStorage.setItem('signupPassword', formData.password);
        alert('Registration successful!');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          password: '',
          address: '',
          stateId: '',
          cityId: '',
          zipcode: '',
        });
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch {
      alert('Error submitting the form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-700">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`p-3 rounded border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.name && <small className="text-red-600 mt-1">{errors.name}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="mobile" className="mb-2 font-medium text-gray-700">
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={`p-3 rounded border ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.mobile && <small className="text-red-600 mt-1">{errors.mobile}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-700">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={`p-3 rounded border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.email && <small className="text-red-600 mt-1">{errors.email}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium text-gray-700">
              Create Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={`p-3 rounded border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.password && <small className="text-red-600 mt-1">{errors.password}</small>}
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="address" className="mb-2 font-medium text-gray-700">
              Address <span className="text-red-600">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className={`p-3 rounded border resize-none ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.address && <small className="text-red-600 mt-1">{errors.address}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="stateId" className="mb-2 font-medium text-gray-700">
              State <span className="text-red-600">*</span>
            </label>
            <select
              id="stateId"
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              className={`p-3 rounded border ${
                errors.stateId ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.stateId && <small className="text-red-600 mt-1">{errors.stateId}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="cityId" className="mb-2 font-medium text-gray-700">
              City <span className="text-red-600">*</span>
            </label>
            <select
              id="cityId"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              disabled={!formData.stateId}
              className={`p-3 rounded border ${
                errors.cityId ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${
                !formData.stateId ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.cityId && <small className="text-red-600 mt-1">{errors.cityId}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="zipcode" className="mb-2 font-medium text-gray-700">
              Zipcode <span className="text-red-600">*</span>
            </label>
            <input
              id="zipcode"
              name="zipcode"
              type="text"
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="Enter zipcode"
              className={`p-3 rounded border ${
                errors.zipcode ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.zipcode && <small className="text-red-600 mt-1">{errors.zipcode}</small>}
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-3 rounded shadow transition-colors duration-300 w-full md:w-auto"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
