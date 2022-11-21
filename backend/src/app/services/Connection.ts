import { PrismaClient } from "@prisma/client";
import { createAccount, getAccountById } from "./account";
import { getUserById, getUserByName } from "./user";
import {
  create,
  getAll,
  getAllByDate,
  getCredits,
  getCreditsByDate,
  getDebits,
  getDebitsByDate,
} from "./transaction";

export default class Connection {
  private client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }
  private async connect() {
    await this.client.$connect();
  }
  private async disconnect() {
    await this.client.$disconnect();
  }
  public async createAccount(username: string, password: string, initialBalance: number) {
    await this.connect();
    const user = await createAccount(this.client, username, password, initialBalance);
    await this.disconnect();
    return user;
  }
  public async getAccountById(id: number) {
    await this.connect();
    const account = await getAccountById(this.client, id);
    await this.disconnect();
    return account;
  }
  public async getUserById(id: number) {
    await this.connect();
    const user = await getUserById(this.client, id);
    await this.disconnect();
    return user;
  }
  public async getUserByName(name: string) {
    await this.connect();
    const user = await getUserByName(this.client, name);
    await this.disconnect();
    return user;
  }
  public async getAllTransactions(id: number) {
    await this.connect();
    const transactions = await getAll(this.client, id);
    await this.disconnect();
    return transactions;
  }
  public async createTransaction(fromUser: number, toUser: string, amount: number) {
    await this.connect();
    const transaction = await create(this.client, fromUser, toUser, amount);
    await this.disconnect();
    return transaction;
  }
  public async getAllTransactionsByDate(id: number, start: string, end: string) {
    await this.connect();
    const transaction = await getAllByDate(this.client, id, start, end);
    await this.disconnect();
    return transaction;
  }
  public async getCredits(id: number) {
    await this.connect();
    const credits = await getCredits(this.client, id);
    await this.disconnect();
    return credits;
  }
  public async getCreditsByDate(id: number, start: string, end: string) {
    await this.connect();
    const credits = await getCreditsByDate(this.client, id, start, end);
    await this.disconnect();
    return credits;
  }
  public async getDebits(id: number) {
    await this.connect();
    const debits = await getDebits(this.client, id);
    await this.disconnect();
    return debits;
  }
  public async getDebitsByDate(id: number, start: string, end: string) {
    await this.connect();
    const debits = await getDebitsByDate(this.client, id, start, end);
    await this.disconnect();
    return debits;
  }
}
