import { Prisma, PrismaClient } from "@prisma/client";

async function create(prisma: PrismaClient, fromUser: number, toUser: string, amount: number) {
  try {
    const ownUser = await prisma.user.findUnique({
      where: {
        id: fromUser,
      },
    });
    if (!ownUser) {
      return null;
    }

    const own = await prisma.account.findUnique({
      where: {
        id: ownUser.accountID,
      },
    });

    const otherUser = await prisma.user.findUnique({
      where: {
        username: toUser,
      },
    });
    if (!otherUser) {
      return null;
    }

    const to = await prisma.account.findUnique({
      where: {
        id: otherUser.accountID,
      },
    });

    if (own === null || to === null) {
      return null;
    }

    //Cannot make transaction from yourself
    if (own === to) {
      return null;
    }

    const transaction = await prisma.transaction.create({
      data: {
        value: new Prisma.Decimal(amount),
        creditedAccountId: to.id,
        debitedAccountId: own.id,
      },
    });

    const ownBalance = +own.balance;

    //Cannot make transaction when don't have enough money
    if (ownBalance <= 0 || ownBalance - amount < 0) {
      return null;
    }

    //Update debited Account
    const remaining = +ownBalance - +amount;
    await prisma.account.update({
      where: {
        id: own.id,
      },
      data: {
        balance: new Prisma.Decimal(remaining),
      },
    });

    //Update Credited Account
    const otherBalance = +to.balance;
    const gain = +otherBalance + +amount;
    await prisma.account.update({
      where: {
        id: to.id,
      },
      data: {
        balance: new Prisma.Decimal(gain),
      },
    });
    return transaction;
  } catch (err) {
    return null;
  }
}
async function getAll(prisma: PrismaClient, id: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ creditedAccountId: id }, { debitedAccountId: id }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(transactions);
    return transactions;
  } catch (err) {
    return null;
  }
}
async function getDebits(prisma: PrismaClient, id: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        debitedAccountId: id,
      }, 
      orderBy: {
        createdAt: "desc",
      },
    });
    return transactions;
  } catch (err) {
    return null;
  }
}
async function getCredits(prisma: PrismaClient, id: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        creditedAccountId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return transactions;
  } catch (err) {
    return null;
  }
}
async function getAllByDate(prisma: PrismaClient, id: number, start: string, end: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [
          { OR: [{ creditedAccountId: id }, { debitedAccountId: id }] },
          {
            createdAt: {
              lte: new Date(end).toISOString(),
              gte: new Date(start).toISOString(),
            },
          },
        ],
      },
    });
    return transactions;
  } catch (err) {
    return null;
  }
}
async function getDebitsByDate(prisma: PrismaClient, id: number, start: string, end: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [
          { debitedAccountId: id },
          {
            createdAt: {
              lte: new Date(end).toISOString(),
              gte: new Date(start).toISOString(),
            },
          },
        ],
      },
    });
    return transactions;
  } catch (err) {
    return null;
  }
}
async function getCreditsByDate(prisma: PrismaClient, id: number, start: string, end: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [
          { creditedAccountId: id },
          {
            createdAt: {
              lte: end,
              gte: start,
            },
          },
        ],
      },
    });
    return transactions;
  } catch (err) {
    return null;
  }
}

export { create, getAll, getDebits, getCredits, getAllByDate, getDebitsByDate, getCreditsByDate };
