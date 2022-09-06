import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
}
class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    const orderAlreadyExists = await prismaClient.order.findFirst({
      where: {
        table: table,
      },
    });
    if (orderAlreadyExists)
      throw new Error("This order already exists in our database");

    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name,
      },
    });

    return order;
  }
}

export { CreateOrderService };
