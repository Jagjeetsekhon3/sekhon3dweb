import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return new NextResponse("Forbidden", { status: 403 });
  const db = await createClient();
  await db.auth.signOut();
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
