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
    const technicalSpec = carData.get("technicalSpecifications");
    const nextAv = carData.get("nextAv");

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
        availability: true,
        pricePerHour: 13,
        image: imagePath.split("public")[1],
        userId: null,
      },
    });

    console.log(car);
  } catch (error) {
    console.log("error: ", error);
  }
};
