const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      `../invoices/invoice_${order._id}.pdf`
    );

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // 🏷️ LOGO
    const logoPath = path.join(__dirname, "../assets/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 30, { width: 80 });
    }

    // 🏪 STORE INFO (RIGHT SIDE)
    doc
      .fontSize(18)
      .fillColor("#2563eb")
      .text("MODEST WEAR", 300, 40, { align: "right" });

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Nashik, India", { align: "right" })
      .text("support@modestwear.com", { align: "right" });

    doc.moveDown(2);

    // 📄 INVOICE DETAILS BOX
    doc
      .rect(40, 120, 520, 60)
      .stroke();

    doc
      .fontSize(11)
      .text(`Invoice ID: ${order._id}`, 50, 130)
      .text(`Date: ${new Date().toLocaleDateString()}`, 50, 145);

    // 👤 CUSTOMER BOX
    doc
      .rect(40, 190, 520, 80)
      .stroke();

    doc
      .fontSize(11)
      .text("Bill To:", 50, 200, { underline: true })
      .text(order.user.name)
      .text(order.user.email)
      .text(order.address)
      .text(`Phone: ${order.phone}`);

    doc.moveDown(4);

    // 📊 TABLE HEADER
    const tableTop = 290;

    doc
      .fontSize(12)
      .fillColor("white")
      .rect(40, tableTop, 520, 25)
      .fill("#2563eb");

    doc
      .fillColor("white")
      .text("Item", 50, tableTop + 7)
      .text("Qty", 250, tableTop + 7)
      .text("Price", 320, tableTop + 7)
      .text("Total", 420, tableTop + 7);

    let y = tableTop + 30;
    let totalAmount = 0;

    // 🛍️ ITEMS
    order.orderItems.forEach((item, index) => {
      const itemTotal = item.qty * item.price;
      totalAmount += itemTotal;

      doc
        .fillColor("black")
        .fontSize(11)
        .text(item.name, 50, y)
        .text(item.qty, 250, y)
        .text(`₹${item.price}`, 320, y)
        .text(`₹${itemTotal}`, 420, y);

      y += 25;

      // Row divider
      doc.moveTo(40, y).lineTo(560, y).stroke();
    });

    // 💰 TOTAL BOX
    doc
      .rect(300, y + 20, 260, 40)
      .fill("#f3f4f6");

    doc
      .fillColor("#2563eb")
      .fontSize(14)
      .text(`Total: ₹${totalAmount}`, 320, y + 30);

    doc.moveDown(5);

    // ❤️ FOOTER
    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Thank you for shopping with Modest Wear ❤️", {
        align: "center",
      });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

module.exports = generateInvoice;