import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { env } from "@/lib/env";
import { createNotionPage } from "@/lib/notion";
import { bookingSchema } from "@/lib/validation";

function toNotionProperties(values: Record<string, unknown>) {
  const properties: Record<string, unknown> = {
    Name: {
      title: [
        {
          text: { content: values.name as string },
        },
      ],
    },
    Email: {
      email: values.email as string,
    },
    Phone: {
      phone_number: values.phone as string,
    },
    "Preferred Date": {
      date: {
        start: values.date as string,
      },
    },
    "Preferred Time": {
      select: {
        name: values.time as string,
      },
    },
    "Group Size": {
      rich_text: [
        {
          text: { content: values.groupSize as string },
        },
      ],
    },
  };

  if (typeof values.contribution === "number") {
    properties["Contribution"] = {
      number: values.contribution,
    };
  }

  if (values.accessibilityNeeds) {
    properties["Accessibility Needs"] = {
      rich_text: [
        {
          text: { content: values.accessibilityNeeds as string },
        },
      ],
    };
  }

  return properties;
}

export async function POST(request: Request) {
  if (!env.notionToken || !env.bookingDatabaseId) {
    return NextResponse.json(
      { message: "Booking form is not configured." },
      { status: 500 },
    );
  }

  try {
    const json = await request.json();
    const parsed = bookingSchema.parse(json);

    await createNotionPage(env.bookingDatabaseId, toNotionProperties(parsed) as any);

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Booking submission failed", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation failed", issues: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Unable to submit booking right now." },
      { status: 500 },
    );
  }
}
