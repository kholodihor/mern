"use server";

import prisma from "@/lib/prisma";
import { IApplication } from "@/types";
import { prismaConnect } from "@/utils/prismaConnect";

export const sendApplication = async (values: IApplication) => {
  try {
    await prismaConnect();
    await prisma.application.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        vin: values.vin,
        message: values.message,
        status: "new",
      },
    });
    return { success: true, status: 200 };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
    };
  }
};
