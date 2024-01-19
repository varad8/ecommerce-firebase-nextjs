// pages/api/sendInvoice.js
import { Order } from "@/lib/models/Order";
import nodemailer from "nodemailer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ejs from "ejs";
import fs from "fs";

export default async function handler(req, res) {
  const { orderId } = req.body;

  console.log(orderId, typeof orderId);

  // Generate Invoice Number using uuid
  function generateInvoiceNo() {
    const uniqueId = uuidv4();
    const numericId = parseInt(uniqueId.replace(/-/g, ""), 16) % 1000000;
    return numericId.toString().padStart(6, "0");
  }

  if (!orderId) {
    return res.status(400).json({ error: "Missing OrderID parameter." });
  }

  const invoiceData = await Order.findById(orderId);

  if (invoiceData) {
    // Calculate subtotal based on line items' prices and quantities
    const subtotal = invoiceData.line_items.reduce((total, item) => {
      const unitAmount = item.price_data.unit_amount / 100;
      const itemSubtotal = unitAmount * item.quantity;
      return total + itemSubtotal;
    }, 0);
    const invoiceNo = generateInvoiceNo();

    // Read the EJS template from the public directory
    const templatePath = path.join(
      process.cwd(),
      "public",
      "invoice-template.ejs"
    );
    const templateContent = fs.readFileSync(templatePath, "utf-8");

    // Render the EJS template with invoiceData
    const invoiceHtml = ejs.render(templateContent, {
      invoiceData,
      invoiceNo,
      subtotal,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "varadnikharage201@gmail.com",
        pass: "kwnzepcjzwmchdqu",
      },
    });

    try {
      const mailOptions = {
        from: "varadnikharage201@gmail.com",
        to: invoiceData?.email,
        subject: "Invoice",
        html: invoiceHtml, // Add your HTML content here
      };

      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Invoice email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email." });
    }
  }
}
