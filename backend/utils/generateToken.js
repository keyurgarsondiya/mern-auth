import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // To generate a secret key for ACCESS_TOKEN_SECRET you can run in node
  // require('crypto').randomBytes(64).toString('hex')
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
