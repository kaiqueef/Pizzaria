import prismaClient from "../../prisma";

interface ItemRequest {
  item_id: string;
}

class RemoveItemService {
  async execute({ item_id }: ItemRequest) {
    const itemExists = await prismaClient.item.findFirst({
      where: {
        id: item_id,
      },
    });
    if (!itemExists) throw new Error("This item_id does not exist");

    const order = await prismaClient.item.delete({
      where: {
        id: item_id,
      },
    });
    return order;
  }
}

export { RemoveItemService };
