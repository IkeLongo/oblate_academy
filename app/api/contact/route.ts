// import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		// console.log("[LEAD API] Received request body:", body);
		
		const { name, email, phone, message, source, status, tags } = body;
		// console.log("[LEAD API] Destructured message:", message);
		// console.log("[LEAD API] Message type:", typeof message);
		// console.log("[LEAD API] Message length:", message?.length);

		// 3) Trigger GoHighLevel workflow through webhook
    let ghlWebhookSuccess = false;
    let ghlWebhookError: string | null = null;

    try {
      const webhookPayload = {
        name,
        email,
        phone: phone || "",
        message: message || "",
        source: "Website Contact Form - Inquiry",
        status: status || "new",
        tags: tags ?? ["website-contact-form-inquiry"],
      };
      // console.log("[LEAD API] Sending to GHL webhook:", webhookPayload);
      
      const webhookRes = await fetch(process.env.GHL_WEBHOOK_URL_CONTACT_FORM!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
        cache: "no-store",
      });

      if (!webhookRes.ok) {
        const text = await webhookRes.text();
        throw new Error(`Webhook failed: ${webhookRes.status} ${text}`);
      }

      ghlWebhookSuccess = true;
    } catch (err: any) {
      console.error("GHL Webhook Error:", err);
      ghlWebhookError = err?.message || "Unknown webhook error";
    }

		return NextResponse.json({
			message: 'Contact received and confirmation email sent.',
			ghlWebhookSuccess,
      ghlWebhookError,
		});
	} catch (error: any) {
		console.error('Contact Lead Error:', error);
		return NextResponse.json(
			{ message: 'An error occurred while processing your contact.' },
			{ status: 500 }
		);
	}
}