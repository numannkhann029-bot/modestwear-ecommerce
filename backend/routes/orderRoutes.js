const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");
const generateInvoice = require("../utils/generateInvoice");

// ✅ EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ CREATE ORDER
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Order:", req.body);

    const { orderItems, totalPrice, user, address, phone } = req.body;

    // ✅ VALIDATION
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items ❌" });
    }

    if (!user || !address || !phone) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    // ✅ CREATE ORDER (FIXED STATUS)
    const order = new Order({
      orderItems,
      totalPrice,
      user,
      address,
      phone,
      status: "processing",
    });

    const savedOrder = await order.save();

    const populatedOrder = await savedOrder.populate("user", "name email");

    // 📄 GENERATE INVOICE
    const invoicePath = await generateInvoice(populatedOrder);

    const itemsList = orderItems
      .map((item) => `${item.name} (x${item.qty}) - ₹${item.price}`)
      .join("\n");

    // 📧 EMAIL
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: populatedOrder.user.email,
      subject: "🛍️ Order Confirmation - Modest Wear",
      text: `
Hello ${populatedOrder.user.name},

✅ Your order has been placed successfully!

📦 Order Details:
${itemsList}

💰 Total: ₹${totalPrice}

📍 Address:
${address}

📞 Phone:
${phone}

📎 Invoice attached

Thank you ❤️
      `,
      attachments: [
        {
          filename: `invoice_${savedOrder._id}.pdf`,
          path: invoicePath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log("📧 Email + Invoice sent");

    res.status(201).json(savedOrder);

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Error fetching orders ❌" });
  }
});

// ✅ GET USER ORDERS
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Error fetching user orders ❌" });
  }
});

// ✅ UPDATE STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    order.status = status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch {
    res.status(500).json({ message: "Error updating status ❌" });
  }
});

module.exports = router;