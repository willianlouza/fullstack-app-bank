import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import APIStatus from "../enums/APIStatus";

import Connection from "../services/Connection";
import { validPassword } from "../utils/Mask";
import UserData from "../interfaces/UserData";

class Controller {
  //Register
  public async Register(req: Request, res: Response) {
    try {
      const { username, password, confirmPassword } = req.body;

      if (username.length < 3) {
        return res.status(422).json({
          message: "Nome precisa conter 3 caracteres ou mais!",
          status: APIStatus.ERROR,
        });
      }
      if (!hasEmptyParams({ username, password })) {
        return res.status(422).json({
          message: "Precisa informar usuário e senha!",
          status: APIStatus.ERROR,
        });
      }
      if (!validPassword(password)) {
        return res.status(422).json({
          message: "A senha precisa conter pelo menos 8 caracteres, 1 número e 1 letra maiúscula!",
          status: APIStatus.ERROR,
        });
      }
      if (!passwordMatch(password, confirmPassword)) {
        return res.status(422).json({
          message: "Senhas não combinam!",
          status: APIStatus.ERROR,
        });
      }

      const hasUser = (await new Connection().getUserByName(username)) !== null;

      if (hasUser) {
        return res.status(422).json({ message: "Usuário já existe!", status: APIStatus.ERROR });
      }

      //create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      try {
        const user = await new Connection().createAccount(username, passwordHash, 100.0);
        if (!user)
          return res.status(500).json({
            message: "Não foi possível abrir a conta. Tente novamente.",
            status: APIStatus.ERROR,
          });
      } catch (err) {
        return res.status(500).json({
          message: "Não foi possível abrir a conta. Tente novamente.",
          status: APIStatus.ERROR,
        });
      }
      return res.status(201).send({
        message: "Conta criada com sucesso!",
        status: APIStatus.SUCCESS,
        body: {
          user: { username, passwordHash },
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro!", status: APIStatus.ERROR });
    }
  }

  //Login
  public async Login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!hasEmptyParams({ username, password })) {
        return res.status(422).json({
          message: "Precisa informar usuário e senha!",
          status: APIStatus.ERROR,
        });
      }

      const user = await new Connection().getUserByName(username);
      if (!user) {
        return res.status(404).json({ message: "Usuário não existe!", status: APIStatus.ERROR });
      }

      //Check password and generate token
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(422).json({ message: "Senha incorreta!", status: APIStatus.ERROR });
      }
      try {
        const secret = process.env.SECRET || "";
        const token = jwt.sign(
          {
            id: user.id,
          },
          secret,
          {
            expiresIn: "24h",
          }
        );

        return res.status(200).json({
          status: APIStatus.SUCCESS,
          message: "Acesso autorizado, bem vindo.",
          token,
          user,
        });
      } catch (err) {
        res.status(500).json({ message: "Ocorreu um erro!", status: APIStatus.ERROR });
      }
    } catch (err) {
      return res.status(500).json({ message: "Ocorreu um erro!", status: APIStatus.ERROR });
    }
  }

  //Home page
  public async LoadAccount(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const user = await new Connection().getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!", status: APIStatus.ERROR });
    }

    const account = await new Connection().getAccountById(user.accountID);
    if (!account) {
      return res.status(404).json({ message: "Usuário não encontrado!", status: APIStatus.ERROR });
    }
    return res.status(200).json({
      id: account.id,
      balance: account.balance,
      user: user,
    });
  }
}

function hasEmptyParams({ username, password }: any): boolean {
  if (!username || !password) return false;
  return true;
}
function passwordMatch(password: string, confirmPassword: string): boolean {
  if (password !== confirmPassword) return false;
  return true;
}

export const userController = new Controller();
