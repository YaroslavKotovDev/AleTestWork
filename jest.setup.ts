import '@testing-library/jest-dom';

// Check if TextEncoder and TextDecoder are undefined in the global scope
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

// Mock window.alert to prevent actual alerts during tests
jest.spyOn(window, 'alert').mockImplementation(() => {});
