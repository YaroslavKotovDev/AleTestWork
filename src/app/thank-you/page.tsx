// src/app/thank-you/page.tsx

import React from 'react';
import Link from 'next/link';

/**
 * ThankYouPage component displays a confirmation message after successful form submission.
 *
 * @returns {JSX.Element} The rendered thank-you page component.
 */
const ThankYouPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your assignment has been successfully submitted. We will review it and get back to you shortly.
        </p>
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          Go back to the form
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
