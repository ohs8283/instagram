import { serachUsers } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  return serachUsers().then((data) => NextResponse.json(data));
}
