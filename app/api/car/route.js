import prisma from "@/prisma/prisma";
import { checkCarAvailability } from "@/utils/carOperation";
import { addNewImage, removeOldImage } from "@/utils/imageOperations";

/**
 *
 * FETCHING ALL CARS
 *
 */

export const GET = async () => {
  try {
    const cars = await prisma.car.findMany();

    /**
     * fetching rental logs per car and checking availability
     */

    for (let car of cars) {
      const rentalLog = await prisma.carRental.findMany({
        where: {
          carId: car.id,
        },
      });

      car.availability = checkCarAvailability(rentalLog);
    }

    if (cars) return new Response(JSON.stringify(cars), { status: 200 });
    else new Response(null, { status: 400 });
  } catch (err) {
    console.log(err);
    new Response(null, { status: 500 });
  }
};

/**
 *
 * CREATE NEW CAR
 *
 */

export const POST = async (req) => {
  try {
    //getting car data
    const carData = await req.formData();
    const manufacturer = carData.get("manufacturer");
    const model = carData.get("model");
    const image = carData.get("image");
    const technicalSpec = carData.get("technicalSpec");
    const pricePerHour = carData.get("pricePerHour");

    //handling image
    const newImagePath = await addNewImage(image);

    const car = await prisma.car.create({
      data: {
        manufacturer,
        model,
        technicalSpec,
        pricePerHour: parseFloat(pricePerHour),
        image: newImagePath.split("public\\")[1],
      },
    });

    if (car) return new Response(JSON.stringify(car), { status: 201 });
    else return new Response("Could not create record", { status: 400 });
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

/**
 *
 * UPDATING CAR
 *
 */

export const PATCH = async (req) => {
  try {
    let newImagePath;
    const rawFormData = await req.formData();

    let carData = {};

    for (const [key, value] of rawFormData.entries()) {
      carData[key] = value;
    }

    // fetching original carData
    const car = await prisma.car.findUnique({
      where: {
        id: carData.id,
      },
    });

    //checking if user changed the image

    let image = null;
    if (carData.image === "" && !image) {
      image = car.image;
    } else if (typeof carData.image === "object") {
      //handling new image
      //delete old image
      await removeOldImage(car.image);

      newImagePath = await addNewImage(carData.image);
    }
    const newCar = await prisma.car.update({
      where: {
        id: carData.id,
      },
      data: {
        manufacturer: carData.manufacturer,
        model: carData.model,
        technicalSpec: carData.technicalSpec,
        pricePerHour: parseFloat(carData.pricePerHour),
        image: carData.image === "" ? image : newImagePath.split("public\\")[1],
      },
    });

    if (newCar) return new Response(JSON.stringify(newCar), { status: 201 });
    else
      return new Response(
        { message: "Could not update this car" },
        { status: 400 }
      );
  } catch (error) {
    console.log("Error:  ", error);
    return new Response({ message: "Internal server error" }, { status: 500 });
  }
};

/**
 *
 * Removing Cars
 *
 */

export const DELETE = async (req) => {
  try {
    const carData = await req.formData();
    const carId = carData.get("id");

    const car = await prisma.car.delete({
      where: {
        id: carId,
      },
    });

    //remove car image after deletion
    await removeOldImage(car.image);

    if (car) return new Response(null, { status: 204 });
    else
      return new Response({ message: "Could Not Delete Car" }, { status: 400 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Internal Server Error" }, { status: 500 });
  }
};
