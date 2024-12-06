// src/components/AssignmentForm.tsx

'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { submitAssignment } from '@/utils/api';

type AssignmentFormProps = {
  levels: string[];
  levelsError: string | null;
};

/**
 * AssignmentForm component allows users to submit their assignments.
 *
 * @returns {JSX.Element} The rendered form component.
 */
const AssignmentForm: React.FC<AssignmentFormProps> = ({ levels, levelsError }) => {
  // Initialize react-hook-form with validation mode 'onChange'
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({ mode: 'onChange' });

  const router = useRouter(); // Initialize Next.js router for navigation

  /**
   * Handles form submission.
   *
   * @param {FormData} data - The data submitted by the user.
   */
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      // Call the API utility to submit the assignment
      await submitAssignment({
        name: data.name,
        email: data.email,
        assignment_description: data.assignmentDescription,
        github_repo_url: data.githubRepoUrl,
        candidate_level: data.candidateLevel,
      });

      // Redirect the user to the thank-you page upon successful submission
      router.push('/thank-you');
    } catch (error: any) {
      // Check if the error response contains validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        // Iterate through each error message returned by the API
        error.response.data.errors.forEach((err: string) => {
          // Set field-specific errors based on the error message content
          if (err.toLowerCase().includes('name')) {
            setError('name', { message: err });
          }
          if (err.toLowerCase().includes('email')) {
            setError('email', { message: err });
          }
          if (err.toLowerCase().includes('assignment')) {
            setError('assignmentDescription', { message: err });
          }
          if (err.toLowerCase().includes('github')) {
            setError('githubRepoUrl', { message: err });
          }
          if (err.toLowerCase().includes('candidate level')) {
            setError('candidateLevel', { message: err });
          }
        });
      } else {
        // Display a general error message if the error is not field-specific
        alert('There was an error submitting the form.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)} // Handle form submission
        className="bg-white p-5 md:p-6 rounded-lg shadow-lg w-full max-w-[1480px]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Submit Your Assignment
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {required: 'Name is required.'})} // Register the field with validation
            className={`w-full px-4 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            placeholder="Enter your full name"
            defaultValue="" // Prevents uncontrolled to controlled component warning
          />
          {/* Display validation error for Name */}
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.name?.message === 'string' ? errors.name.message : null}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: 'Invalid email format.',
              },
            })} // Register the field with validation
            className={`w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            placeholder="you@example.com"
            defaultValue=""
          />
          {/* Display validation error for Email */}
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.email?.message === 'string' ? errors.email.message : null}
            </p>
          )}
        </div>

        {/* Assignment Description Field */}
        <div className="mb-4">
          <label htmlFor="assignmentDescription" className="block text-gray-700 font-medium mb-1">
            Assignment Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="assignmentDescription"
            {...register('assignmentDescription', {required: 'Assignment description is required.'})} // Register the field with validation
            className={`w-full px-4 py-2 border ${
              errors.assignmentDescription ? 'border-red-500' : 'border-gray-300'
            } rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            rows={3}
            placeholder="Describe your assignment in detail..."
            defaultValue=""
          ></textarea>
          {/* Display validation error for Assignment Description */}
          {errors.assignmentDescription && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.assignmentDescription?.message === 'string' ? errors.assignmentDescription.message : null}
            </p>
          )}
        </div>

        {/* GitHub Repository URL Field */}
        <div className="mb-4">
          <label htmlFor="githubRepoUrl" className="block text-gray-700 font-medium mb-1">
            GitHub Repository URL<span className="text-red-500">*</span>
          </label>
          <input
            id="githubRepoUrl"
            type="url"
            {...register('githubRepoUrl', {
              required: 'GitHub repository URL is required.',
              pattern: {
                value: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/?$/,
                message: 'Invalid GitHub repository URL format.',
              },
            })} // Register the field with validation
            className={`w-full px-4 py-2 border ${
              errors.githubRepoUrl ? 'border-red-500' : 'border-gray-300'
            } rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            placeholder="https://github.com/username/repository"
            defaultValue=""
          />
          {/* Display validation error for GitHub Repository URL */}
          {errors.githubRepoUrl && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.githubRepoUrl?.message === 'string' ? errors.githubRepoUrl.message : null}
            </p>
          )}
        </div>

        {/* Candidate Level Field */}
        <div className="mb-6">
          <label htmlFor="candidateLevel" className="block text-gray-700 font-medium mb-1">
            Candidate Level<span className="text-red-500">*</span>
          </label>
          {levelsError ? (
            // Display error message if fetching candidate levels fails
            <p className="text-red-500">{levelsError}</p>
          ) : (
            // Render the dropdown with fetched candidate levels
            <select
              id="candidateLevel"
              {...register('candidateLevel', {required: 'Please select a candidate level.'})} // Register the field with validation
              className={`w-full px-4 py-2 border ${
                errors.candidateLevel ? 'border-red-500' : 'border-gray-300'
              } rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              defaultValue=""
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          )}
          {/* Display validation error for Candidate Level */}
          {errors.candidateLevel && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.candidateLevel?.message === 'string' ? errors.candidateLevel.message : null}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || Boolean(levelsError)} // Ensure levelsError is converted to a boolean
          className={`w-full bg-blue-600 text-white py-2 rounded-lg transition duration-300 ${
            !isValid || Boolean(levelsError)
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
