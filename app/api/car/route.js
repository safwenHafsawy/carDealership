import prisma from "@/prisma/prisma";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 } from "uuid";
import sharp from "sharp";

/**
 *
 * FETCHING ALL CARS
 *
 */

export const GET = async () => {
  try {
    const cars = await prisma.car.findMany();

    if (cars) return new Response(JSON.stringify(cars), { status: 200 });
    else
      new Response(JSON.stringify({ message: "could not fetch cars" }), {
        status: 400,
      });
  } catch (err) {
    console.log(err);
    new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
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
    const nextAv = carData.get("nextAv");
    const availability = carData.get("availability");
    const pricePerHour = carData.get("pricePerHour");

    //handling image
    const bytes = await image.arrayBuffer();
    //resize image using sharp
    const imageBuffer = await sharp(Buffer.from(bytes))
      .resize({
        width: 1000,
        height: 1000,
        fit: "cover",
      })
      .toBuffer();

    const imageExt = image.type.split("/")[1];
    const randomUUID = v4();
    const imagePath = path.join(
      "public",
      "uploadedImgs",
      "cars",
      `${image.name}_${randomUUID}.${imageExt}`
    );

    await writeFile(imagePath, imageBuffer);

    const car = await prisma.car.create({
      data: {
        manufacturer,
        model,
        technicalSpec,
        availability: JSON.parse(availability),
        pricePerHour: parseFloat(pricePerHour),
        nextAv: parseInt(nextAv),
        image: imagePath.split("public\\")[1],
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

    // handling data change
    for (let key of Object.keys(carData)) {
      if (carData[key] == "") {
        carData[key] = car[key];
      }
    }

    console.log(carData.availability);
    const newCar = await prisma.car.update({
      where: {
        id: carData.id,
      },
      data: {
        manufacturer: carData.manufacturer,
        model: carData.model,
        technicalSpec: carData.technicalSpec,
        availability: JSON.parse(carData.availability),
        pricePerHour: parseFloat(carData.pricePerHour),
        nextAv: parseInt(carData.nextAv),
        image: carData.image,
      },
    });
    if (newCar) return new Response(JSON.stringify(newCar), { status: 201 });
    else
      return new Response(
        { message: "Could not update this car" },
        { status: 400 }
      );
  } catch (error) {
    //console.log("Error:  ", error);
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
    const imagePath = path.join("public/", `${car.image}`);

    await unlink(imagePath);

    if (car) return new Response(null, { status: 204 });
    else
      return new Response({ message: "Could Not Delete Car" }, { status: 400 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Internal Server Error" }, { status: 500 });
  }
};
