import prisma from "@/prisma/prisma";

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
