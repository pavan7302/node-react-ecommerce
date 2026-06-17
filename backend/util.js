import jwt from "jsonwebtoken";

/**
 * Generate JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/**
 * Auth middleware
 */
export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send({ message: "No token" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

/**
 * Admin middleware
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({ message: "Admin access required" });
  }
};
