// src/__tests__/AssignmentForm.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import AssignmentForm from '@/components/AssignmentForm';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

// Мокаем useRouter из next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AssignmentForm', () => {
  const push = jest.fn();
  const mockLevels = ['Junior', 'Middle', 'Senior', 'Principal'];
  const mockLevelsError = null;

  beforeEach(() => {
    const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

    const mockRouter: Partial<AppRouterInstance> = {
      push,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
    };

    mockedUseRouter.mockReturnValue(mockRouter as AppRouterInstance);
  });
  test('renders all form fields correctly', () => {
    render(<AssignmentForm levels={mockLevels} levelsError={mockLevelsError} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assignment Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub Repository URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Candidate Level/i)).toBeInTheDocument();

    // Кнопка изначально задизейблена
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  test('enables submit button when form is valid', async () => {
    render(<AssignmentForm levels={mockLevels} levelsError={mockLevelsError} />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const descInput = screen.getByLabelText(/Assignment Description/i);
    const urlInput = screen.getByLabelText(/GitHub Repository URL/i);
    const levelSelect = screen.getByLabelText(/Candidate Level/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    // Вводим валидные данные
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john.doe@example.com');
    await userEvent.type(descInput, 'This is a test assignment.');
    await userEvent.type(urlInput, 'https://github.com/johndoe/repo');
    await userEvent.selectOptions(levelSelect, 'Junior');

    // Ждём, когда форма станет валидной и кнопка станет активной
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });
});
