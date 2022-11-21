import { Request, Response } from "express";
import APIStatus from "../enums/APIStatus";
import TransactionData from "../interfaces/TransactionData";
import Connection from "../services/Connection";

class Controller {
  public async MakeTransaction(
    req: Request<{ id: number }, {}, {}, { value: number; to: string }>,
    res: Response
  ) {
    try {
      const { to, value } = req.query;
      const id = req.params.id;

      if (!to || !value) {
        return res.status(422).json({
          message: "Faltam parâmetros",
          status: APIStatus.ERROR,
        });
      }

      if (value <= 0) {
        return res.status(422).json({
          message: "Valor não pode ser R$0,00",
          status: APIStatus.ERROR,
        });
      }

      const own = await new Connection().getAccountById(id);
      if (!own) {
        return res.status(404).json({
          message: "Erro ao conectar!",
          status: APIStatus.ERROR,
        });
      }
      const transaction = await new Connection().createTransaction(own.id, to, value as number);
      if (!transaction) {
        return res.status(500).json({
          message: "Não foi possível concluir a operação!",
          status: APIStatus.ERROR,
        });
      }
      return res.status(200).json({
        message: "Transação bem sucedida",
        status: APIStatus.SUCCESS,
        transaction,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Ocorreu um erro!",
        status: APIStatus.ERROR,
      });
    }
  }
  public async GetTransaction(
    req: Request<{ id: number }, {}, {}, { type: string; start: string; end: string }>,
    res: Response
  ) {
    try {
      const { start, end, type } = req.query;
      const id = req.params.id;

      const user = await new Connection().getUserById(id);
      if (!user) {
        return res.status(404).json({
          message: "Ocorreu um erro!",
          status: APIStatus.ERROR,
        });
      }

      if (!type || type === "any") {
        if (!start || !end) {
          const transactions = await new Connection().getAllTransactions(user.accountID);
          return res.status(200).json({
            status: APIStatus.SUCCESS,
            message: "Sucesso",
            transactions,
          });
        } else if (start && end) {
          const transactions = await new Connection().getAllTransactionsByDate(user.accountID, start, end);
          return res.status(200).json({
            status: APIStatus.SUCCESS,
            message: "Sucesso",
            transactions,
          });
        }
      }

      if (type === "debit") {
        if (!start || !end) {
          const debits = await new Connection().getDebits(user.accountID);
          return res.status(200).json({
            status: APIStatus.SUCCESS,
            message: "Sucesso",
            debits,
          });
        } else if (start && end) {
          const debits = await new Connection().getDebitsByDate(user.accountID, start, end);
          return res.status(200).json({
            status: APIStatus.SUCCESS,
            message: "Sucesso",
            debits,
          });
        }
      }
      if (type === "credit") {
        if (!start || !end) {
          const credits = await new Connection().getCredits(user.accountID);
          return res.status(200).json({
            status: APIStatus.SUCCESS,
            message: "Sucesso",
            credits,
          });
        } else if (start && end) {
          const credits = await new Connection().getCreditsByDate(user.accountID, start, end);
          return res.status(200).json({
            status: APIStatus.SUCCESS,
            message: "Sucesso",
            credits,
          });
        }
      }

      return res.status(500).json({
        message: "Ocorreu um erro!",
        status: APIStatus.ERROR,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Ocorreu um erro!",
        status: APIStatus.ERROR,
      });
    }
  }
}

export const transactionController = new Controller();
