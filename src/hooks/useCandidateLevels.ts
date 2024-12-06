// src/hooks/useCandidateLevels.ts

import { useEffect, useState } from 'react';
import { fetchCandidateLevels } from '@/utils/api';

/**
 * Custom hook to fetch candidate levels from the API.
 *
 * @returns {Object} An object containing the levels array, loading state, and any error message.
 */
const useCandidateLevels = () => {
  const [levels, setLevels] = useState<string[]>([]); // Stores the fetched candidate levels
  const [loading, setLoading] = useState<boolean>(true); // Indicates if the data is currently being loaded
  const [error, setError] = useState<string | null>(null); // Stores any error message encountered during fetching

  useEffect(() => {
    /**
     * Fetches candidate levels and updates state accordingly.
     */
    const fetchLevels = async () => {
      try {
        // Call the API utility to fetch candidate levels
        const fetchedLevels = await fetchCandidateLevels();
        setLevels(fetchedLevels); // Update the levels state with fetched data
      } catch (err) {
        console.error(err)
        // Update the error state if fetching fails
        setError('Failed to load candidate levels. Please try again later.');
      } finally {
        // Set loading to false after the fetch attempt completes
        setLoading(false);
      }
    };

    fetchLevels(); // Initiate the fetch operation
  }, []); // Empty dependency array ensures this runs once on component mount

  return { levels, loading, error }; // Return the levels, loading state, and error message
};

export default useCandidateLevels;
