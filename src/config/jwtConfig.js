// Generate a random secret key
const secretKey = process.env.JWT_SECRET_KEY || 'fallback-key';

module.exports = { secretKey };