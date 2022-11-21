import { PrismaClient } from "@prisma/client";

async function createAccount(
  prisma: PrismaClient,
  username: string,
  password: string,
  initialBalance: number
) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        account: {
          create: {
            balance: initialBalance,
          },
        },
      },
    });
    return user;
  } catch (err) {
    return null;
  }
}
async function getAccountById(prisma: PrismaClient, id: number) {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: +id,
      },
    });
    return account;
  } catch (err) {
    return null;
  }
}

export { createAccount, getAccountById };
