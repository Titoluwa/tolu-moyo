import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";
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
  comingWithChildren?: string;
  childrenCount?: string | number;
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
      comingWithChildren = "no",
      childrenCount = "0",
    } = body;

    if (!name || !attend || !category) {
      return NextResponse.json(
        { error: "Name, attendance, and category are required." },
        { status: 400 }
      );
    }

    if (!email?.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const hasPlusOne = plusOne === "yes" || plusOne === "true";
    const finalPlusOne = hasPlusOne ? "Yes" : "No";
    const finalPlusOneName = hasPlusOne ? plusOneName.trim() : "";

    const hasChildren =
      comingWithChildren === "yes" || comingWithChildren === "true";
    const finalComingWithChildren = hasChildren ? "Yes" : "No";
    const parsedChildrenCount = Number.parseInt(String(childrenCount), 10);
    let finalChildrenCount = "0";
    if (hasChildren) {
      finalChildrenCount =
        Number.isNaN(parsedChildrenCount) || parsedChildrenCount < 1
          ? "1"
          : String(parsedChildrenCount);
    }

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

    // The columns: Fullname | Phone Number | Email Address | Category | Will You Attend? * | Plus one? | Name of Plus One | Coming with Children? | Number of Children
    const rowValues = [
      name.trim(),
      phone.trim(),
      email.trim(),
      resolvedCategory,
      attendanceStatus,
      finalPlusOne,
      finalPlusOneName,
      finalComingWithChildren,
      hasChildren ? finalChildrenCount : "0",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    // 2. Send "Thank you for RSVPing" Email via SMTP
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number.parseInt(process.env.SMTP_PORT || "587", 10);
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

        const isAttending = attend?.trim().toLowerCase() === "yes";
        const isMaybe = attend?.trim().toLowerCase() === "maybe";

        let subject = "Thank you for letting us know — Tolu & Moyo's Wedding";
        if (isAttending) {
          subject =
            "Thank you for RSVPing! We can't wait to celebrate with you — Tolu & Moyo 💍";
        } else if (isMaybe) {
          subject = "Thank you for RSVPing — Tolu & Moyo's Wedding";
        }

        let greetingMessage =
          "Thank you for letting us know you won't be able to make it. You will be dearly missed, and we truly appreciate your love and prayers!";
        if (isAttending) {
          greetingMessage =
            "We are overjoyed that you will be joining us to celebrate our love and new beginning! Please find your official wedding invitation attached to this email.";
        } else if (isMaybe) {
          greetingMessage =
            "Thank you for taking the time to RSVP. We understand you are still finalizing your plans, and we hope you can make it!";
        }

        let detailsSection = "";
        if (isAttending || isMaybe) {
          const plusOneDetail =
            hasPlusOne && finalPlusOneName
              ? `Yes (${finalPlusOneName})`
              : finalPlusOne;

          const childrenDetail = hasChildren
            ? `Yes (${finalChildrenCount})`
            : "No";

          const invitationNotice = isAttending
            ? `<div style="margin-top: 16px; padding-top: 14px; border-top: 1px dashed #d5c8b2; color: #722F37; font-size: 14px;">
                💌 <strong>Invitation Attached:</strong> Please find your official wedding invitation attached to this email.
              </div>`
            : "";

          detailsSection = `
            <div style="background-color: #f7f3ee; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #e8dec8;">
              <h3 style="margin-top: 0; color: #722F37; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Wedding Details</h3>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>📅 Date:</strong> Saturday, 19th December 2026</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>⏰ Time:</strong> 10:00 AM</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>📍 Venue:</strong> Rhema Chapel International Churches, Ile-Ife, Osun State</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>✨ Dress Code:</strong> Champagne Gold &amp; Wine (English / Trad)</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>👥 Plus One:</strong> ${plusOneDetail}</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>👶 Children:</strong> ${childrenDetail}</p>
              <p style="margin: 8px 0; color: #3d3d3d; font-size: 15px;"><strong>🏷️ Category:</strong> ${resolvedCategory}</p>
              ${invitationNotice}
            </div>
          `;
        }

        const htmlContent = ThankYouMail({ name, greetingMessage, detailsSection });

        const textContent = textcontent({
          name,
          greetingMessage,
          isAttending,
          isMaybe,
          hasPlusOne,
          finalPlusOneName,
          resolvedCategory,
          finalPlusOne,
          hasChildren,
          finalChildrenCount,
        });

        // Attach invitation PDF only when RSVP is Yes
        const attachments: Array<{
          filename: string;
          path: string;
          contentType?: string;
        }> = [];

        if (isAttending) {
          const invitationPath = path.join(
            process.cwd(),
            "public",
            "White Wedding Invitation.pdf"
          );

          if (fs.existsSync(invitationPath)) {
            attachments.push({
              filename: "White Wedding Invitation.pdf",
              path: invitationPath,
              contentType: "application/pdf",
            });
          } else {
            console.warn(`Invitation PDF not found at path: ${invitationPath}`);
          }
        }

        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject,
          text: textContent,
          html: htmlContent,
          ...(attachments.length > 0 ? { attachments } : {}),
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

