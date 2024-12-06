// src/utils/api.ts

import axios from 'axios';

interface AssignmentResponse {
  success: boolean;
  message?: string;
}

/**
 * Fetches the list of candidate levels from the API.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of candidate level strings.
 * @throws Will throw an error if the API request fails.
 */
export const fetchCandidateLevels = async (): Promise<string[]> => {
  try {
    // Send a GET request to the API endpoint to retrieve candidate levels
    const response = await axios.get('https://tools.qa.public.ale.ai/api/tools/candidates/levels');
    // Extract and return the 'levels' array from the response data
    return response.data.levels;
  } catch (error) {
    // Handle and rethrow errors for higher-level handling
    console.error('Error fetching candidate levels:', error);
    throw error;
  }
};

/**
 * Submits an assignment to the API.
 *
 * @param {Object} data - The assignment data to be submitted.
 * @param {string} data.name - The name of the candidate.
 * @param {string} data.email - The email address of the candidate.
 * @param {string} data.assignment_description - A description of the assignment.
 * @param {string} data.github_repo_url - The GitHub repository URL related to the assignment.
 * @param {string} data.candidate_level - The level of the candidate (e.g., Junior, Middle).
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 * @throws Will throw an error if the API request fails.
 */
export const submitAssignment = async (data: {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}): Promise<AssignmentResponse> => {
  try {
    // Send a POST request to the API endpoint with the assignment data
    const response = await axios.post('https://tools.qa.public.ale.ai/api/tools/candidates/assignments', data);
    // Return the response data from the API
    return response.data;
  } catch (error) {
    // Handle and rethrow errors for higher-level handling
    console.error('Error submitting assignment:', error);
    throw error;
  }
};
