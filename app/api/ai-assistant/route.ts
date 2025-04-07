import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { nylas } from "@/lib/nylas";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const session = await requireUser();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { message } = await request.json();
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
      include: {
        EventType: true,
      },
    });

    if (!user || !user.grantId) {
      return NextResponse.json(
        {
          response:
            "I can't access your schedule yet. Please complete your onboarding process.",
        },
        { status: 200 }
      );
    }
    const today = new Date();
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const events = await nylas.events.list({
      identifier: user.grantId,
      queryParams: {
        calendarId: user.grantEmail as string,
      },
    });

    const eventsData = events.data.map((event: any) => {
      const startDate = new Date(event.when.startTime * 1000);
      const endDate = new Date(event.when.endTime * 1000);
      
      return {
        title: event.title,
        date: startDate.toLocaleDateString(),
        startTime: startDate.toLocaleTimeString(),
        endTime: endDate.toLocaleTimeString(),
        description: event.description || "No description",
        participants:
          event.participants?.map((p: any) => p.name).join(", ") ||
          "No participants",
      };
    });
    
    console.log(eventsData);
    

    const context = `
User: ${user.name || "User"}
Date: ${today.toLocaleDateString()}
Upcoming meetings today: ${
      eventsData.length > 0
        ? JSON.stringify(eventsData, null, 2)
        : "No meetings scheduled for today"
    }
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a helpful AI assistant for a calendar scheduling app. Your task is to help the user with their schedule.
Only provide information relevant to the user's schedule and meetings. If they ask for information that's not related to their calendar, 
politely redirect them to schedule-related queries.

Here's the user's current schedule information:
${context}

User query: ${message}

IMPORTANT: Do not use any markdown formatting like asterisks (*) or other special characters in your response. Interpret the dates as DD/MM/YYYY format.
Respond in a helpful, concise manner about their schedule. If the user asks about meeting preparation or what they should say in a meeting,
provide general advice based on the meeting title and description And if the user ask for more details then try to go deeper on the meeting topics.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error in AI assistant:", error);
    return NextResponse.json(
      {
        response:
          "I'm having trouble connecting right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
