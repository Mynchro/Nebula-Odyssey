export const authMiddleware = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Nicht autorisiert, bitte einloggen." });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({
        message: "Access-Token abgelaufen, bitte neu authentifizieren.",
      });
  }
};
