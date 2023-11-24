import prisma from "@/prisma/prisma";
import { getToken } from "next-auth/jwt";

export const POST = async (req) => {
  try {
    const { userId, carId, startDate, endDate, totalPrice } = await req.json();

    const rented = await prisma.carRental.create({
      data: {
        userId: userId,
        carId: carId,
        startDate,
        endDate,
        totalPrice,
      },
    });
    if (rented) return new Response(JSON.stringify(rented), { status: 201 });
    return new Response(
      JSON.stringify({ message: "Could not proceed with request" }),
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const GET = async (req) => {
  try {
    const bookingLogs = [];
    const token = await getToken({ req });

    const logs = await prisma.carRental.findMany({
      where: {
        userId: token.userId,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        totalPrice: true,
        rentedCar: {
          select: {
            id: true,
            model: true,
            manufacturer: true,
            pricePerHour: true,
          },
        },
      },
    });

    if (logs.length > 0)
      return new Response(JSON.stringify(logs), { status: 200 });
    else
      return new Response(JSON.stringify({ message: "No Booked Cars Yet !" }), {
        status: 404,
      });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Sever Error !" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req) => {
  try {
    const data = await req.json();

    const log = await prisma.carRental.delete({
      where: {
        id: data.logId,
      },
    });

    if (log)
      return new Response(JSON.stringify({ deleteLogId: log.id }), {
        status: 200,
      });
    else
      return new Response(JSON.stringify({ message: "Could not delete log" }), {
        status: 400,
      });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(JSON.stringify({ message: "Internal Sever Error" }), {
        status: 500,
      })
    );
  }
};
