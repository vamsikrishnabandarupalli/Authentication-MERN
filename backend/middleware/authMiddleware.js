exports.verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access token missing');

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid access token');
    req.userId = decoded.userId;
    next();
  });
};
