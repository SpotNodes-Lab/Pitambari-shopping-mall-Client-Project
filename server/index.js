import "dotenv/config";
import cors from "cors";
import crypto from "crypto";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pitambari_rewards";
const WEB_BASE_URL = process.env.WEB_BASE_URL || "http://localhost:5173";

app.use(cors());
app.use(express.json());

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, default: "Points Updated" },
    pointsChange: { type: Number, default: 0 },
    note: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    points: { type: Number, default: 0, min: 0 },
    token: { type: String, unique: true, index: true },
    recentActivity: { type: [activitySchema], default: [] },
  },
  { timestamps: true }
);

customerSchema.pre("validate", function setToken(next) {
  if (!this.token) this.token = crypto.randomBytes(24).toString("hex");
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

const getTierFromPoints = (points) => {
  if (points >= 500) return "Gold";
  if (points >= 200) return "Silver";
  return "Starter";
};

app.get("/api/rewards/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/rewards/customers", async (req, res) => {
  try {
    const { name, phone = "", email = "", points = 0 } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Name is required" });

    const customer = await Customer.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      points: Number(points) || 0,
      recentActivity: [
        {
          type: "Customer Created",
          pointsChange: Number(points) || 0,
          note: "Initial points assigned",
        },
      ],
    });

    return res.status(201).json({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      points: customer.points,
      tier: getTierFromPoints(customer.points),
      token: customer.token,
      rewardUrl: `${WEB_BASE_URL}/rewards/${customer.token}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Could not create customer", error: String(error) });
  }
});

app.get("/api/rewards/customers", async (_req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(
      customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        points: customer.points,
        tier: getTierFromPoints(customer.points),
        token: customer.token,
        rewardUrl: `${WEB_BASE_URL}/rewards/${customer.token}`,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Could not fetch customers", error: String(error) });
  }
});

app.patch("/api/rewards/customers/:id/points", async (req, res) => {
  try {
    const { id } = req.params;
    const { points, note = "Manual update by admin" } = req.body;
    if (typeof points !== "number" || Number.isNaN(points) || points < 0) {
      return res.status(400).json({ message: "Valid points value is required" });
    }

    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const oldPoints = customer.points;
    customer.points = points;
    customer.recentActivity.unshift({
      type: "Points Updated",
      pointsChange: points - oldPoints,
      note,
    });
    customer.recentActivity = customer.recentActivity.slice(0, 10);
    await customer.save();

    return res.json({
      id: customer.id,
      points: customer.points,
      tier: getTierFromPoints(customer.points),
    });
  } catch (error) {
    return res.status(500).json({ message: "Could not update points", error: String(error) });
  }
});

app.get("/api/rewards/customer/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const customer = await Customer.findOne({ token }).lean();
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    return res.json({
      name: customer.name,
      points: customer.points,
      tier: getTierFromPoints(customer.points),
      recentActivity: (customer.recentActivity || []).slice(0, 6),
      contact: {
        phone: customer.phone,
        email: customer.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch customer", error: String(error) });
  }
});

app.get("/api/rewards/customer/:token/contact.vcf", async (req, res) => {
  try {
    const { token } = req.params;
    const customer = await Customer.findOne({ token }).lean();
    if (!customer) return res.status(404).send("Customer not found");

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${customer.name}`,
      customer.phone ? `TEL;TYPE=CELL:${customer.phone}` : "",
      customer.email ? `EMAIL;TYPE=INTERNET:${customer.email}` : "",
      "END:VCARD",
    ].filter(Boolean);

    res.setHeader("Content-Type", "text/vcard; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${customer.name.replace(/\s+/g, "-").toLowerCase()}.vcf"`
    );
    return res.send(lines.join("\n"));
  } catch (error) {
    return res.status(500).send(String(error));
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Rewards API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();
