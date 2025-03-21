const jwt = require("jsonwebtoken");
const { User } = require("./Schema");


const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; 
    if (!token) {
      return res.status(401).json({ error: "No Token Provided" });
    }

    const decoded = jwt.verify(token, "Abhi@123");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    req.user = user; 
    next(); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = auth;
