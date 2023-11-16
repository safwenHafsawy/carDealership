import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 } from "uuid";
import sharp from "sharp";

export const addNewImage = async (image) => {
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

  return imagePath;
};

export const removeOldImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    const imagePathFull = path.join("public/", `${imagePath}`);

    unlink(imagePathFull)
      .then(() => resolve())
      .catch(() => reject());
  });
};
