// tests/api/data.js
export const newUser = (overrides = {}) => ({
  name: 'Mahoula QA',
  job: 'Senior QA Engineer',
  ...overrides,
});