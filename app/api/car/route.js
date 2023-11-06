import prisma from "@/prisma/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 } from "uuid";

export const POST = async (req) => {
  try {
    const carData = await req.formData();
    const manufacturer = carData.get("manufacturer");
    const model = carData.get("model");
    const image = carData.get("image");
    const technicalSpec = carData.get("technicalSpec");
    const nextAv = carData.get("nextAv");
    const availability = carData.get("available");
    const pricePerHour = carData.get("pricePerHour");

    //handling image
    const bytes = await image.arrayBuffer();
    const imageBlob = Buffer.from(bytes);

    const imageExt = image.type.split("/")[1];
    const randomUUID = v4();
    const imagePath = path.join(
      "public",
      "uploadedImgs",
      "cars",
      `${image.name}_${randomUUID}.${imageExt}`
    );

    await writeFile(imagePath, imageBlob);

    const car = await prisma.car.create({
      data: {
        manufacturer,
        model,
        technicalSpec,
        availability: !!availability,
        pricePerHour: parseFloat(pricePerHour),
        nextAv: parseInt(nextAv),
        image: imagePath.split("public\\")[1],
      },
    });

    if (car) return new Response("Car added successfully", { status: 201 });
    else return new Response("Could not create record", { status: 400 });
  } catch (error) {
    console.log("error: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async () => {
  const cars = await prisma.car.findMany();

  if (cars) return new Response(JSON.stringify(cars), { status: 200 });
  else
    new Response(JSON.stringify({ message: "could not fetch cars" }), {
      status: 400,
    });
};

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
    if (newCar) return new Response(newCar, { status: 201 });
    else
      return new Response(
        { message: "Could not update this car" },
        { status: 400 }
      );
  } catch (error) {
    //console.log("erooor:  ", error);
    return new Response({ message: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    const carData = await req.formData();
    const carId = carData.get("id");

    const car = await prisma.car.delete({
      where: {
        id: carId,
      },
    });
    if (car) return new Response(null, { status: 204 });
    else
      return new Response({ message: "Could Not Delete Car" }, { status: 400 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Internal Server Error" }, { status: 500 });
  }
};
