import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { env } from "@/lib/env";
import { createNotionPage } from "@/lib/notion";
import { nominationSchema } from "@/lib/validation";

function toNotionProperties(values: Record<string, string | number | undefined>) {
  const properties: Record<string, unknown> = {
    Title: {
      title: [
        {
          text: { content: values.leaderName as string },
        },
      ],
    },
    Position: {
      rich_text: [
        {
          text: { content: values.position as string },
        },
      ],
    },
    Organisation: {
      rich_text: [
        {
          text: { content: values.organisation as string },
        },
      ],
    },
    Category: {
      select: { name: (values.category as string) ?? "Other" },
    },
    Reason: {
      rich_text: [
        {
          text: { content: values.reason as string },
        },
      ],
    },
  };

  if (values.submitterEmail) {
    properties["Submitted Email"] = {
      email: values.submitterEmail,
    };
  }

  return properties;
}

export async function POST(request: Request) {
  if (!env.notionToken || !env.nominationDatabaseId) {
    return NextResponse.json(
      { message: "Nomination form is not configured." },
      { status: 500 },
    );
  }

  try {
    const json = await request.json();
    const parsed = nominationSchema.parse(json);

    await createNotionPage(env.nominationDatabaseId, toNotionProperties(parsed));

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Nomination submission failed", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation failed", issues: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Unable to submit nomination right now." },
      { status: 500 },
    );
  }
}
