import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { ThankYouMail, textcontent } from "@/lib/thankyou-mail";

interface RsvpRequestBody {
  name: string;
  phone?: string;
  email: string;
  attend: string;
  category: string;
  categoryLabel?: string;
  plusOne: string;
  plusOneName?: string;
}

const ATTEND_LABELS: Record<string, string> = {
  yes: "Yes, I'll be there 🎉",
  maybe: "Maybe — still figuring it out",
  no: "Sorry, I can't make it",
};

export async function POST(request: Request) {
  try {
    const body: RsvpRequestBody = await request.json();
    const {
      name,
      phone = "",
      email,
      attend,
      category,
      categoryLabel,
      plusOne,
      plusOneName = "",
    } = body;

    if (!name || !attend || !category) {
      return NextResponse.json(
        { error: "Name, attendance, and category are required." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const hasPlusOne = plusOne === "yes" || plusOne === "true";
    const finalPlusOne = hasPlusOne ? "Yes" : "No";
    const finalPlusOneName = hasPlusOne ? plusOneName.trim() : "";
    const attendanceStatus = ATTEND_LABELS[attend] || attend;
    const resolvedCategory = categoryLabel || category;

    // 1. Append to Google Sheets
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY || "";
    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");
    const spreadsheetId = process.env.SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error("Missing Google Sheets credentials in environment variables.");
      return NextResponse.json(
        { error: "Google Sheets configuration is missing on server." },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // The columns: Fullname | Phone Number | Email Address | Category | Will You Attend? * | Plus one? | Name of Plus One
    const rowValues = [
      name.trim(),
      phone.trim(),
      email.trim(),
      resolvedCategory,
      attendanceStatus,
      finalPlusOne,
      finalPlusOneName,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    // 2. Send "Thank you for RSVPing" Email via SMTP
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || `"Tolu & Moyo" <${smtpUser}>`;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const isAttending = attend === "yes";
        const isMaybe = attend === "maybe";

        const subject = isAttending
          ? "Thank you for RSVPing! We can't wait to celebrate with you — Tolu & Moyo 💍"
          : isMaybe
          ? "Thank you for RSVPing — Tolu & Moyo's Wedding"
          : "Thank you for letting us know — Tolu & Moyo's Wedding";

        const greetingMessage = isAttending
          ? `We are overjoyed that you will be joining us to celebrate our love and new beginning!`
          : isMaybe
          ? `Thank you for taking the time to RSVP. We understand you are still finalizing your plans, and we hope you can make it!`
          : `Thank you for letting us know you won't be able to make it. You will be dearly missed, and we truly appreciate your love and prayers!`;

        const detailsSection =
          isAttending || isMaybe
            ? `
            <div style="background-color: #f7f3ee; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #e8dec8;">
              <h3 style="margin-top: 0; color: #722F37; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Wedding Details</h3>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>📅 Date:</strong> Saturday, 19th December 2026</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>⏰ Time:</strong> 10:00 AM</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>📍 Venue:</strong> Rhema Chapel International Churches, Ile-Ife, Osun State</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>✨ Dress Code:</strong> Champagne Gold &amp; Wine (English / Trad)</p>
              ${
                hasPlusOne && finalPlusOneName
                  ? `<p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>👥 Plus One:</strong> Yes (${finalPlusOneName})</p>`
                  : `<p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>👥 Plus One:</strong> ${finalPlusOne}</p>`
              }
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>🏷️ Category:</strong> ${resolvedCategory}</p>
            </div>
            <div style="background: #FAF5EB; border-left: 4px solid #D4AF37; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #3B121A; font-size: 13px; line-height: 1.5;">
                <strong>A Gentle Reminder 🤍</strong><br />
                As much as we love your little ones, our celebrations will be an adults-only event. We appreciate your understanding!
              </p>
            </div>
          `
            : "";

        const htmlContent =  ThankYouMail({name, greetingMessage, detailsSection});
        
        const textContent = textcontent({name, greetingMessage, isAttending, isMaybe, hasPlusOne, finalPlusOneName, resolvedCategory, finalPlusOne});

        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject,
          text: textContent,
          html: htmlContent,
        });
      } catch (mailError) {
        console.error("Failed to send RSVP confirmation email:", mailError);
        // Note: Sheet entry was already recorded; continue so guest receives confirmation
      }
    } else {
      console.warn("SMTP configuration is incomplete; skipping email dispatch.");
    }

    return NextResponse.json({
      success: true,
      message: "RSVP successfully recorded!",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred while saving RSVP.";
    console.error("RSVP processing error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

