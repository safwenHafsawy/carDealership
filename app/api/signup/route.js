import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const name = data.get("name");
    const username = data.get("username");
    const phone = data.get("phone");
    const email = data.get("email");
    const password = data.get("password");
    const img = data.get("userImage");

    //checking the user existence
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.username }, { username: data.username }],
      },
    });

    if (user)
      return new Response("Username or email are already used !", {
        status: 401,
      });

    //image handling
    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageType = img.type.split("/")[1];

    const filepath = path.join(
      "public",
      "uploadedImgs",
      `${username}_image.${imageType}`
    );

    await writeFile(filepath, buffer);

    //encrypting pw
    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        username: username,
        phoneNumber: parseInt(phone),
        email: email,
        password: hash,
        image: `/${filepath.substring(filepath.indexOf("uploadedImgs"))}`,
      },
    });

    if (newUser)
      return new Response("Account Created Successfully !", {
        status: 201,
      });
    //else return new Response("Could Not Create Account", { status: 500 })
  } catch (error) {
    console.log(error);
    return new Response("Internat Server Error", { status: 500 });
  }
};
