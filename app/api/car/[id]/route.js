import prisma from "@/prisma/prisma";
import { checkCarAvailability } from "@/utils/carOperation";

export const GET = async (req, { params }) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
    });

    if (car) {
      const rentalLog = await prisma.carRental.findMany({
        where: {
          carId: car.id,
        },
      });

      car.rentalLog = rentalLog;
      car.availability = checkCarAvailability(rentalLog);

      return new Response(JSON.stringify(car), { status: 200 });
    }
    return new Response(JSON.stringify({ message: "No Car Where Found" }), {
      status: 404,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
