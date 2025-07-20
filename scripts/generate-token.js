const jwt = require('jsonwebtoken');

// Get JWT secret from environment variable or use default
const JWT_SECRET = 'gusto-code-testing-shijie' // whatever you like, just for testing;
const DEFAULT_USER_ID = 'test-user';
const EXPIRES_IN = '7d';

function generateToken(userId = DEFAULT_USER_ID) {
  const payload = {
    userId: userId,
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

const userId = process.argv[2] || DEFAULT_USER_ID;
const token = generateToken(userId);

console.log('JWT Token Generated Successfully!');
console.log('=====================================');
console.log(`User ID: ${userId}`);
console.log(`Expires In: ${EXPIRES_IN}`);
console.log(`Using Secret: ${JWT_SECRET === 'gusto-code-testing-shijie' ? 'default' : 'custom'}`);
console.log('');
console.log('Token:');
console.log(token);