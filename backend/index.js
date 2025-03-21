const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Task } = require("./Schema");
const database = require("./database");
const auth = require("./Auth");
const cookieParser = require("cookie-parser");
const cors = require("cors")


const app = express();
const PORT = 5000;

database();

app.use(cors({
  origin : "http://localhost:5173",
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password,10 );
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "Abhi@123", { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});





app.post("/tasks", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ userId: req.user._id, title, description });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/tasks/:id/complete", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { status: "Completed" },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task marked as completed", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
