import { describe, it, expect } from "vitest";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

describe("SMTP credentials", () => {
  it("should verify SMTP connection with provided credentials", async () => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");

    expect(smtpHost, "SMTP_HOST must be set").toBeTruthy();
    expect(smtpUser, "SMTP_USER must be set").toBeTruthy();
    expect(smtpPass, "SMTP_PASS must be set").toBeTruthy();

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // verify() checks if the SMTP server accepts our credentials
    const result = await transporter.verify();
    expect(result).toBe(true);
  }, 15000);
});
