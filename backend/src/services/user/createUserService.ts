import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) throw new Error("There's no e-mail");

    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (emailAlreadyExists)
      throw new Error("This e-mail already exists in our database");

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
