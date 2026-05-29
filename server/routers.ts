import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";

// Create a transporter using SMTP (Gmail SMTP or any SMTP service)
// We use environment variables for credentials — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// If not configured, we fall back to Ethereal (test) transport
async function getTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");

  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  // Fallback: create test account on Ethereal for dev/testing
  const testAccount = await nodemailer.createTestAccount();
  console.log("[Email] Using Ethereal test account:", testAccount.user);
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    sendEmail: publicProcedure
      .input(
        z.object({
          ime: z.string().min(1),
          email: z.string().email(),
          namen: z.string().optional(),
          sporocilo: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const transporter = await getTransporter();

        const htmlBody = `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; color: #3A3A3A;">
            <h2 style="color: #3D5240; font-weight: 400; margin-bottom: 1.5rem;">
              Novo sporočilo prek spletne strani
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; color: #7A7A7A; width: 140px; vertical-align: top;">Ime in priimek:</td>
                <td style="padding: 0.5rem 0; font-weight: 500;">${input.ime}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; color: #7A7A7A; vertical-align: top;">E-naslov:</td>
                <td style="padding: 0.5rem 0;"><a href="mailto:${input.email}" style="color: #3D5240;">${input.email}</a></td>
              </tr>
              ${input.namen ? `
              <tr>
                <td style="padding: 0.5rem 0; color: #7A7A7A; vertical-align: top;">Namen:</td>
                <td style="padding: 0.5rem 0;">${input.namen}</td>
              </tr>` : ""}
            </table>
            <hr style="border: none; border-top: 1px solid #E0D4C8; margin: 1.5rem 0;" />
            <p style="color: #7A7A7A; font-size: 0.85rem; margin-bottom: 0.5rem;">Sporočilo:</p>
            <p style="line-height: 1.8; white-space: pre-wrap;">${input.sporocilo}</p>
            <hr style="border: none; border-top: 1px solid #E0D4C8; margin: 1.5rem 0;" />
            <p style="color: #9E8E7A; font-size: 0.8rem;">
              Sporočilo je bilo poslano prek kontaktnega obrazca na petravajs.si
            </p>
          </div>
        `;

        const info = await transporter.sendMail({
          from: `"Petra Vajs — Spletna stran" <${process.env.SMTP_USER || "noreply@petravajs.si"}>`,
          to: "ambulanta@sigmund-freud.si",
          cc: "petravajs@gmail.com",
          replyTo: input.email,
          subject: `Novo sporočilo od ${input.ime} — Petra Vajs Psihoterapija`,
          text: `Ime in priimek: ${input.ime}\nE-naslov: ${input.email}\n${input.namen ? `Namen: ${input.namen}\n` : ""}\nSporočilo:\n${input.sporocilo}`,
          html: htmlBody,
        });

        console.log("[Email] Sent:", info.messageId);
        // If using Ethereal, log preview URL
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log("[Email] Preview URL:", previewUrl);
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
