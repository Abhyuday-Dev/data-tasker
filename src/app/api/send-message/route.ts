import twilio from 'twilio';
import { NextResponse } from 'next/server';
import { messageHistory } from '@/app/data/contact';


//Retrieve token and id from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

//Failed to retrieve token or id from .env
if (!accountSid || !authToken) {
  throw new Error("Twilio credentials are missing. Please check your environment variables.");
}

//Initialize twilio client
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    //get data from frontend
    const { to, message } = await req.json();

    const response = await client.messages.create({
      body: message,
      from: '+17743146155',
      to: to,
    });

    // Add the message to the message history
    const newMessage = {
      id: messageHistory.length + 1,
      to: to,
      message: message,
      timestamp: new Date().toISOString(),
    };
    messageHistory.push(newMessage);

    return NextResponse.json({ success: true, sid: response.sid, message: newMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}