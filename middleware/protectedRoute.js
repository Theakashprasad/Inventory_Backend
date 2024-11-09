import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = JSON.parse(authHeader.split(" ")[1]); // "Bearer token"
  console.log("token", token);

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    console.log("1");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("2");

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    console.log("user", user);

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
