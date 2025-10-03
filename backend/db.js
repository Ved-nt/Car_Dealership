const mongoose = require("mongoose");

const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in .env");
      }
      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected successfully");
      break; // Exit loop if connected
    } catch (error) {
      retries -= 1;
      console.error(`❌ MongoDB connection failed. Retries left: ${retries}`);
      console.error(error.message);
      if (retries === 0) process.exit(1); // Exit if all retries fail
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before retry
    }
  }
};

module.exports = connectDB;

