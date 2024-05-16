import prisma from "@/lib/prisma";
import { prismaConnect } from "@/utils/prismaConnect";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prismaConnect();
    const applications = await prisma.application.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.log("DELETE APPLICATION", error);
    return NextResponse.json({ message: "Cannot delete" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    await prismaConnect();
    const application = await prisma.application.findUnique({
      where: { id: params.id },
    });
    if (!application) {
      return new NextResponse("Application Not found", { status: 404 });
    }
    const updatedApplication = await prisma.application.update({
      where: { id: params.id },
      data: {
        status: data,
      },
    });
    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    console.log("UPDATE APPLICATION STATUS", error);
    return NextResponse.json({ message: "Cannot update" }, { status: 500 });
  }
}
