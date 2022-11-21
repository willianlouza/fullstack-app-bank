import { PrismaClient } from "@prisma/client";

async function getUserById(prisma: PrismaClient, id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
}
async function getUserByName(prisma: PrismaClient, username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
}

export { getUserById, getUserByName };
