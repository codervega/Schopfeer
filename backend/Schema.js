const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid'); // Import UUID package


const userSchema = new mongoose.Schema({
  userId: { 
    type: String, // Change to String to store the UUID
    required: true, 
    unique: true, 
    default: () => uuidv4() // Generate a UUID by default
  },
  email : {
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
   type: String, 
   required: true 
  },
},{ timestamps: true }) 

const taskSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  title: { 
    type: String, 
    required: true },
  description: { 
    type: String
   },
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Completed"], 
    default: "Pending"
   },
  category: { 
    type: String, 
    enum: ["Work", "Personal", "Urgent"],
    default: "Personal" 
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = { User, Task };