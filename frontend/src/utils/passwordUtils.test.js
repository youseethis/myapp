// utils/passwordUtils.test.js
import generateRandomPassword from './passwordUtils';

describe('generateRandomPassword', () => {
  it('should generate a password of the specified length', () => {
    const length = 12;
    const password = generateRandomPassword(length);
    expect(password).toHaveLength(length);
  });

  it('should generate an alphanumeric password', () => {
    const length = 12;
    const password = generateRandomPassword(length);
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    expect(password).toMatch(alphanumericRegex);
  });

  it('should generate different passwords on subsequent calls', () => {
    const length = 12;
    const password1 = generateRandomPassword(length);
    const password2 = generateRandomPassword(length);
    expect(password1).not.toBe(password2);
  });
});
