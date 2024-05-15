import prisma from "@/lib/prisma";
import { prismaConnect } from "@/utils/prismaConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prismaConnect();
    const applications = await prisma.application.findMany();
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Cannot fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, vin, message } = await request.json();
    await prismaConnect();
    const response = await prisma.application.create({
      data: {
        name,
        email,
        phone,
        vin,
        message,
        status: "new",
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Cannot fetch" }, { status: 500 });
  }
}
