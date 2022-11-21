export default interface TransactionData {
  id?: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt?: Date;
}
