interface TemplateParams {
    name: string;
    greetingMessage: string;
    detailsSection: string;
}

interface DetailsSectionParams {
    name: string;
    greetingMessage: string;
    isAttending: boolean;
    isMaybe: boolean;
    hasPlusOne: boolean;
    finalPlusOneName: string;
    finalPlusOne: string;
    resolvedCategory: string;
}

export function ThankYouMail({
    name,
    greetingMessage,
    detailsSection,
}: TemplateParams): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSVP Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f2ede4; color: #2d2d2d; line-height: 1.6;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f2ede4; padding: 30px 15px;">
        <tr>
        <td align="center">
            <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);" cellspacing="0" cellpadding="0" border="0">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2D0C14 0%, #3D121B 60%, #1F070C 100%); padding: 40px 30px; text-align: center; color: #ffffff;">
                        <p style="margin: 0 0 10px 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #DFBA73;">Wedding RSVP Confirmation</p>
                        <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 400; font-family: Georgia, serif; color: #ffffff;">Toluwani &amp; Moyosore</h1>
                        <p style="margin: 0; font-size: 14px; opacity: 0.85; letter-spacing: 1px;">#TM26 &bull; #MeetTheAdebanjos™️</p>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 36px 32px;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #722F37; margin-top: 0;">Dear ${name},</h2>
                        <p style="font-size: 15px; color: #4a4a4a; line-height: 1.6;">${greetingMessage}</p>
                        
                        ${detailsSection}

                        <p style="font-size: 15px; color: #4a4a4a; line-height: 1.6; margin-top: 24px;">
                            If you have any questions or need to make adjustments to your RSVP, feel free to reply directly to this email.
                        </p>

                        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0; font-size: 15px; color: #722F37; font-weight: 600;">With love,</p>
                            <p style="margin: 4px 0 0 0; font-size: 16px; font-family: Georgia, serif; font-style: italic; color: #2D0C14;">Toluwani &amp; Moyosore Adebanjo</p>
                        </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f7f3ee; padding: 20px 30px; text-align: center; font-size: 12px; color: #888888;">
                        <p style="margin: 0;">19th December 2026 &bull; Ile-Ife, Osun State, Nigeria</p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
    `;
}

export function textcontent({ name, greetingMessage, isAttending, isMaybe, hasPlusOne, finalPlusOneName, resolvedCategory, finalPlusOne }: DetailsSectionParams): string {
    return`
        Dear ${name},

        ${greetingMessage}

        ${
        isAttending || isMaybe
            ? `
        WEDDING DETAILS:
        - Date: Saturday, 19th December 2026
        - Time: 10:00 AM
        - Venue: Rhema Chapel International Churches, Ile-Ife, Osun State
        - Plus One: ${hasPlusOne && finalPlusOneName ? `Yes (${finalPlusOneName})` : finalPlusOne}
        - Category: ${resolvedCategory}

        A gentle reminder: Celebrations will be an adults-only event.
        `
            : ""
        }

        With love,
        Toluwani & Moyosore Adebanjo
        #TM26 #MeetTheAdebanjos™️
        `.trim();
}