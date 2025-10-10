const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer"); // 🟢 NEW

const app = express();

// --------------------- MIDDLEWARES ---------------------
app.use(cors({
  origin:"https://autotradzllp.vercel.app",
  methods:'*'
}));
app.use(express.json());

// ------------------ MONGODB CONNECTION -----------------
connectDB();

// -------------------- CONTACT SCHEMA --------------------
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

// -------------------- NODEMAILER TRANSPORT --------------------
// Using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // App Password (not normal password)
  },
});

// -------------------- CONTACT ROUTE --------------------
app.post("/api/contact", async (req, res) => {
  const { name, email, whatsapp, budget, interestedCar } = req.body;

  if (!name || !email || !whatsapp || !budget || !interestedCar) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // 1️⃣ Save contact to DB
    const contact = new Contact({ name, email, whatsapp, budget, interestedCar });
    await contact.save();

    // 2️⃣ Send email notification to Uncle
    const mailOptions = {
      from: `"Car Website" <${process.env.EMAIL_USER}>`,
      to: process.env.UNCLE_EMAIL, // Uncle's email from .env
      subject: `🚨 New Inquiry from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Interested Car:</strong> ${interestedCar}</p>
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Contact saved & email sent to Uncle!" });
  } catch (err) {
    console.error("❌ Error in contact route:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- CAR SCHEMA & MODEL ------------------
const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    fuelType: { type: String, required: true },
    driven: { type: String, required: true },
    transmission: { type: String, required: true },
    ownership: { type: String, required: true },
    registration: { type: String, required: true },
    color: { type: String, required: true },
    bodyType: { type: String, required: true },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

// ---------------------- CAR ROUTES -------------------------
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

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json({ success: true, cars });
  } catch (err) {
    console.error("❌ Error fetching cars:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

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

app.patch("/api/cars/:id/sold", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    car.isSold = true;
    await car.save();

    res.json({ success: true, message: "Car marked as sold", car });
  } catch (err) {
    console.error("❌ Error marking car as sold:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

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
