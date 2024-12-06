// src/components/AssignmentFormWrapper.tsx
'use client';

import React, { useEffect, useState } from 'react';
import AssignmentForm from './AssignmentForm';
import { fetchCandidateLevels } from '@/utils/api';

const AssignmentFormWrapper: React.FC = () => {
  const [levels, setLevels] = useState<string[]>([]);
  const [levelsError, setLevelsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const fetchedLevels = await fetchCandidateLevels();
        setLevels(fetchedLevels);
      } catch (error) {
        setLevelsError('Failed to load candidate levels.');
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AssignmentForm levels={levels} levelsError={levelsError} />;
};

export default AssignmentFormWrapper;
