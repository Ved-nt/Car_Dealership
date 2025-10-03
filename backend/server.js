// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db"); // Database connection
const mongoose = require("mongoose");

const app = express();

// --------------------- MIDDLEWARES ---------------------
app.use(cors());
app.use(express.json());

// ------------------ MONGODB CONNECTION -----------------
connectDB();

// -------------------- CONTACT SCHEMA & ROUTE --------------------
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    budget: { type: String, required: true },
    interestedCar: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/contact", async (req, res) => {
  const { name, email, whatsapp, budget, interestedCar } = req.body;

  if (!name || !email || !whatsapp || !budget || !interestedCar) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const contact = new Contact({ name, email, whatsapp, budget, interestedCar });
    await contact.save();
    res.status(201).json({ success: true, message: "Contact saved successfully" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- CAR SCHEMA & MODEL ------------------
const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true }, // Array of image URLs
    description: { type: String, required: true },
    year: { type: Number, required: true },
    fuelType: { type: String, required: true },
    driven: { type: String, required: true },
    transmission: { type: String, required: true }, // Automatic / Manual
    ownership: { type: String, required: true },   // First / Second
    registration: { type: String, required: true }, // e.g., HR
    color: { type: String, required: true },      // e.g., White
    bodyType: { type: String, required: true },   // SUV / Sedan
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

// ---------------------- CAR ROUTES -------------------------

// ➕ Add a new car (Admin)
app.post("/api/cars", async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      images,
      description,
      year,
      fuelType,
      driven,
      transmission,
      ownership,
      registration,
      color,
      bodyType,
    } = req.body;

    if (
      !name ||
      !brand ||
      !price ||
      !images ||
      !description ||
      !year ||
      !fuelType ||
      !driven ||
      !transmission ||
      !ownership ||
      !registration ||
      !color ||
      !bodyType
    ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const car = new Car({
      name,
      brand,
      price,
      images,
      description,
      year,
      fuelType,
      driven,
      transmission,
      ownership,
      registration,
      color,
      bodyType,
    });

    await car.save();
    res.status(201).json({ success: true, message: "Car added successfully", car });
  } catch (err) {
    console.error("❌ Error adding car:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📋 Get all cars
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json({ success: true, cars });
  } catch (err) {
    console.error("❌ Error fetching cars:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📝 Get car by ID
app.get("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });
    res.json({ success: true, car });
  } catch (err) {
    console.error("❌ Error fetching car by ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------- DELETE CAR -------------------------
app.delete("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    await Car.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting car:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------- ADMIN LOGIN -------------------------
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Get admin credentials from .env
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    return res.json({ success: true, message: "Admin login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});


// ---------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
