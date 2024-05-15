import prisma from "@/lib/prisma";
import { prismaConnect } from "@/utils/prismaConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prismaConnect();
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Cannot fetch" }, { status: 500 });
  }
}
