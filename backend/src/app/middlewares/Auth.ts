import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Connection from "../services/Connection";
import APIStatus from "../enums/APIStatus";

type Token = {
  id: number;
  iat: number;
};
export async function auth(req: Request<any, any, any, any>, res: Response, next: NextFunction) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  const id = req.params.id;

  if (!token) {
    return res.status(401).json({
      message: "Não autorizado",
      status: APIStatus.ERROR,
    });
  }

  try {
    const secret = process.env.SECRET || "";
    const user = jwt.verify(token, secret) as Token;

    if (user.id !== parseInt(id)) {
      return res.status(400).json({ message: "Acesso negado!", status: APIStatus.ERROR });
    }

    return next();
  } catch (err) {
    return res.status(400).json({
      message: "Senha inválida",
      status: APIStatus.ERROR,
    });
  }
}
