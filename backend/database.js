const mongoose = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect("mongodb+srv://root:Abhi%408970@cluster0.zvyeu.mongodb.net/Schopfer", {
    });
    console.log(" Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
   
  }
};

module.exports = database;
