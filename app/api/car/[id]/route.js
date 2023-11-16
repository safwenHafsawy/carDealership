import prisma from "@/prisma/prisma";

export const GET = async (req, { params }) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
    });

    if (car) return new Response(JSON.stringify(car), { status: 200 });
    else
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
